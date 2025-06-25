"use client";

import { useState, Suspense } from "react";
import { useAuth0 } from "@/hooks/useAuth0";
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
import { toast } from "sonner";

function Checkout() {
  const { login, isLoading } = useAuth0();

  const handleStartTrial = async () => {
    try {
      await login();
      toast.success("Redirecting to Auth0 for signup...");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Failed to start trial. Please try again.");
    }
  };

  const plan = { name: "Pro Plan", price: 0, trialDays: 7 };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Start Your 7-Day Free Trial
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Get full access to all premium features with no commitment. No
              credit card required.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Benefits Section */}
            <div className="md:col-span-2 space-y-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 ">
                <CardHeader>
                  <CardTitle className="text-blue-700">What You Get</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Full access to all premium features for 7 days
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Priority customer support</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Unlimited projects and collaborators
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Cancel anytime with no obligation
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-blue-100 pt-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Shield className="h-4 w-4" />
                    <span>Secure, hassle-free registration</span>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Checkout Form */}
            <div className="md:col-span-3">
              <Card className="shadow-lg border-gray-200">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    <span className="text-3xl font-bold text-green-600">
                      ${plan.price}
                    </span>
                    /month after {plan.trialDays}-day free trial
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <p className="text-gray-600 mb-6">
                      Create your account to start your free trial. You can
                      cancel anytime.
                    </p>

                    <Button
                      onClick={handleStartTrial}
                      disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-900 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      <div className="flex items-center gap-3">
                        <span>Start Free Trial with Auth0</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    <p>
                      By starting your trial, you agree to our Terms of Service
                      and Privacy Policy.
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
