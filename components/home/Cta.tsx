"use client";

import FormButton from "../form/FormButton";
import { LuArrowRight } from "react-icons/lu";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Cta() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        text: "",
        duration: 1.5,
        ease: "none",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="app-container py-20">
      <div className="relative overflow-hidden rounded-3xl bg-brand-primary px-8 py-20 md:px-16 md:py-24 shadow-2xl">
        {/* Background Pattern Text */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 select-none pointer-events-none z-0">
          <h1
            ref={textRef}
            className="text-[15rem] leading-none text-pretty font-black text-white/5 tracking-tighter whitespace-nowrap"
          >
            GENIE✨
          </h1>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start gap-8 max-w-2xl">
          <h2 className="text-4xl md:text-6xl text-pretty font-bold text-white tracking-tight leading-tight">
            Ready to plan your next <br />
            <span className="text-purple-200">dream adventure?</span>
          </h2>

          <p className="text-lg text-pretty text-purple-100/90 leading-relaxed max-w-xl">
            Let&apos;s create a trip that&apos;s tailored to your interests and
            budget. Experience the magic of AI-powered travel planning.
          </p>

          <div className="flex flex-wrap gap-4">
            <FormButton className="bg-white text-brand-primary hover:bg-purple-50 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2">
              Get Started
              <LuArrowRight className="text-xl" />
            </FormButton>
          </div>
        </div>
      </div>
    </section>
  );
}
