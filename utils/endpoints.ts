export const API_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const API_BASE_URL = "https://maps.googleapis.com/maps/api";

export const endpoints = {
  placesSearch: `${API_BASE_URL}/place/nearbysearch/json`,
  textSearch: `${API_BASE_URL}/place/textsearch/json`,
  // getCurrentLocation: `${API_BASE_URL}/geocode/json?latlng=${lat},${lng}&key=${apiKey}`,
};
