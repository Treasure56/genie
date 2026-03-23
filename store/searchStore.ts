import { create } from "zustand";
import { type PlaceResult } from "@/types/placeResult";

interface SearchState {
  places: PlaceResult[];
  selectedPlace: PlaceResult | null;
  userLocation: { lat: number; lng: number } | null;

  setPlaces: (places: PlaceResult[]) => void;
  setSelectedPlace: (place: PlaceResult | null) => void;
  setUserLocation: (loc: { lat: number; lng: number } | null) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  places: [],
  selectedPlace: null,
  userLocation: null,

  setPlaces: (places) => set({ places }),
  setSelectedPlace: (place) =>
    set((s) => ({ selectedPlace: s.selectedPlace?.id === place?.id ? null : place })),
  setUserLocation: (loc) => set({ userLocation: loc }),
}));
