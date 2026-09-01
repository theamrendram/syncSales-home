"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle, Shield } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const plans = [
  { name: "Pro Plan", price: 46 },
  { name: "Basic Plan", price: 20 },
];

function Checkout() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") || "Pro Plan";
  const plan = plans.find((p) => p.name === planParam) || {
    name: "Pro Plan",
    price: 0,
    trialDays: 7,
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Premium background mesh gradient */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="animate-pulse absolute -mr-20 -mt-20 right-0 top-0 h-[600px] w-[600px] rounded-full bg-brand-from/10 blur-[100px]" />
        <div className="absolute -mb-20 -ml-20 bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-brand-to/10 blur-[100px]" />
        <div className="animate-float-slow absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <Navbar className="bg-transparent" />

      <main className="container relative mx-auto px-6 py-32 sm:py-40">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Start your 7-day free trial
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-muted-foreground">
              Experience the full power of SyncSales. First, secure your
              account.
              <br className="hidden sm:block" /> Then, begin your premium
              journey.
            </p>
          </motion.div>

          <div className="grid items-start gap-12 lg:grid-cols-12">
            {/* Features Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 lg:col-span-5"
            >
              <div className="rounded-lg border border-border bg-card p-8 shadow-3xl">
                <h3 className="mb-8 flex items-center gap-2 text-xl font-bold text-foreground">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  Premium Features
                </h3>

                <div className="space-y-6">
                  {[
                    "Unlimited premium access for 7 days",
                    "Priority 24/7 support",
                    "Unlimited projects and collaborators",
                    "Cancel anytime during trial",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <p className="text-[16px] font-semibold leading-snug text-foreground">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
                  <div className="group flex items-center gap-3 text-sm font-bold text-muted-foreground">
                    <Shield className="h-5 w-5 transition-colors group-hover:text-blue-500" />
                    <span>Secure encryption</span>
                  </div>
                  <div className="flex -space-x-2">
                    {["bg-muted", "bg-border", "bg-muted-foreground"].map(
                      (fill) => (
                        <div
                          key={fill}
                          className={`h-8 w-8 rounded-full border-2 border-background ${fill}`}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-3 rounded-lg border border-border bg-muted p-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Verified Secure by SSL
                </span>
              </div>
            </motion.div>

            {/* Checkout Form Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-7"
            >
              <Card className="shadow-3xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Start a 7-day free trial of {plan.name}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Enjoy the full product experience for a week—risk-free.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <p className="mb-6 text-muted-foreground">
                      Create your account to begin your trial. It only takes a
                      minute and you can cancel anytime.
                    </p>

                    <Link href="/contact?source=free-trial">
                      <Button
                        variant="brand"
                        className="group relative h-12 w-full"
                      >
                        <div className="flex items-center gap-3">
                          <span>Start free trial</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Button>
                    </Link>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>
                      By continuing, you agree to our Terms of Service and
                      Privacy Policy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
        </div>
      }
    >
      <Checkout />
    </Suspense>
  );
}
