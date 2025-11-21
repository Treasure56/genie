import Image from "next/image";
import { LuBot, LuTarget } from "react-icons/lu";
import FeaturesTile from "./FeaturesTile";

export default function Features() {
    return (
        <section className="app-container py-5 flex flex-col gap-5">
            <div className=" flex flex-col gap-2">
                <p className="text-slate-700 bg-slate-100 rounded-full px-4 py-1.5 w-fit inline-flex gap-2 items-center text-sm font-medium">
                    <LuTarget className="text-slate-800" /> Personalized Planning
                </p>
                <h2 className="heading text-slate-800 leading-tight font-semibold">
                    Clarity for Every Step of Your Journey
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 py-4 px-12  flex aspect-8/5 justify-center items-center">
                    <Image
                        src="/images/itenary.jpg"
                        alt="Personalized Itinerary"
                        width={700}
                        height={700}
                        className="object-cover rounded-xl w-full h-full"
                    />

                </div>
                <div className="col-span-5">
                    <div className="flex flex-col gap-5">
                        {features.map((feature, index) => (
                            <FeaturesTile key={index} {...feature} />
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
        icon: <LuBot size={20} />
    },
    {
        title: "AI-Generated Itineraries",
        description: "Receive personalized recommendations for every aspect, aligned with your preferences and distinct travel style.",
        icon: <LuBot size={20} />
    },
    {
        title: "AI-Generated Itineraries",
        description: "Receive personalized recommendations for every aspect, aligned with your preferences and distinct travel style.",
        icon: <LuBot size={20} />
    },
    {
        title: "AI-Generated Itineraries",
        description: "Receive personalized recommendations for every aspect, aligned with your preferences and distinct travel style.",
        icon: <LuBot size={20} />
    },
]