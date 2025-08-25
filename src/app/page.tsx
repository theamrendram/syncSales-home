import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/Features"
import { Pricing } from "@/components/Pricing"
import { FAQ } from "@/components/FAQ"
import { CTA } from "@/components/cta"
import { TimelineDemo } from "@/components/FeaturesNew"
import { GridBackgroundDemo } from "@/components/GridBackground"

export default function Home() {
  return (
    <div className="relative">
      {/* <GridBackgroundDemo /> */}
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
    </div>
  )
}

