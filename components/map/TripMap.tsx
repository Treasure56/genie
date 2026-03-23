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
  DirectionsRenderer,
} from "@react-google-maps/api";
import { type PlaceResult } from "@/types/placeResult";
import { useTheme } from "next-themes";
import { LuNavigation2, LuClock, LuMoveRight } from "react-icons/lu";

const containerStyle = { width: "100%", height: "100%" };

const darkMapStyles: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
  { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
];

type DirectionStep = {
  instruction: string;
  distance: string;
  duration: string;
};

interface TripMapProps {
  center?: { lat: number; lng: number };
  places?: PlaceResult[];
  selectedPlace?: PlaceResult | null;
  userLocation?: { lat: number; lng: number } | null;
  onPlaceSelect?: (place: PlaceResult | null) => void;
}

export default function TripMap({
  center = { lat: 6.5244, lng: 3.3792 },
  places = [],
  selectedPlace = null,
  userLocation = null,
  onPlaceSelect,
}: TripMapProps) {
  const { theme } = useTheme();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
    libraries: ["places", "geometry"],
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [steps, setSteps] = useState<DirectionStep[]>([]);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [dirLoading, setDirLoading] = useState(false);
  const [travelMode, setTravelMode] = useState<"DRIVING" | "WALKING">("DRIVING");

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      styles: theme === "dark" ? darkMapStyles : [],
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: true,
    }),
    [theme]
  );

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Fetch directions when a place is selected
  useEffect(() => {
    if (!isLoaded || !selectedPlace) {
      // Reset async — wrap in a timeout to avoid sync setState warnings
      const t = setTimeout(() => {
        setDirections(null);
        setSteps([]);
        setRouteInfo(null);
      }, 0);
      return () => clearTimeout(t);
    }

    const origin = userLocation ?? center;
    const destination = { lat: selectedPlace.lat, lng: selectedPlace.lng };
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode[travelMode],
      },
      (result, status) => {
        setDirLoading(false);
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          const leg = result.routes[0]?.legs[0];
          if (leg) {
            setRouteInfo({
              distance: leg.distance?.text ?? "",
              duration: leg.duration?.text ?? "",
            });
            const parsedSteps: DirectionStep[] = (leg.steps ?? []).map((s) => ({
              instruction: s.instructions.replace(/<[^>]*>/g, ""),
              distance: s.distance?.text ?? "",
              duration: s.duration?.text ?? "",
            }));
            setSteps(parsedSteps);
          }
        } else {
          setDirections(null);
          setSteps([]);
        }
      }
    );
  }, [isLoaded, selectedPlace, userLocation, center, travelMode]);

  if (loadError)
    return (
      <div className="flex items-center justify-center h-full text-red-500 text-sm p-4">
        ❌ Map failed to load. Check your API key.
      </div>
    );

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center h-full text-slate-400 text-sm gap-2">
        <span className="animate-spin">🗺️</span> Loading map…
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      {/* Map */}
      <div className="flex-1 relative min-h-0">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {/* User location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              title="Your location"
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#7c3aed",
                fillOpacity: 1,
                strokeColor: "#fff",
                strokeWeight: 2,
              }}
            />
          )}

          {/* Place markers (only when no direction route drawn) */}
          {!directions &&
            places.map((place, i) => (
              <Marker
                key={`${place.id}-${i}`}
                position={{ lat: place.lat, lng: place.lng }}
                title={place.name}
                onClick={() => onPlaceSelect?.(place)}
                icon={{
                  path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                  scale: 6,
                  fillColor:
                    selectedPlace?.id === place.id ? "#7c3aed" : "#e2e8f0",
                  fillOpacity: 1,
                  strokeColor:
                    selectedPlace?.id === place.id ? "#5b21b6" : "#94a3b8",
                  strokeWeight: 1.5,
                }}
              />
            ))}

          {/* Directions renderer — Bolt-style blue */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: false,
                polylineOptions: {
                  strokeColor: "#7c3aed",
                  strokeWeight: 5,
                  strokeOpacity: 0.85,
                },
              }}
            />
          )}
        </GoogleMap>

        {/* Travel mode toggle - floating top-right */}
        <div className="absolute top-3 right-3 flex rounded-xl overflow-hidden shadow-lg border border-white/20 text-xs font-semibold z-10">
          {(["DRIVING", "WALKING"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setTravelMode(mode)}
              className={`px-3 py-2 transition-colors ${
                travelMode === mode
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-700"
              }`}
            >
              {mode === "DRIVING" ? "🚗 Drive" : "🚶 Walk"}
            </button>
          ))}
        </div>
      </div>

      {/* Directions Panel */}
      {selectedPlace && (
        <div className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex flex-col max-h-52 overflow-y-auto">
          {/* Route summary bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-violet-600 text-white shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <LuNavigation2 className="shrink-0" />
              <span className="font-semibold text-sm truncate">{selectedPlace.name}</span>
            </div>
            {dirLoading ? (
              <span className="text-xs opacity-80 animate-pulse">Calculating…</span>
            ) : routeInfo ? (
              <div className="flex items-center gap-3 text-xs shrink-0">
                <span className="flex items-center gap-1">
                  <LuMoveRight className="text-violet-200" />
                  {routeInfo.distance}
                </span>
                <span className="flex items-center gap-1">
                  <LuClock className="text-violet-200" />
                  {routeInfo.duration}
                </span>
              </div>
            ) : (
              <span className="text-xs opacity-70">Route unavailable</span>
            )}
          </div>

          {/* Step-by-step instructions */}
          {steps.length > 0 && (
            <ol className="divide-y divide-gray-50 dark:divide-slate-800">
              {steps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 px-4 py-2.5 text-xs text-slate-700 dark:text-slate-300"
                >
                  <span className="shrink-0 w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 flex items-center justify-center font-bold text-[10px]">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="leading-snug">{step.instruction}</p>
                    <p className="text-slate-400 dark:text-slate-500 mt-0.5">
                      {step.distance} · {step.duration}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
