"use client";

import { useState, useEffect, Suspense } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2 } from "lucide-react";
declare global {
  interface Window {
    Razorpay: any;
  }
}

function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const plan = { name: "Free Trial", price: 0, trialDays: 0 };

  const handleSubmit = () => {
    setIsLoading(true);
    try {
      const response = axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/free-trial`,
        {
          data: formData,
        }
      );
      console.log(response);
    } catch (error: any) {
      console.log("error", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-center mb-8">
          Get Your 14 Days of Free Trial
        </h1>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your plan details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Plan:</span>
              <span className="font-semibold">{plan.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Billing:</span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-semibold">₹{plan.price} / month</span>
            </div>
          </CardContent>
          <CardFooter>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex space-x-2 w-full">
                <div className="w-full">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                </div>
              </div>
              <div className="">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+91 1234567890"
                  minLength={10}
                  maxLength={10}
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>
              <div className="">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="GwV4I@example.com"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin ml-2" /> : "Join"}
              </Button>
            </form>
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
