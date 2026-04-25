import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="border-t border-white/10">
      <div className="relative">
        <div className="gradient-secondary absolute inset-0 -z-10" />
        <div className="container py-24 sm:py-32">
          <div className="flex flex-col items-center gap-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Ready to{" "}
              <span className="bg-gray-300 px-2">
                <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                  close more deals
                </span>
              </span>{" "}
              this month?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join 10,000+ sales professionals who&apos;ve transformed their
              pipeline with SyncSales. Start your free trial today and see
              results in your first week.
            </p>

            {/* Single, Clear CTA */}
            <div className="space-y-4 text-center">
              {/* OLD START FREE TRIAL BUTTON - COMMENTED OUT
              <Link
                href="/checkout"
                className="gradient-primary inline-flex h-14 items-center justify-center rounded-xl px-10 text-lg font-semibold text-white shadow-2xl transition-transform duration-200 hover:scale-105"
              >
                Start Your 7-Day Free Trial{" "}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
              */}
              {/* NEW START FREE TRIAL BUTTON - REDIRECTS TO CONTACT PAGE */}
              <Link
                href="/checkout?plan=pro&source=cta"
                className="gradient-primary inline-flex h-14 items-center justify-center rounded-xl px-10 text-lg font-semibold text-white shadow-2xl transition-transform duration-200 hover:scale-105"
              >
                Start Your 7-Day Free Trial{" "}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>

              {/* Trust indicators */}
              <div className="flex flex-col items-center justify-center gap-6 text-sm text-gray-300 sm:flex-row">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Setup in 5 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
