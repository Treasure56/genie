import { useState } from "react";
import { GEOCODE_URL } from "@/utils/endpoints";

export function useCurrentLocation() {
  const [isLocating, setIsLocating] = useState(false);

  async function getLocation(onSuccess: (address: string) => void) {
    if (!navigator.geolocation) return;

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
          const res = await fetch(
            `${GEOCODE_URL}?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const data = await res.json();
          const address = data.results?.[0]?.formatted_address;
          if (address) onSuccess(address);
        } finally {
          setIsLocating(false);
        }
      },
      () => setIsLocating(false)
    );
  }

  return { isLocating, getLocation };
}
