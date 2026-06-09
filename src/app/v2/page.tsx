import type { Metadata } from "next";
import { ScrollProgress } from "@/components/v2/ScrollProgress";
import { TopNav } from "@/components/v2/TopNav";
import { Hero } from "@/components/v2/Hero";
import { BuiltHomes } from "@/components/v2/BuiltHomes";
import { Features } from "@/components/v2/Features";
import { TestimonialReel } from "@/components/v2/TestimonialReel";
import { TheStudio } from "@/components/v2/TheStudio";
import { FAQ } from "@/components/v2/FAQ";
import { FinalCTA } from "@/components/v2/FinalCTA";
import { Footer } from "@/components/v2/Footer";

export const metadata: Metadata = {
  title: "Naxsha — AI floor plans for Indian homes",
  description:
    "Naxsha has shipped AI floor plans to 4,247 Indian homes — with ±4% built-cost accuracy. Build right, the first time.",
};

export default function NaxshaV2() {
  return (
    <div id="top" className="naxsha-theme min-h-screen flex flex-col">
      <ScrollProgress />
      <TopNav />
      <main className="flex-1">
        <Hero />
        <BuiltHomes />
        <Features />
        <TestimonialReel />
        <TheStudio />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
