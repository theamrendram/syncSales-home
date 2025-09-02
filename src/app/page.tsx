import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/Features";
import { TrustSection } from "@/components/TrustSection";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

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
