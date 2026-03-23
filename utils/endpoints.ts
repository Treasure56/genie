// ── Endpoints ────────────────────────────────────────────────────────────────

// Google Maps Geocoding API (reverse geocoding lat/lng → address)
export const GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

// Google Maps Nearby Search API (find real places near a location)
export const NEARBY_SEARCH_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

// Google Maps Place Photo API base (append maxwidth + photoreference + key)
export const PLACE_PHOTO_URL =
  "https://maps.googleapis.com/maps/api/place/photo";
