import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import { GridBackgroundDemo } from "./GridBackground";
import Link from "next/link";

export function Hero() {
  return (
    <GridBackgroundDemo>
      <div className="relative text-white">
        <div className="absolute inset-0 -z-10 gradient-secondary" />
        <div className="container flex flex-col items-center justify-center space-y-12 py-32 md:py-40 lg:py-48">
          <div className="space-y-8 text-center">
            <Badge
              variant="secondary"
              className="w-fit mx-auto bg-neutral-300 text-neutral-900">
              Trusted by Sales Teams
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Increase your revenue by 40% <br className="hidden sm:inline" />
              <span className="gradient-text">in half the time</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl leading-relaxed">
              Stop wasting time on manual processes. SyncSales automates your
              entire lead management so you can focus on what matters most:
              running your business and growing revenue.
            </p>
          </div>

          {/* Single, Clear CTA */}
          <div className="text-center">
            <Link
              href="/checkout/free-trial"
              className="inline-flex h-14 px-10 gradient-primary rounded-xl text-white text-lg font-semibold items-center justify-center hover:scale-105 transition-transform duration-200 shadow-2xl">
              Start Your 14-Day Free Trial{" "}
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
            <p className="text-gray-400 text-sm mt-3">
              No credit card required • Cancel anytime
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm text-gray-300">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm text-gray-300">Setup in 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm text-gray-300">Instant ROI</span>
            </div>
          </div>
        </div>
      </div>
    </GridBackgroundDemo>
  );
}
