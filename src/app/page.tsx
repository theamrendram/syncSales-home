import CallToAction from "@/components/CallToAction";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import { TimelineDemo } from "@/components/FeaturesNew";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Setup from "@/components/Setup";
export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black  bg-grid-white/[0.1] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
      <div className="mt-2">
        <Navbar />
      </div>
      <div className="h-[80vh] flex items-center justify-center">
        <HeroSection />
      </div>
      <Features />
      <TimelineDemo/>
      {/* <Setup /> */}
      <Pricing />
      <CallToAction />
      <FAQ />
      <Footer/>
    </main>
  );
}
