import { type PlaceResult } from "@/types/placeResult";
import { $getRecommendations } from "@/action/getRecommendations";
import { AppPageProps } from "@/types";
import Forms from "./Forms";
import SearchContent from "./SearchContent";

type SearchParams = {
  destination?: string;
  travelDates?: string;
  budget?: string;
  tripDuration?: string;
  interests?: string;
};

export default async function Page({
  searchParams,
}: AppPageProps<unknown, SearchParams>) {
  const params = await searchParams;
  const destination = params?.destination;
  const interests = params?.interests ? params.interests.split(",") : [];
  const budget = Number(params?.budget ?? 0);

  let places: PlaceResult[] = [];

  if (destination && params?.budget && params?.tripDuration) {
    places = await $getRecommendations({
      location: destination,
      budget,
      tripDuration: params.tripDuration,
      interests,
    });
  }

  return (
    <div className="py-16 md:py-24 dark:bg-slate-950 min-h-screen">
      <Forms defaultValues={{ ...params, interests }} />

      {destination ? (
        <>
          <div className="app-container mt-6 mb-2">
            <h2 className="text-xl font-bold dark:text-white text-slate-900">
              {places.length > 0
                ? `${places.length} recommended places in ${destination} ✨`
                : "Fetching recommendations…"}
            </h2>
            {params?.travelDates && (
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {params.travelDates} · {params.tripDuration} days · $
                {params.budget} budget
              </p>
            )}
          </div>
          <SearchContent places={places} />
        </>
      ) : (
        <div className="app-container mt-16 text-center text-slate-400 dark:text-slate-500">
          <p className="text-lg">
            Enter a destination above to get recommendations{" "}
          </p>
        </div>
      )}
    </div>
  );
}
