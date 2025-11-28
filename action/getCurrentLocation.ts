"use server";

export async function $getCurrentLocation(lat: number, lng: number) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    const res = await fetch(url, { method: "GET" });
    const data = await res.json();

    if (data.status !== "OK") {
      return { error: "Unable to fetch address" };
    }

    const address = data.results[0]?.formatted_address || "Unknown location";

    return { success: true, address };
  } catch (err) {
    console.error(err);
    return { error: "Server error fetching address" };
  }
}
