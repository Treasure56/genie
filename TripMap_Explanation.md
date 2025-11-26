# TripMap Component Explanation

This document explains the `TripMap.tsx` component, which is responsible for displaying a Google Map with interactive markers for nearby hotels.

## Purpose
The `TripMap` component renders a Google Map centered on a specific location (defaulting to Lagos). It automatically searches for "lodging" (hotels) within a specified radius and displays them as markers. It supports clustering for better visibility and pagination to load more results automatically.

## Key Features
1.  **Google Maps Integration**: Uses `@react-google-maps/api` to load and render the map.
2.  **Nearby Search**: Uses the Google Maps `PlacesService` to find hotels near the center point.
3.  **Pagination**: Automatically fetches more results (next pages) to show a comprehensive list of places.
4.  **Marker Clustering**: Groups nearby markers together to prevent clutter when zoomed out.
5.  **Interactive InfoWindows**: Clicking a marker shows an info window with the place's name, vicinity, and rating.
6.  **Responsive Design**: The map container is styled to be responsive (though currently fixed height in `containerStyle`).

## Code Structure & Key Decisions

### 1. Imports and Setup
```typescript
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, MarkerClusterer } from "@react-google-maps/api";
```
We import necessary components from the official React wrapper for Google Maps.

### 2. Stable Constants (Fix for Infinite Loop)
```typescript
const libraries: ("places")[] = ["places"];
const defaultCenter = { lat: 6.5244, lng: 3.3792 };
```
**Crucial Fix**: The `libraries` array and `defaultCenter` object are defined **outside** the component.
*   **Why?** If these were defined inside the component, they would be re-created on every render.
*   `useJsApiLoader` checks `libraries` for changes. If the reference changes, it might reload the script.
*   `useEffect` depends on `center`. If `defaultCenter` is re-created every time, `useEffect` would run infinitely, causing a loop of API calls and re-renders.

### 3. Component Props
```typescript
export default function TripMap({
    center = defaultCenter,
    radius = 5000,
}: { ... })
```
The component accepts `center` and `radius` as props, allowing the parent component to control where the map looks.

### 4. Loading the API
```typescript
const { isLoaded, loadError } = useJsApiLoader({ ... });
```
This hook handles the asynchronous loading of the Google Maps JavaScript API. It ensures the map only renders when the script is ready.

### 5. State Management
*   `mapRef`: Stores a reference to the Google Map instance to access `PlacesService`.
*   `places`: An array of `PlaceResult` objects found by the search.
*   `selected`: The currently selected place (for the InfoWindow).

### 6. Data Fetching (The `useEffect` Hook)
This is the core logic:
```typescript
useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    
    let isMounted = true;
    setPlaces([]); // Clear old results when center changes
    
    // ... setup service ...

    service.nearbySearch(request, (results, status, pagination) => {
        if (!isMounted) return; // Prevent state update if unmounted
        
        if (status === ...OK && results) {
            // ... map results ...
            
            setPlaces((prev) => {
                // Append new results to existing ones (Fix for Pagination)
                // Filter duplicates to be safe
                return [...prev, ...newPlaces];
            });

            // Handle Pagination
            if (pagination && pagination.hasNextPage) {
                setTimeout(() => {
                    if (isMounted) pagination.nextPage();
                }, 2000); // 2s delay required by Google Maps API
            }
        }
    });

    return () => { isMounted = false; }; // Cleanup
}, [isLoaded, center, radius]);
```
*   **`isMounted`**: A flag to prevent setting state on an unmounted component (e.g., if the user navigates away while searching).
*   **Pagination Logic**: We check `pagination.hasNextPage` and call `pagination.nextPage()` after a 2-second delay (a requirement of the Places API to ensure the next page token is valid).
*   **Appending Results**: We use `setPlaces(prev => [...prev, ...new])` to add new results to the list instead of overwriting them.

### 7. Rendering
*   **`GoogleMap`**: The main container.
*   **`MarkerClusterer`**: Wraps the markers. It takes a function as a child that receives a `clusterer` prop, which must be passed to each `Marker`.
*   **`Marker`**: Renders a pin for each place.
*   **`InfoWindow`**: Renders a popup bubble when a marker is `selected`.

## Summary of Fixes Applied
1.  **Infinite Loop Fix**: Moved `libraries` and `defaultCenter` outside the component to ensure referential stability.
2.  **Pagination Fix**: Changed logic to **append** results instead of replacing them, ensuring all pages of results are shown.
3.  **Cleanup**: Added `isMounted` check to prevent memory leaks and errors during async operations.
