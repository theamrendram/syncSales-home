import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { TrustSection } from "@/components/TrustSection";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        {/* Headline */}
        <Hero />

        {/* Benefits */}
        <Features />

        {/* Social Proof */}
        <TrustSection />

        {/* Pricing */}
        <Pricing />

        {/* FAQ */}
        <FAQ />

        {/* Single CTA */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
