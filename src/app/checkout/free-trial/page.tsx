"use client";

import { useState, Suspense } from "react";
import { useSignUp } from "@clerk/nextjs";
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
import { Loader2, CheckCircle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
function Checkout() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const { toast } = useToast();
  const plan = { name: "Pro Plan", price: 0, trialDays: 7 };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    if (!validateForm()) return; // Stop submission if validation fails

    if (!isLoaded) {
      setErrors({
        global: "Sign-up service is not loaded. Please try again later.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const signUpAttempt = await signUp.create({
        emailAddress: formData.email.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        username: formData.email.split("@")[0].trim(),
        password: formData.password.trim(),
      });

      await signUpAttempt.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setEmailSent(true);
      toast({
        title: "OTP sent to email",
        description: "Please check your email for the OTP",
      });
    } catch (err: any) {
      console.error("OTP send failed", err);
      setErrors({ global: err.errors?.[0]?.message || "Failed to send OTP" });
      toast({
        title: "OTP send failed",
        description: err.errors?.[0]?.message || "Failed to send OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("OTP", otp);

    try {
      if (!signUp) {
        console.error("SignUp object is undefined");
        alert("An unexpected error occurred. Please try again later.");
        return;
      }
      const verification = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      toast({
        title: "OTP verified",
        description: "Please wait while we create your account",
      });
      if (verification.status === "complete") {
        await setActive({ session: verification.createdSessionId });

        // create user in backend
        const response = await axios.post("/api/user", {
          email: formData.email.trim(),
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          phone: formData.phone.trim(),
          username: formData.email.split("@")[0].trim(),
        });

        console.log("response", response);
        if (response.status === 200) {
          toast({
            title: "Account created",
            description: "Please wait while we redirect you to the dashboard",
          });
          window.location.href = "https://dashboard.syncsales.tech";
        } else {
          toast({
            title: "Something went wrong",
            description: "Please try again",
          });
        }
      }
    } catch (err: any) {
      console.error("OTP verification failed", err);
      alert("Incorrect or expired code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                  <CardTitle>Complete Your Registration</CardTitle>
                  <CardDescription className="text-blue-100">
                    Access your free trial in minutes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3 border border-blue-100">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-700">{plan.name}</p>
                      <p className="text-sm text-blue-600">
                        {plan.trialDays} days free, then $
                        {plan.price === 0 ? "49" : `${plan.price}/month`}
                      </p>
                    </div>
                  </div>

                  {!emailSent ? (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            onChange={handleChange}
                            value={formData.firstName}
                            required
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-sm">
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            onChange={handleChange}
                            value={formData.lastName}
                            required
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-sm">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          onChange={handleChange}
                          value={formData.email}
                          required
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="1234567890"
                          onChange={handleChange}
                          value={formData.phone}
                          required
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          placeholder="********"
                          onChange={handleChange}
                          value={formData.password}
                          type="password"
                          required
                        />
                        {errors.password && (
                          <p className="text-red-500 text-sm">
                            {errors.password}
                          </p>
                        )}
                      </div>

                      {errors.global && (
                        <p className="text-red-500 text-sm">{errors.global}</p>
                      )}

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white">
                        {isLoading ? (
                          <span className="flex items-center">
                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                            Sending OTP...
                          </span>
                        ) : (
                          "Send OTP to Email"
                        )}
                      </Button>
                    </form>
                  ) : (
                    <form
                      onSubmit={handleOtpVerification}
                      className="space-y-4">
                      <div>
                        <Label htmlFor="otp">
                          Enter OTP sent to your email
                        </Label>
                        <Input
                          id="otp"
                          name="otp"
                          placeholder="123456"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white">
                        {isLoading ? (
                          <span className="flex items-center">
                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                            Verifying...
                          </span>
                        ) : (
                          "Verify & Start Trial"
                        )}
                      </Button>
                    </form>
                  )}
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
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      }>
      <Checkout />
    </Suspense>
  );
}
