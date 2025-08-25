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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowRight, Loader2, Check, Shield } from "lucide-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Get product details from URL params
  const productId = searchParams.get("productId");
  const productName = searchParams.get("productName");
  const customerEmail = searchParams.get("customerEmail");

  const [formData, setFormData] = useState({
    email: customerEmail || "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async () => {
    if (!formData.email || !formData.name) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Redirect to Polar checkout
      const checkoutUrl = `/api/checkout?products[]=${productId}&customer_email=${encodeURIComponent(
        formData.email
      )}&customer_name=${encodeURIComponent(formData.name)}`;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      setError("Failed to initiate checkout. Please try again.");
      setIsLoading(false);
    }
  };

  if (!productId || !productName) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-red-600">Invalid Product</CardTitle>
              <CardDescription>
                The product information is missing. Please return to the
                products page.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                onClick={() => router.push("/products")}
                className="w-full">
                Back to Products
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Complete Your Purchase
              </CardTitle>
              <CardDescription>
                You&apos;re about to purchase: <strong>{productName}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900">
                      Secure Checkout
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your payment will be processed securely through Polar. We
                      never store your payment information.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full"
                size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
                  <p className="text-gray-600">Loading checkout...</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      }>
      <CheckoutContent />
    </Suspense>
  );
}
