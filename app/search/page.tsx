import Forms from "./Forms";
import PlaceCard from "./PlaceCard";

export default function Page() {
    return (
        <div className=" py-16 md:py-24">
            <Forms />
            <div className="grid grid-cols-12 app-container py-7 gap-4">
                <div className="col-span-12 md:col-span-5">
                    <PlaceCard />
                </div>
                <div className="col-span-12 md:col-span-7 bg-blue-200 h-[600px]">
                    <h2>Map</h2>
                </div>

            </div>

        </div>
    );
}
