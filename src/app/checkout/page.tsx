"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  { name: "Pro Plan", price: 46 },
  { name: "Basic Plan", price: 20 },
];
function Checkout() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") || "Pro Plan";
  const plan = plans.find((plan) => plan.name === planParam) || {
    name: "Pro Plan",
    price: 0,
    trialDays: 7,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar className="bg-zinc-700" />
      <main className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Start your 7‑day free trial
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Unlock every premium feature—no credit card, no commitments.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Benefits Section */}
            <div className="md:col-span-2 space-y-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 ">
                <CardHeader>
                  <CardTitle className="text-blue-700">
                    What’s included
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Unlimited access to all premium tools for 7 days
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Priority support from our team
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Create unlimited projects and invite collaborators
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Cancel anytime—keep your work
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-blue-100 pt-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Shield className="h-4 w-4" />
                    <span>Secure, hassle‑free signup</span>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Checkout Form */}
            <div className="md:col-span-3">
              <Card className="shadow-lg border-gray-200">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Start a 7‑day free trial of {plan.name}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Enjoy the full product experience for a week—risk‑free.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <p className="text-gray-600 mb-6">
                      Create your account to begin your trial. It only takes a
                      minute and you can cancel anytime.
                    </p>

                    <Link href="/auth">
                      <Button className="w-full h-12 bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-900 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        <div className="flex items-center gap-3">
                          <span>Start free trial</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Button>
                    </Link>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    <p>
                      By continuing, you agree to our Terms of Service and
                      Privacy Policy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }>
      <Checkout />
    </Suspense>
  );
}
