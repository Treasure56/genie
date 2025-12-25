"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import {
  LuBadgeDollarSign,
  LuBot,
  LuMapPinCheck,
  LuSlidersHorizontal,
  LuTarget,
} from "react-icons/lu";
import FeaturesImage from "./FeaturesImage";
import FeaturesTile from "./FeaturesTile";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const totalFeatures = features.length;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000", // Pin for a significant distance to allow comfortable reading
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          // Calculate active index based on scroll progress
          const index = Math.floor(self.progress * totalFeatures);
          const clampedIndex = Math.min(index, totalFeatures - 1);
          setActiveIndex(clampedIndex);
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="relative min-h-screen">
      <div
        ref={containerRef}
        className="app-container py-24 relative h-screen flex flex-col justify-center"
      >
        <div className="flex flex-col gap-4 mb-12 text-center items-center shrink-0">
          <p className="text-brand-primary bg-purple-50 border border-purple-100 rounded-full px-4 py-1.5 w-fit inline-flex gap-2 items-center text-sm font-semibold">
            <LuTarget className="text-brand-primary" /> Personalized Planning
          </p>
          <h2 className="heading leading-tight font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-slate-800 to-slate-600 max-w-2xl">
            Clarity for Every Step of Your Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center justify-center flex-1">
          {/* Left Column: Image Deck */}
          <div className="hidden lg:flex h-full max-h-[500px] items-center justify-center">
            <FeaturesImage
              images={features.map((f) => f.image)}
              activeIndex={activeIndex}
            />
          </div>

          {/* Right Column: Text List */}
          <div className="flex flex-col items-center gap-6 justify-center p-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center w-full transition-all duration-300"
                style={{
                  opacity: i === activeIndex ? 1 : 0.3, // Fade out inactive items for focus
                  transform: i === activeIndex ? "scale(1.05)" : "scale(1)",
                }}
              >
                <FeaturesTile
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  isActive={i === activeIndex}
                />
              </div>
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
    description:
      "Receive personalized recommendations for every aspect, aligned with your preferences and distinct travel style.",
    icon: <LuBot size={24} />,
    image: "/images/itenary.jpg",
  },
  {
    title: "Interactive Map View",
    description:
      "Explore your entire trip on an easy-to-use map. See recommended places, routes, and nearby attractions in real time.",
    icon: <LuMapPinCheck size={24} />,
    image: "/images/map-view.jpg",
  },
  {
    title: "Budget-Aware Recommendations",
    description:
      "Get suggestions that match your spending plan. The system recommends hotels, activities, and restaurants that fit your budget.",
    icon: <LuBadgeDollarSign size={24} />,
    image: "/images/itenary.jpg",
  },
  {
    title: "Travel Style Personalization",
    description:
      "Receive recommendations tailored to your travel vibe—whether you prefer adventure, relaxation, nightlife, or culture.",
    icon: <LuSlidersHorizontal size={24} />,
    image: "/images/map-view.jpg",
  },
];
