import Image from "next/image";
import { LuMapPin, LuStar } from "react-icons/lu";
import { PlaceResult } from "@/types/placeResult";

interface PlaceCardProps {
    place?: PlaceResult;
}

export default function PlaceCard({ place }: PlaceCardProps) {
    // const name = place?.name || "Grand Hyatt Tokyo";
    // const rating = place?.rating || 4.5;
    // const address = place?.vicinity || "6-10-3 Roppongi, Minato-ku, Tokyo";
    // const priceLevel = place?.price_level || 3;
    // const imageSrc = "/images/itenary.jpg";

    return (
        <div className="group bg-white rounded-2xl p-3  duration-300 border border-gray-100 flex gap-4">
            <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-xl">
                <Image
                    src={place?.photos?.[0].photo_reference || ""}
                    alt={place?.name || ""}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col flex-1 justify-between py-1">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-900 text-lg leading-tight line-clamp-1">{place?.name}</h3>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md">
                            <LuStar className="text-yellow-500 fill-yellow-500 text-xs" />
                            <span className="text-xs font-bold text-yellow-700">{place?.rating}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-slate-500 text-sm">
                        <LuMapPin className="text-xs shrink-0" />
                        <p className="line-clamp-1">{place?.vicinity}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-900 font-medium">
                            <span className="text-gray-800">${place?.price_level}</span>
                        </span>

                    </div>


                </div>
            </div>
        </div>
    );
}