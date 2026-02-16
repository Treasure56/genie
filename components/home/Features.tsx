"use client";

import { LuTarget } from "react-icons/lu";
import { FeatureSteps } from "../ui/feature-section";

export default function Features() {
  return (
    <section className="relative py-24 bg-white dark:bg-slate-950">
      <div className="app-container flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center items-center shrink-0">
          <p className="text-brand-primary dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 rounded-full px-4 py-1.5 w-fit inline-flex gap-2 items-center text-sm font-semibold">
            <LuTarget className="text-brand-primary dark:text-purple-300" />{" "}
            Personalized Planning
          </p>
          <h2 className="heading leading-tight font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-slate-800 to-slate-600 dark:bg-none dark:text-slate-100 max-w-2xl">
            Clarity for Every Step of Your Journey
          </h2>
        </div>

        <FeatureSteps
          features={stepsFeatures}
          title=""
          autoPlayInterval={4000}
          imageHeight="h-[500px]"
          className="p-0 md:p-0"
        />
      </div>
    </section>
  );
}

const stepsFeatures = [
  {
    step: "Personalization",
    title: "AI-Generated Itineraries",
    content:
      "Receive personalized recommendations for every aspect, aligned with your preferences and distinct travel style.",
    image: "/images/itenary.jpg",
  },
  {
    step: "Usage",
    title: "Interactive Map View",
    content:
      "Explore your entire trip on an easy-to-use map. See recommended places, routes, and nearby attractions in real time.",
    image: "/images/map-view.jpg",
  },
  {
    step: "Budgeting",
    title: "Budget-Aware Recommendations",
    content:
      "Get suggestions that match your spending plan. The system recommends hotels, activities, and restaurants that fit your budget.",
    image: "/images/itenary.jpg",
  },
  {
    step: "Customization",
    title: "Travel Style Personalization",
    content:
      "Receive recommendations tailored to your travel vibe—whether you prefer adventure, relaxation, nightlife, or culture.",
    image: "/images/map-view.jpg",
  },
];
