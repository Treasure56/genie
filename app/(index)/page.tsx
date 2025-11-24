import Features from "@/components/home/Features";
import Hero from "./Hero";
import Cta from "@/components/home/Cta";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="">
      <Hero />
      <Features />
      <Cta />
      <Footer />
    </main>
  );
}