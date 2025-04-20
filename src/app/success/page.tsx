"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import Link from "next/link";
import { CheckCircle } from "lucide-react";

function Success() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subscriptionId = searchParams.get("subscription_id");
  const planType = searchParams.get("plan");
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchsubscriptionDetails = async () => {
      setLoading(true);
      setError("");

      // If this is a free plan, create mock order details
      if (!subscriptionId && planType === "free") {
        setSubscriptionDetails({
          id: "free_plan",
          amount: 0,
          notes: {
            plan: "Free Trial",
            billingCycle: "monthly",
            isTrial: "yes",
            trialDays: "7",
          },
        });
        setLoading(false);
        return;
      }

      // If there's no order ID or plan type, redirect to home page
      if (!subscriptionId && !planType) {
        router.push("/");
        return;
      }

      try {
        // Fetch order details from your server
        const response = await fetch(
          `/api/subscription-details?subscription_id=${subscriptionId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch subscription details");
        }

        const data = await response.json();
        setSubscriptionDetails(data);
      } catch (err) {
        console.error("Error fetching subscription details:", err);
        setError("Unable to load your subscription details. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    fetchsubscriptionDetails();
  }, [subscriptionId, planType, router]);

  // Helper to get trial days based on plan
  const getTrialDays = (planName: string) => {
    const trialDaysMap: { [key: string]: number } = {
      "Free Trial": 7,
      Enterprise: 7,
      Basic: 0,
      Pro: 0,
    };
    return trialDaysMap[planName] || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">
              Thank You for Your Order!
            </CardTitle>
            <CardDescription>
              Your subscription has been confirmed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}
            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading order details...</p>
              </div>
            )}

            {!loading && !error && subscriptionDetails && (
              <div className="divide-y">
                <div className="py-3 flex justify-between">
                  <span className="text-gray-600">Subscription ID:</span>
                  <span className="font-medium">{subscriptionDetails.id}</span>
                </div>

                <div className="py-3 flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium">
                    {subscriptionDetails.notes?.plan || planType}
                  </span>
                </div>

                <div className="py-3 flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">
                    {subscriptionDetails.amount === 0
                      ? "Free"
                      : `₹${(subscriptionDetails.amount / 100).toFixed(2)}`}
                  </span>
                </div>

                {subscriptionDetails.notes?.billingCycle && (
                  <div className="py-3 flex justify-between">
                    <span className="text-gray-600">Billing:</span>
                    <span className="font-medium capitalize">
                      {subscriptionDetails.notes.billingCycle}
                    </span>
                  </div>
                )}

                {(subscriptionDetails.notes?.isTrial === "yes" ||
                  planType === "free") && (
                  <div className="py-3 flex justify-between">
                    <span className="text-gray-600">Trial Period:</span>
                    <span className="font-medium">
                      {subscriptionDetails.notes?.trialDays ||
                        getTrialDays(
                          subscriptionDetails.notes?.plan || planType
                        )}{" "}
                      days
                    </span>
                  </div>
                )}

                <div className="py-3 flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Link href="https://dashboard.syncsales.tech" target="_blank" className="w-full">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
            <Link
              href="/support"
              className="text-sm text-gray-500 hover:text-gray-700 text-center w-full">
              Need help? Contact our support team
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }>
      <Success />
    </Suspense>
  );
}
