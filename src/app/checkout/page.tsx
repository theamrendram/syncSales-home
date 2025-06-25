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
import { toast } from "sonner";
import {
  Eye,
  EyeClosed,
  ArrowRight,
  Check,
  Shield,
  CreditCard,
  Loader2
} from "lucide-react";
import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans = {
  basic: {
    name: "Basic",
    price: 180000,
    trialDays: 0,
    features: [
      "5 Team Members",
      "Basic Analytics",
      "24/7 Support",
      "10 Projects",
    ],
  },
  pro: {
    name: "Pro",
    price: 430000,
    trialDays: 0,
    features: [
      "Unlimited Team Members",
      "Advanced Analytics",
      "Priority Support",
      "Unlimited Projects",
      "API Access",
      "Custom Integrations",
    ],
  },
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
  const [currentStep, setCurrentStep] = useState(1);

  const plan = plans[selectedPlan as keyof typeof plans];
  // Calculate price safely (handle free plan case)
  const price =
    plan.price === 0
      ? 0
      : billingCycle === "sixMonths"
      ? plan.price * 6 * 0.9 // 10% discount for 6 months
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
      if (!termsAndConditions) {
        setError("Please agree to the terms and conditions");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleContinue = () => {
    if (validateForm()) {
      setCurrentStep(2);
    }
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
        subscription_id: data.subscriptionId,
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
              toast.success("Subscription activated!");
              router.push(
                `/success?subscription_id=${response.razorpay_subscription_id}&plan=${plan.name}`
              );
              return;
            }
          } catch (error) {
            console.error("Subscription verification error:", error);
          }

            toast.error("Payment failed");

          setIsLoading(false);
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">
            Complete Your Subscription
          </h1>
          <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
            You&apos;re just a few steps away from accessing all of our premium
            features
          </p>

          {/* Progress steps */}
          <div className="flex items-center justify-center mb-10">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}>
                1
              </div>
              <div
                className={`h-1 w-16 ${
                  currentStep >= 2 ? "bg-blue-600" : "bg-slate-200"
                }`}></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}>
                2
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan details sidebar */}
            <div className="md:col-span-1">
              <Card className="sticky top-20 bg-gradient-to-br from-slate-50 to-blue-50 border-blue-100 shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-800">Plan Summary</CardTitle>
                  <CardDescription className="text-blue-600">
                    You selected the {plan.name} plan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-700">Plan:</span>
                      <span className="font-semibold text-blue-800">
                        {plan.name}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-700">Billing:</span>
                      <span className="font-semibold text-blue-800">
                        {billingCycle === "sixMonths"
                          ? "Every 6 months"
                          : "Monthly"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700">Price:</span>
                      <span className="font-semibold text-blue-800">
                        ₹{(price / 100).toFixed(2)} /{" "}
                        {billingCycle === "sixMonths" ? "6 months" : "month"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-blue-800">
                      Features included:
                    </h3>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-slate-700">
                          <Check
                            size={16}
                            className="text-green-500 flex-shrink-0"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 text-sm bg-blue-50 p-3 rounded-lg">
                    <Shield size={16} className="text-blue-600" />
                    <span>Secure payment processing</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main checkout form */}
            <div className="md:col-span-2">
              <Card className="shadow-lg border-slate-200">
                {currentStep === 1 ? (
                  <>
                    <CardHeader className="border-b border-slate-100">
                      <CardTitle className="text-slate-800">
                        Account Information
                      </CardTitle>
                      <CardDescription className="text-slate-500">
                        Please provide your account details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 pt-6">
                      {/* Billing toggle for paid plans */}
                      {plan.price > 0 && (
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
                          <div className="text-slate-700 font-medium mb-2">
                            Select Billing Cycle
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <div
                              className={`p-3 rounded-lg flex-1 text-center cursor-pointer ${
                                billingCycle === "monthly"
                                  ? "bg-white border-2 border-blue-400 shadow-sm text-blue-600 font-medium"
                                  : "bg-slate-100 border border-slate-200 text-slate-600"
                              }`}
                              onClick={() => setBillingCycle("monthly")}>
                              Monthly
                              <div className="text-sm text-slate-500 mt-1">
                                ₹{(plan.price / 100).toFixed(2)}/mo
                              </div>
                            </div>
                            <div
                              className={`p-3 rounded-lg flex-1 text-center cursor-pointer ${
                                billingCycle === "sixMonths"
                                  ? "bg-white border-2 border-blue-400 shadow-sm text-blue-600 font-medium"
                                  : "bg-slate-100 border border-slate-200 text-slate-600"
                              }`}
                              onClick={() => setBillingCycle("sixMonths")}>
                              6 Months
                              <div className="text-sm text-slate-500 mt-1">
                                ₹{((plan.price * 6 * 0.9) / 100).toFixed(2)}/6mo
                                <span className="ml-1 text-green-500">
                                  Save 10%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Trial option for paid plans with trial days */}
                      {plan.price > 0 && plan.trialDays > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-blue-800">
                                Free Trial
                              </h3>
                              <p className="text-sm text-blue-600">
                                Start with {plan.trialDays} days free trial
                              </p>
                            </div>
                            <Switch
                              checked={isTrial}
                              onCheckedChange={setIsTrial}
                            />
                          </div>
                        </div>
                      )}

                      {/* Form fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                          <Label className="text-slate-700 mb-1 block">
                            First Name
                          </Label>
                          <Input
                            type="text"
                            className="w-full border-slate-300 focus:border-blue-400 focus:ring-blue-400"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                firstName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="col-span-1">
                          <Label className="text-slate-700 mb-1 block">
                            Last Name
                          </Label>
                          <Input
                            type="text"
                            className="w-full border-slate-300 focus:border-blue-400 focus:ring-blue-400"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                lastName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-slate-700 mb-1 block">
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          className="w-full border-slate-300 focus:border-blue-400 focus:ring-blue-400"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-slate-700 mb-1 block">
                          Phone Number
                        </Label>
                        <Input
                          type="tel"
                          className="w-full border-slate-300 focus:border-blue-400 focus:ring-blue-400"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-slate-700 mb-1 block">
                          Company Name
                        </Label>
                        <Input
                          type="text"
                          className="w-full border-slate-300 focus:border-blue-400 focus:ring-blue-400"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                        />
                        <p className="text-xs text-slate-500 mt-1">Optional</p>
                      </div>

                      <div>
                        <Label className="text-slate-700 mb-1 block">
                          Billing Address
                        </Label>
                        <Input
                          type="text"
                          className="w-full border-slate-300 focus:border-blue-400 focus:ring-blue-400"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-slate-700 mb-1 block">
                          Create Password
                        </Label>
                        <div className="flex w-full border border-slate-300 rounded-md overflow-hidden focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="border-none shadow-none flex-1 focus-visible:ring-0"
                            value={formData.password}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                            required
                          />
                          <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            variant="ghost"
                            className="px-3">
                            {showPassword ? (
                              <EyeClosed size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 py-2">
                        <div className="flex h-5 items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            id="terms"
                            checked={termsAndConditions}
                            onChange={handleTnC}
                            required
                          />
                        </div>
                        <div className="ml-2 text-sm">
                          <Label className="text-slate-700" htmlFor="terms">
                            I agree to the{" "}
                            <a
                              href="#"
                              className="text-blue-600 hover:underline">
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="text-blue-600 hover:underline">
                              Privacy Policy
                            </a>
                          </Label>
                        </div>
                      </div>

                      {/* Error message display */}
                      {error && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                          {error}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t border-slate-100 flex justify-end pt-6">
                      <Button
                        onClick={handleContinue}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                        Continue to Payment
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </CardFooter>
                  </>
                ) : (
                  <>
                    <CardHeader className="border-b border-slate-100">
                      <CardTitle className="text-slate-800">
                        Payment Details
                      </CardTitle>
                      <CardDescription className="text-slate-500">
                        Complete your subscription
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 pt-6">
                      <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 p-2 rounded-full">
                            <CreditCard size={20} className="text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-green-800">
                              Ready to finalize
                            </h3>
                            <p className="text-sm text-green-700 mt-1">
                              Your account details have been saved. Click below
                              to complete payment with Razorpay.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <h3 className="font-medium text-blue-800 mb-2">
                          Order Summary
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Plan:</span>
                            <span className="font-medium text-slate-800">
                              {plan.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">
                              Billing Cycle:
                            </span>
                            <span className="font-medium text-slate-800">
                              {billingCycle === "sixMonths"
                                ? "Every 6 months"
                                : "Monthly"}
                            </span>
                          </div>
                          {isTrial && plan.trialDays > 0 && (
                            <div className="flex justify-between">
                              <span className="text-slate-600">
                                Free Trial:
                              </span>
                              <span className="font-medium text-slate-800">
                                {plan.trialDays} days
                              </span>
                            </div>
                          )}
                          <div className="border-t border-blue-200 my-2 pt-2"></div>
                          <div className="flex justify-between">
                            <span className="text-slate-700 font-medium">
                              Total:
                            </span>
                            <span className="font-bold text-blue-800">
                              ₹{(price / 100).toFixed(2)} /{" "}
                              {billingCycle === "sixMonths"
                                ? "6 months"
                                : "month"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Error message display */}
                      {error && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                          {error}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t border-slate-100 flex flex-col sm:flex-row sm:justify-between gap-4 pt-6">
                      <Button
                        onClick={() => setCurrentStep(1)}
                        variant="outline"
                        className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50">
                        Back to Details
                      </Button>
                      <Button
                        onClick={handlePayment}
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                        {isLoading ? (
                          <span className="flex items-center">
                            <Loader2 size={16} className="animate-spin mr-2" />
                            Processing...
                          </span>
                        ) : (
                          <>
                            {plan.price === 0
                              ? "Sign Up for Free"
                              : isTrial && plan.trialDays > 0
                              ? `Start ${plan.trialDays}-Day Free Trial`
                              : `Complete Payment`}
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </>
                )}
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
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
            <p className="mt-4 text-slate-600">Loading checkout...</p>
          </div>
        </div>
      }>
      <Checkout />
    </Suspense>
  );
}
