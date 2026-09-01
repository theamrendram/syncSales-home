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
      <div className="container py-20 sm:py-24 md:py-32">
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Ready to close more deals this month?
          </h2>
          <p className="mx-auto max-w-[600px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join 10,000+ sales professionals who&apos;ve transformed their
            pipeline with SyncSales. Start your free trial today and see results
            in your first week.
          </p>

          <div className="w-full max-w-sm space-y-6 text-center sm:max-w-none">
            <Link
              href="/checkout?plan=pro&source=cta"
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-white px-6 py-4 text-base font-semibold text-foreground shadow-3xl transition-transform duration-200 hover:scale-105 sm:w-auto sm:px-10 sm:text-lg"
            >
              Start Your 7-Day Free Trial
              <ArrowRight className="h-5 w-5 shrink-0" />
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
