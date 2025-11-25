import HeroForm from "@/components/home/HeroForm";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { LuSparkles } from "react-icons/lu";

export default function Hero() {
  return (
    <section className="relative  py-30 md:py-40 overflow-hidden h-full ">
      <BackgroundRippleEffect />
      <div
        aria-hidden="true"
        className="
    pointer-events-none absolute left-1/2 -translate-x-1/2 -top-32
    w-[500px] h-[500px] rounded-full
    bg-linear-to-b from-purple-950 via-pink-300 to-yellow-300
    opacity-30 blur-3xl
    animate-[pulse_6s_ease-in-out_infinite]
  "
      />

      <div className="relative z-10 flex flex-col items-center max-w-[900px] mx-auto text-center gap-6 px-4">
        <h1 className="text-3xl md:text-6xl font-semibold flex items-center justify-center  text-slate-800 leading-none">
          <LuSparkles className="text-3xl md:text-6xl animate-pulse text-purple-950 leading-none text-pretty" />
          Intelligent Planning for Inspired Journeys
        </h1>

        <p className="text-base text-slate-700 max-w-120 mx-auto text-pretty text-center">No more generic travel guides. Enjoy recommendations crafted from data, taste and your unique travel identity.</p>
        <HeroForm />
      </div>
    </section>
  );
}
