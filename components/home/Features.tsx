"use client"

import Image from "next/image";
import { LuBadgeDollarSign, LuBot, LuMapPinCheck, LuSlidersHorizontal, LuTarget } from "react-icons/lu";
import FeaturesTile from "./FeaturesTile";
import FeaturesImage from "./FeaturesImage";
import { useState } from "react";

export default function Features() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <section className="app-container py-12 flex flex-col gap-10 relative">

            <div className="flex flex-col gap-3">
                <p className="text-brand-primary bg-purple-50 border border-purple-100 rounded-full px-4 py-1.5 w-fit inline-flex gap-2 items-center text-sm font-semibold">
                    <LuTarget className="text-brand-primary" /> Personalized Planning
                </p>
                <h2 className="heading leading-tight font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-slate-800 to-slate-600">
                    Clarity for Every Step of Your Journey
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 flex flex-col gap-24">
                    {
                        [
                            "/images/itenary.jpg",
                            "/images/map-view.jpg",
                            "/images/itenary.jpg",
                            "/images/map-view.jpg",
                        ].map((src, index) => (
                            <FeaturesImage
                                key={index}
                                src={src}
                                alt="Personalized Itinerary"
                                index={index}
                                setIndex={setActiveIndex}
                            />
                        ))
                    }
                </div>
                <div className="lg:col-span-5 sticky top-24">
                    <div className="flex flex-col gap-4">
                        {features.map((feature, i) => (
                            <FeaturesTile key={i} {...feature} isActive={i === activeIndex} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const features = [
    {
        title: "AI-Generated Itineraries",
        description: "Receive personalized recommendations for every aspect, aligned with your preferences and distinct travel style.",
        icon: <LuBot className="text-brand-primary group-hover:text-white transition-colors" size={20} />
    },
    {
        title: "Interactive Map View",
        description: "Explore your entire trip on an easy-to-use map. See recommended places, routes, and nearby attractions in real time as you move around the map.",
        icon: <LuMapPinCheck className="text-brand-primary group-hover:text-white transition-colors" size={20} />
    },
    {
        title: "Budget-Aware Recommendations",
        description: "Get suggestions that match your spending plan. The system recommends hotels, activities, and restaurants that fit your budget without compromising quality.",
        icon: <LuBadgeDollarSign className="text-brand-primary group-hover:text-white transition-colors" size={20} />
    },
    {
        title: "Travel Style Personalization",
        description: "Receive recommendations tailored to your travel vibe—whether you prefer adventure, relaxation, nightlife, food spots, or cultural experiences.",
        icon: <LuSlidersHorizontal className="text-brand-primary group-hover:text-white transition-colors" size={20} />
    },
]