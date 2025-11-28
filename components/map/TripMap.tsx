// components/TripMap.tsx
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import { PlaceResult } from "@/types/placeResult";

const containerStyle = { width: "100%", height: "100%" };

export default function TripMap({
  center = { lat: 6.5244, lng: 3.3792 },
  radius = 5000,
}: {
  center?: { lat: number; lng: number };
  radius?: number;
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
    libraries: ["places"],
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const fetchNearbyPlaces = useCallback(() => {
    if (!mapRef.current) return;

    const service = new google.maps.places.PlacesService(mapRef.current);

    const request: google.maps.places.PlaceSearchRequest = {
      location: center,
      radius,
      type: "tourist_attraction", // you can change this (hotel, restaurant, etc)
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const formatted: PlaceResult[] = results.map((r) => ({
          place_id: r.place_id!,
          name: r.name!,
          geometry: {
            location: {
              lat: r.geometry!.location!.lat(),
              lng: r.geometry!.location!.lng(),
            },
          },
          vicinity: r.vicinity,
          rating: r.rating,
          user_ratings_total: r.user_ratings_total,
          price_level: r.price_level,
          photos: r.photos?.map((photo) => ({
            height: photo.height,
            width: photo.width,
            html_attributions: photo.html_attributions,
            photo_reference: photo.getUrl({ maxWidth: 400 }),
          })),
        }));
        setPlaces(formatted);
      }
    });
  }, [center, radius]);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      fetchNearbyPlaces();
    }
  }, [isLoaded, fetchNearbyPlaces]);

  if (loadError) return <div>Map failed to load</div>;
  if (!isLoaded) return <div>Loading map…</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      <Marker position={center} title="Your location" />

      <MarkerClusterer>
        {(clusterer) => (
          <>
            {places.map((place) => (
              <Marker
                key={place.place_id}
                position={{
                  lat: place.geometry.location.lat,
                  lng: place.geometry.location.lng,
                }}
                clusterer={clusterer}
                onClick={() => setSelectedPlace(place)}
                title={place.name}
              />
            ))}
          </>
        )}
      </MarkerClusterer>

      {selectedPlace && (
        <InfoWindow
          position={{
            lat: selectedPlace.geometry.location.lat,
            lng: selectedPlace.geometry.location.lng,
          }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div style={{ maxWidth: 220 }}>
            <h4>{selectedPlace.name}</h4>
            <p style={{ margin: 0 }}>{selectedPlace.vicinity}</p>
            {selectedPlace.rating && (
              <small>
                ⭐ {selectedPlace.rating} ({selectedPlace.user_ratings_total})
              </small>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const mapOptions: google.maps.MapOptions = {
  styles: [
    // { featureType: "poi", stylers: [{ visibility: "off" }] },
    // { featureType: "transit", stylers: [{ visibility: "off" }] },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    // { featureType: "administrative", stylers: [{ visibility: "off" }] },
  ],
  disableDefaultUI: true, // optional: hide default buttons
  zoomControl: true, // optional: enable only zoom control
};
