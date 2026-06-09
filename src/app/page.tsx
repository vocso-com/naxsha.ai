import { TopNav } from "@/components/home/TopNav";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StudioTour } from "@/components/home/StudioTour";
import { Features } from "@/components/home/Features";
import { CostShowcase } from "@/components/home/CostShowcase";
import { Testimonials } from "@/components/home/Testimonials";
import { Pricing } from "@/components/home/Pricing";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <div id="top" className="naxsha-theme min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <HowItWorks />
        <StudioTour />
        <Features />
        <CostShowcase />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
