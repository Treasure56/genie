"use client";

import { type PlaceResult } from "@/types/placeResult";
import { LuMapPin, LuStar, LuNavigation } from "react-icons/lu";

interface PlaceCardProps {
  place: PlaceResult;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function PlaceCard({ place, isSelected, onClick }: PlaceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left group rounded-2xl border transition-all duration-200 flex flex-col overflow-hidden cursor-pointer
        ${isSelected
          ? "border-violet-500 shadow-md shadow-violet-100 dark:shadow-violet-900/20"
          : "border-gray-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-sm"
        }`}
    >
      {/* Photo */}
      {place.photos?.[0] ? (
        <div className="relative w-full h-32 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={place.photos[0]}
            alt={place.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {place.openNow !== undefined && (
            <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full
              ${place.openNow
                ? "bg-emerald-500/90 text-white"
                : "bg-red-500/90 text-white"}`}>
              {place.openNow ? "Open" : "Closed"}
            </span>
          )}
        </div>
      ) : (
        <div className="w-full h-20 bg-linear-to-br from-violet-100 to-slate-100 dark:from-violet-950/30 dark:to-slate-800 flex items-center justify-center shrink-0">
          <LuMapPin className="text-violet-300 text-2xl" />
        </div>
      )}

      {/* Content */}
      <div className={`flex flex-col gap-1 p-3 flex-1
        ${isSelected ? "bg-violet-50 dark:bg-violet-950/30" : "bg-white dark:bg-slate-900"}`}>
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-tight line-clamp-1">
            {place.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            {place.rating && (
              <div className="flex items-center gap-0.5 bg-yellow-50 dark:bg-yellow-900/20 px-1.5 py-0.5 rounded-full">
                <LuStar className="text-yellow-500 fill-yellow-500 text-[10px]" />
                <span className="text-[11px] font-bold text-yellow-700 dark:text-yellow-400">
                  {place.rating.toFixed(1)}
                </span>
              </div>
            )}
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {place.priceRange}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
          <LuMapPin className="shrink-0 text-violet-400 text-[11px]" />
          <span className="line-clamp-1">{place.address}</span>
        </div>

        {isSelected && (
          <div className="flex items-center gap-1 text-violet-600 dark:text-violet-400 text-xs font-semibold mt-1 animate-pulse">
            <LuNavigation className="text-xs" />
            <span>Getting directions…</span>
          </div>
        )}

        {place.types.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {place.types.slice(0, 2).map((t) => (
              <span key={t} className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-full capitalize">
                {t.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
