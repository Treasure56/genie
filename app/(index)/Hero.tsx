import HeroForm from "@/components/home/HeroForm";
import { LuSparkles } from "react-icons/lu";

export default function Hero() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden h-full ">
      <div
        aria-hidden="true"
        className="
    pointer-events-none absolute left-1/2 -translate-x-1/2 -top-32
    w-[500px] h-[500px] rounded-full
    bg-linear-to-b from-slate-500 via-pink-200 to-yellow-300
    opacity-30 blur-3xl
    animate-[pulse_6s_ease-in-out_infinite]
  "
      />

      <div className="relative z-10 flex flex-col items-center max-w-[900px] mx-auto text-center gap-6 px-4">
        <h1 className="text-4xl md:text-6xl xl:text-7xl font-semibold flex items-center justify-center gap-3 text-slate-800">
          <LuSparkles className="text-4xl md:text-5xl animate-pulse" />
          AI Powered Trip Planner
        </h1>
        <p className="text-base text-gray-700">Experience the world, don&apos;t just visit it. We swap generic tourist traps for personalized recommendations, turning a list of destinations into a cohesive journey designed specifically for your taste.</p>
      </div>

      <div className="absolute top-0 left-0 w-full h-full ">
        <LuSparkles className="absolute bottom-5 right-20 text-3xl md:text-4xl animate-pulse size-24 " />
      </div>
      <HeroForm />
    </section>
  );
}
