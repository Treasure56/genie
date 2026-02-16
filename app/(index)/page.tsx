import Features from "@/components/home/Features";
import Hero from "./Hero";
import Cta from "@/components/home/Cta";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="">
      <Suspense>
        <Hero />
      </Suspense>
      <Features />
      <Cta />
      <Footer />
    </main>
  );
}
