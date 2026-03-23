"use client";

import { useEffect } from "react";
import { type PlaceResult } from "@/types/placeResult";
import PlaceCard from "./PlaceCard";
import TripMap from "@/components/map/TripMap";
import { useSearchStore } from "@/store/searchStore";

interface SearchContentProps {
  places: PlaceResult[];
}

export default function SearchContent({ places }: SearchContentProps) {
  const { selectedPlace, setSelectedPlace, userLocation, setUserLocation, setPlaces } =
    useSearchStore();

  useEffect(() => {
    setPlaces(places);
  }, [places, setPlaces]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => undefined
      );
    }
  }, [setUserLocation]);

  const mapCenter = selectedPlace
    ? { lat: selectedPlace.lat, lng: selectedPlace.lng }
    : places.length > 0
      ? { lat: places[0].lat, lng: places[0].lng }
      : userLocation ?? { lat: 0, lng: 0 };

  return (
    <div className="grid grid-cols-12 app-container py-7 gap-4 min-h-[70vh]">
      <div className="col-span-12 md:col-span-5 flex flex-col gap-3 max-h-[80vh] overflow-y-auto pr-1">
        {places.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400 text-sm gap-2">
            <span className="text-4xl">🗺️</span>
            <p>No places found. Try a different destination or interests!</p>
          </div>
        ) : (
          places.map((place, i) => (
            <PlaceCard
              key={`${place.id}-${i}`}
              place={place}
              isSelected={selectedPlace?.id === place.id}
              onClick={() => setSelectedPlace(place)}
            />
          ))
        )}
      </div>

      <div className="col-span-12 md:col-span-7 bg-gray-200 dark:bg-slate-800 flex flex-col rounded-2xl overflow-hidden sticky top-24 h-[80vh]">
        <TripMap
          places={places}
          selectedPlace={selectedPlace}
          userLocation={userLocation}
          center={mapCenter}
          onPlaceSelect={setSelectedPlace}
        />
      </div>
    </div>
  );
}
