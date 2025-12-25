"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";

type FeaturesImageProps = {
  images: string[];
  activeIndex: number;
};

export default function FeaturesImage({
  images,
  activeIndex,
}: FeaturesImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate images based on activeIndex
      images.forEach((_, index) => {
        const isActive = index === activeIndex;
        const zIndex = isActive ? 10 : 0;
        const opacity = isActive ? 1 : 0;
        const scale = isActive ? 1 : 0.9;
        const rotate = isActive ? 0 : index % 2 === 0 ? -5 : 5; // Slight rotation for deck effect

        gsap.to(`.image-card-${index}`, {
          opacity: opacity,
          scale: scale,
          zIndex: zIndex,
          rotation: rotate,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    },
    { dependencies: [activeIndex], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[500px] mx-auto perspective-1000"
    >
      {images.map((src, index) => (
        <div
          key={index}
          className={cn(
            `image-card-${index} absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-white origin-bottom`,
            "will-change-transform will-change-opacity"
          )}
          style={{
            zIndex: index === 0 ? 1 : 0, // Initial stacking
          }}
        >
          <Image
            src={src}
            alt={`Feature ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Overlay for depth */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
