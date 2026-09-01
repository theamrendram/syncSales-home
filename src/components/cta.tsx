import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const trustPoints = [
  "No credit card required",
  "Setup in 5 minutes",
  "Cancel anytime",
];

export function CTA() {
  return (
    // The one saturated moment on an otherwise light page: full brand
    // gradient, white type. Everything inside is fixed white/white-alpha
    // rather than tokenized, because the surface is deliberately inverted.
    <section className="gradient-primary">
      <div className="container py-24 sm:py-32">
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Ready to close more deals this month?
          </h2>
          <p className="mx-auto max-w-[600px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join 10,000+ sales professionals who&apos;ve transformed their
            pipeline with SyncSales. Start your free trial today and see results
            in your first week.
          </p>

          <div className="space-y-6 text-center">
            <Link
              href="/checkout?plan=pro&source=cta"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-white px-10 text-lg font-semibold text-foreground shadow-3xl transition-transform duration-200 hover:scale-105"
            >
              Start Your 7-Day Free Trial{" "}
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>

            {/* Trust indicators */}
            <div className="flex flex-col items-center justify-center gap-6 text-sm text-white/90 sm:flex-row">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-white" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
