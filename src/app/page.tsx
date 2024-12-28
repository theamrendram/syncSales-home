import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/Features"
// import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/Pricing"
import { FAQ } from "@/components/FAQ"
import { CTA } from "@/components/cta"

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Features />
        {/* <Testimonials /> */}
        <Pricing />
        <FAQ />
        <CTA />
      </main>
    </div>
  )
}

