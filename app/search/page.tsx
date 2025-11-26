import { dummyPlaces } from "@/types/placeResult";
import Forms from "./Forms";
import PlaceCard from "./PlaceCard";
import TripMap from "@/components/map/TripMap";

export default function Page() {
  const places = dummyPlaces;
  return (
    <div className=" py-16 md:py-24">
      <Forms />
      <div className="grid grid-cols-12 app-container py-7 gap-4">
        <div className="col-span-12 md:col-span-5 flex flex-col gap-2">
          {places.map((place) => (
            <PlaceCard key={place.place_id} place={place} />
          ))}
        </div>
        <div className="col-span-12 md:col-span-7 bg-gray-200 flex flex-col justify-center items-center rounded-md overflow-hidden h-full">
          <TripMap />
        </div>
      </div>
    </div>
  );
}
