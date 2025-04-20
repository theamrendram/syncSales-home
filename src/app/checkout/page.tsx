"use client";

import { useState, useEffect, Suspense } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeClosed } from "lucide-react";
import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans = {
  free: { name: "Free Trail", price: 0, trialDays: 7 },
  basic: { name: "Basic", price: 175000, trialDays: 0 },
  pro: { name: "Pro", price: 430000, trialDays: 0 },
  enterprise: { name: "Enterprise", price: 9900, trialDays: 7 }, // Price in paise (99 INR)
};

function Checkout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planParam = searchParams.get("plan") || "pro";
  // Ensure the plan is valid, defaulting to "pro" if invalid
  const selectedPlan = Object.keys(plans).includes(planParam)
    ? planParam
    : "pro";

  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isTrial, setIsTrial] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    address: "",
    password: "",
  });

  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { toast } = useToast();

  const plan = plans[selectedPlan as keyof typeof plans];
  // Calculate price safely (handle free plan case)
  const price =
    plan.price === 0
      ? 0
      : billingCycle === "sixMonths"
      ? plan.price * 6 * 0.9 // 5% discount for 6 months
      : plan.price;

  useEffect(() => {
    // Only load Razorpay script if we're not on the free plan
    if (plan.price > 0) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Check if script exists before removing
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [plan.price]);

  // Validate form before payment
  const validateForm = () => {
    if (plan.price > 0) {
      if (!formData.firstName.trim()) {
        setError("First Name is required");
        return false;
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        setError("Valid email is required");
        return false;
      }
      if (!formData.phone.trim()) {
        setError("Phone number is required");
        return false;
      }
      if (!formData.password.trim()) {
        setError("Password is required");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/subscribe`,
        {
          plan: selectedPlan,
          billingCycle,
          isTrial,
          customer: formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;

      if (!data || !data.subscriptionId) {
        setError(data.error || "Failed to create subscription");
        setIsLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: data.subscriptionId, // This shows Razorpay modal
        name: "SyncSales",
        description: `${plan.name} Plan - ${billingCycle}`,
        handler: async function (response: any) {
          console.log("response", response);
          try {
            const verifyRes = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/verify`,
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySubscriptionId: response.razorpay_subscription_id,
                razorpaySignature: response.razorpay_signature,
                plan: selectedPlan,
                billingCycle,
                isTrial,
                customer: formData,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (verifyRes.status === 200) {
              toast({
                title: "Success",
                description: "Subscription activated!",
              });
              router.push(
                `/success?subscription_id=${response.razorpay_subscription_id}&plan=${plan.name}`
              );
              return;
            }
          } catch (error) {
            console.error("Subscription verification error:", error);
          }

          toast({
            title: "Error",
            description: "Payment failed",
            variant: "destructive",
          });

          setIsLoading(false);
        },
        prefill: {
          name: formData.firstName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleTnC = async () => {
    setTermsAndConditions(!termsAndConditions);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      <main className="mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Complete Your Order
        </h1>
        <Card className="max-w-md mx-auto border-blue-500">
          <CardHeader>
            <CardTitle className="text-blue-700">Order Summary</CardTitle>
            <CardDescription className="text-blue-500">
              Review your plan details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Plan:</span>
              <span className="font-semibold text-blue-700">{plan.name}</span>
            </div>
            {/* Only show billing toggle for paid plans */}
            {plan.price > 0 && (
              <div className="flex justify-between items-center">
                <span>Billing:</span>
                <div className="flex items-center space-x-2">
                  <span>Monthly</span>
                  <Switch
                    checked={billingCycle === "sixMonths"}
                    onCheckedChange={() =>
                      setBillingCycle(
                        billingCycle === "sixMonths" ? "monthly" : "sixMonths"
                      )
                    }
                  />
                  <span>6 Months (Save 10%)</span>
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-semibold text-blue-700">
                {plan.price === 0
                  ? "Free"
                  : `₹${(price / 100).toFixed(2)} / ${
                      billingCycle === "sixMonths" ? "6 months" : "month"
                    }`}
              </span>
            </div>
            {/* Only show trial option for paid plans with trial days */}
            {plan.price > 0 && plan.trialDays > 0 && (
              <div className="flex justify-between items-center">
                <span>Free Trial:</span>
                <div className="flex items-center space-x-2">
                  <Switch checked={isTrial} onCheckedChange={setIsTrial} />
                  <span>{plan.trialDays} days</span>
                </div>
              </div>
            )}

            {/* Only show customer details for paid plans */}
            {plan.price > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between gap-2">
                  <div className="w-1/2">
                    <Label className="block text-sm font-medium text-blue-700">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <Label className="block text-sm font-medium text-blue-700">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-blue-700">
                    Email
                  </Label>
                  <Input
                    type="email"
                    className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-blue-700">
                    Contact Number
                  </Label>
                  <Input
                    type="tel"
                    className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-blue-700">
                    Company
                  </Label>
                  <Input
                    type="text"
                    className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-blue-700">
                    Billing Address
                  </Label>
                  <Input
                    type="text"
                    className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-blue-700">
                    Password
                  </Label>
                  <div
                    className="flex items-center mt-1 w-full border border-blue-300 rounded-md shadow-sm 
        focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 sm:text-sm">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="shadow-none border-none flex-1 px-2 py-1 focus-visible:ring-0"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      className="p-2">
                      {showPassword ? <Eye /> : <EyeClosed />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center">
                  <Input
                    type="checkbox"
                    className="w-3 mr-2"
                    checked={termsAndConditions}
                    onChange={handleTnC}
                    id="terms"
                    required
                    name="terms"
                  />
                  <Label
                    className="block text-sm font-medium text-blue-700"
                    htmlFor="terms">
                    Create account and sign me up
                  </Label>
                </div>
              </div>
            )}

            {/* Error message display */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white"
              onClick={handlePayment}
              disabled={isLoading}>
              {isLoading
                ? "Processing..."
                : plan.price === 0
                ? "Sign Up for Free"
                : isTrial && plan.trialDays > 0
                ? `Start ${plan.trialDays}-Day Free Trial`
                : `Pay ₹${(price / 100).toFixed(2)}`}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Checkout />
    </Suspense>
  );
}
