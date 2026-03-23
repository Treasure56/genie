"use server";

import { type PlaceCategory, type PlaceResult } from "@/types/placeResult";
import { GEOCODE_URL, NEARBY_SEARCH_URL, PLACE_PHOTO_URL } from "@/utils/endpoints";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!;

// Map user interests → Google Places types
const interestToCategory: Record<string, PlaceCategory> = {
  Nature: "park",
  History: "museum",
  Culture: "tourist_attraction",
  Food: "restaurant",
  Adventure: "tourist_attraction",
  Beach: "park",
  City: "tourist_attraction",
  Shopping: "shopping_mall",
  Nightlife: "bar",
  Fitness: "gym",
};

const typeMap: Record<PlaceCategory, string> = {
  hotel: "lodging",
  restaurant: "restaurant",
  cafe: "cafe",
  bar: "bar",
  park: "park",
  museum: "museum",
  shopping_mall: "shopping_mall",
  entertainment: "movie_theater",
  tourist_attraction: "tourist_attraction",
  gym: "gym",
};

function getPriceRange(priceLevel?: number): string {
  switch (priceLevel) {
    case 0: return "Free";
    case 1: return "$";
    case 2: return "$$";
    case 3: return "$$$";
    case 4: return "$$$$";
    default: return "N/A";
  }
}

async function geocodeDestination(
  destination: string
): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch(
      `${GEOCODE_URL}?address=${encodeURIComponent(destination)}&key=${API_KEY}`
    );
    const data = await res.json();
    if (data.status === "OK" && data.results[0]) {
      return data.results[0].geometry.location;
    }
    return null;
  } catch {
    return null;
  }
}

export async function $getRecommendations(params: {
  location: string;
  budget: number;
  tripDuration: string;
  interests: string[];
}): Promise<PlaceResult[]> {
  const { location, budget, interests } = params;

  if (!API_KEY) throw new Error("Google Maps API key not configured");

  // 1. Geocode destination text → lat/lng
  const coords = await geocodeDestination(location);
  if (!coords) return [];

  const { lat, lng } = coords;

  // 2. Map interests to place categories (deduplicated)
  const categories: PlaceCategory[] = [
    ...new Set(
      interests
        .map((i) => interestToCategory[i])
        .filter(Boolean) as PlaceCategory[]
    ),
  ];

  // Fallback if no interests matched
  if (categories.length === 0) categories.push("tourist_attraction");

  const results: PlaceResult[] = [];

  // 3. Fetch nearby places for each category
  for (const category of categories) {
    const type = typeMap[category];
    const url = `${NEARBY_SEARCH_URL}?location=${lat},${lng}&radius=5000&type=${type}&key=${API_KEY}`;

    try {
      const response = await fetch(url, { cache: "no-store" });
      const data = await response.json();

      if (data.status === "OK" && data.results) {
        const places: PlaceResult[] = data.results
          .slice(0, 5)
          .map(
            (place: {
              place_id: string;
              name: string;
              vicinity?: string;
              formatted_address?: string;
              rating?: number;
              price_level?: number;
              photos?: { photo_reference: string }[];
              geometry: { location: { lat: number; lng: number } };
              types?: string[];
              opening_hours?: { open_now: boolean };
            }) => ({
              id: place.place_id,
              name: place.name,
              address: place.vicinity || place.formatted_address || "",
              vicinity: place.vicinity,
              rating: place.rating,
              priceLevel: place.price_level,
              priceRange: getPriceRange(place.price_level),
              photos: place.photos
                ? [
                    `${PLACE_PHOTO_URL}?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`,
                  ]
                : [],
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
              types: place.types || [],
              openNow: place.opening_hours?.open_now,
            })
          );

        // Filter by budget if price_level is available
        const filtered = places.filter((place) => {
          if (place.priceLevel === undefined) return true;
          if (budget <= 50) return place.priceLevel <= 1;
          if (budget <= 150) return place.priceLevel <= 2;
          return true;
        });

        results.push(...filtered);
      }
    } catch (error) {
      console.error(`Error fetching places for ${category}:`, error);
    }
  }

  return results;
}
