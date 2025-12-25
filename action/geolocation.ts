import { $getCurrentLocation } from "@/action/getCurrentLocation";

export const getUserLocation = (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    try {
      // Check permissions
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permissionStatus.state === "denied") {
        reject(new Error("Geolocation permission denied."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { address, error } = await $getCurrentLocation(
              position.coords.latitude,
              position.coords.longitude
            );

            if (address) {
              resolve(address);
            } else {
              reject(new Error(error || "Unknown error fetching address"));
            }
          } catch (err) {
            reject(err);
          }
        },
        (error) => {
          reject(error);
        }
      );
    } catch (error) {
      // Fallback if permissions API fails or other errors
      reject(error);
    }
  });
};
