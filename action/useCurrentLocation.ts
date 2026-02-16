import { useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

export function useCurrentLocation() {
    const [isLocating, setIsLocating] = useState(false);
     const [location, setLocation] = useState("");
      const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: ["places"],
  });
  
    if (!navigator.geolocation) {
      alert("Geolocation is not supported on this device");
      return;
    }

    if (!isLoaded) return;

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { location: { lat: latitude, lng: longitude } },
          (results, status) => {
            if (status === "OK" && results && results[0]) {
              setLocation(results[0].formatted_address);
            } else {
              console.error("Geocoder failed due to: " + status);
              // Fallback to coords if geocoding fails, or just keep it empty/alert
              setLocation(`${latitude},${longitude}`);
            }
            setIsLocating(false);
          }
        );
      },
      (error) => {
        console.error("Error getting location", error);
        setIsLocating(false);
        alert("Unable to retrieve your location");
      }
    );
  };