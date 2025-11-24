"use client"

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesImage({ src, alt, index, setIndex }: {
    src: string, alt: string, index: number,
    setIndex: (index: number) => void
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            const scrollTriggerInstance = ScrollTrigger.create({
                trigger: ref.current,
                start: "top center",
                end: "bottom center",
                onEnter: () => { // When scrolling down and entering the trigger area
                    setIndex(index);
                },
                onEnterBack: () => { // When scrolling up and re-entering the trigger area
                    setIndex(index);
                },
                onLeaveBack: () => { // When scrolling up and leaving the trigger area
                    // Reduce the index, ensuring it doesn't go below 0
                    setIndex(Math.max(0, index - 1));
                },
                // markers: true,
            });

            return () => {
                if (scrollTriggerInstance) {
                    scrollTriggerInstance.kill();
                }
            };
        }
    }, [index, setIndex]);

    return (
        <div ref={ref} className="w-full flex flex-col bg-purple-50/50 backdrop-blur-xl rounded-2xl border h-full border-white/50 py-6 px-6 md:px-12 aspect-8/5 transition-all duration-500 sticky! top-24">
            <Image
                src={src}
                alt={alt}
                width={700}
                height={700}
                className="object-cover rounded-xl w-full h-full shadow-lg"
            />
        </div>
    );
}
