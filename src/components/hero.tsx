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
        <div className="container flex flex-col items-center justify-center space-y-10 py-24 sm:space-y-12 sm:py-32 md:py-40 lg:py-48">
          <div className="space-y-8 text-center">
            <Badge variant="secondary" className="mx-auto w-fit">
              Trusted by Sales Teams
            </Badge>
            <h1 className="text-[2rem] font-bold leading-[1.1] tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Increase your revenue by 40% <br />
              <span className="gradient-text">in half the time</span>
            </h1>
            <p className="mx-auto max-w-[700px] leading-relaxed text-muted-foreground md:text-xl lg:text-2xl">
              Stop wasting time on manual processes. SyncSales automates your
              entire lead management process so you can focus on what matters
              most: running your business and growing revenue.
            </p>
          </div>

          {/* Single, Clear CTA */}
          <div className="w-full max-w-sm text-center sm:max-w-none">
            <Link
              href="/contact?source=free-trial"
              className="gradient-primary inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg px-6 py-4 text-base font-semibold text-white shadow-3xl transition-transform duration-200 hover:scale-105 sm:w-auto sm:px-10 sm:text-lg"
            >
              Start Your 7-Day Free Trial
              <ArrowRight className="h-5 w-5 shrink-0" />
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
