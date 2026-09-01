import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import { GridBackgroundDemo } from "./GridBackground";
import Link from "next/link";

const trustPoints = [
  "7-day free trial",
  "Setup in 5 minutes",
  "Instant ROI",
];

export function Hero() {
  return (
    <GridBackgroundDemo>
      <div className="relative">
        <div className="gradient-secondary absolute inset-0 -z-10" />
        <div className="container flex flex-col items-center justify-center space-y-12 py-32 md:py-40 lg:py-48">
          <div className="space-y-8 text-center">
            <Badge variant="secondary" className="mx-auto w-fit">
              Trusted by Sales Teams
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Increase your revenue by 40% <br className="hidden sm:inline" />
              <span className="gradient-text">in half the time</span>
            </h1>
            <p className="mx-auto max-w-[700px] leading-relaxed text-muted-foreground md:text-xl lg:text-2xl">
              Stop wasting time on manual processes. SyncSales automates your
              entire lead management process so you can focus on what matters
              most: running your business and growing revenue.
            </p>
          </div>

          {/* Single, Clear CTA */}
          <div className="text-center">
            <Link
              href="/contact?source=free-trial"
              className="gradient-primary inline-flex h-14 items-center justify-center rounded-lg px-10 text-lg font-semibold text-white shadow-3xl transition-transform duration-200 hover:scale-105"
            >
              Start Your 7-Day Free Trial{" "}
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              No credit card required • Cancel anytime
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col items-center gap-6 pt-8 sm:flex-row">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <span className="text-sm text-muted-foreground">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GridBackgroundDemo>
  );
}
