"use client";

import React, { useState, ChangeEvent, Suspense, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { toast } from "sonner";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Hexagon, ArrowRight } from "lucide-react";
import Link from "next/link";

function OnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") || "pro";

  const [formData, setFormData] = useState({
    organizationName: "",
    organizationLogo: null as File | null,
    description: "",
  });

  const [agreed, setAgreed] = useState(false);

  const [error, setError] = useState({
    organizationName: "",
    organizationLogo: "",
    description: "",
    agreed: "",
  });

  const email = useMemo(
    () => user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || "",
    [user],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error[name as keyof typeof error]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError((prev) => ({
          ...prev,
          organizationLogo: "File size must be less than 5MB",
        }));
        return;
      }
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setError((prev) => ({
          ...prev,
          organizationLogo: "Only JPEG, PNG, and WebP files are allowed",
        }));
        return;
      }
      setError((prev) => ({ ...prev, organizationLogo: "" }));
      setFormData((prev) => ({ ...prev, organizationLogo: file }));
    }
  };

  const handleOrganizationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = {
      organizationName: !formData.organizationName
        ? "Organization name is required"
        : "",
      description: !formData.description ? "Description is required" : "",
      organizationLogo: "",
      agreed: !agreed ? "You must agree to the terms." : "",
    };

    setError(errors);

    if (Object.values(errors).some((err) => err)) {
      if (errors.agreed) toast.error(errors.agreed);
      else toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const organizationFormData = new FormData();
      organizationFormData.append("organizationName", formData.organizationName);
      organizationFormData.append("description", formData.description);
      if (formData.organizationLogo) {
        organizationFormData.append("organizationLogo", formData.organizationLogo);
      }

      await axios.post("/api/org", organizationFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Organization created successfully!");

      // Logic Fix: Handle plan redirect if specified (Option B: Auto-redirect)
      if (planParam) {
        setIsRedirecting(true);
        toast.info("Proceeding to secure checkout...");
        
        try {
          const plans = {
            basic: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_BASIC,
            pro: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_PRO,
          };
          
          const productId = plans[planParam as keyof typeof plans] || plans.pro;
          
          const successUrl = new URL("/success", window.location.origin);
          successUrl.searchParams.set("source", "onboarding-checkout");
          successUrl.searchParams.set("plan", planParam);
          successUrl.searchParams.set("email", email.trim());
          if (user?.id) {
            successUrl.searchParams.set("clerkUserId", user.id);
          }

          const checkoutResponse = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId,
              email: email.trim(),
              name: [user?.firstName, user?.lastName].filter(Boolean).join(" "),
              trialPeriodDays: 7,
              returnUrl: successUrl.toString(),
              metadata: {
                source: "onboarding_redirect",
                plan: planParam,
                clerkUserId: user?.id || null,
                orgName: formData.organizationName
              },
            }),
          });

          const checkoutData = await checkoutResponse.json();
          if (!checkoutResponse.ok) throw new Error(checkoutData?.error || "Checkout failed");
          
          window.location.href = checkoutData.checkoutUrl;
          return; // Prevent dashboard redirect
        } catch (checkoutErr: any) {
          console.error("Auto-checkout failed:", checkoutErr);
          toast.error("Organization created, but checkout failed. Manual checkout required.");
        }
      }

      // Fallback transition to dashboard
      setTimeout(() => {
        window.location.href = "https://crm.syncsales.in/";
      }, 1500);
    } catch (error: any) {
      console.log("Organization creation error:", error);
      let errorMessage = "Organization creation failed!";
      if (error.response?.data?.error) {
        errorMessage =
          typeof error.response.data.error === "string"
            ? error.response.data.error
            : error.response.data.error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setIsRedirecting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-card">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-card text-foreground font-sans overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/40 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-to/10 blur-[150px] rounded-full" />
      </div>

      <div className="absolute bottom-10 left-10 flex gap-6 text-sm font-semibold text-muted-foreground">
        <Link href="#" className="inline-flex min-h-11 items-center px-2 transition-all hover:text-foreground">User settings</Link>
        <SignOutButton>
          <button className="inline-flex min-h-11 items-center px-2 transition-all hover:text-foreground">Log out</button>
        </SignOutButton>
      </div>

      <div className="container mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center px-6 py-20">
        {/* Logo Section */}
        <div className="mb-10 relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-brand-from/20 to-brand-to/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Hexagon className="h-12 w-12 text-black relative z-10 float-medium" strokeWidth={1.2} />
        </div>

        {/* Improved Progress Indicator */}
        <div className="mb-14 flex w-full max-w-xs gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-primary shadow-sm"></div>
          <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
             <div className={`h-full bg-primary transition-all duration-1000 ${isLoading ? "w-1/2" : "w-0"}`} />
          </div>
          <div className="h-1.5 flex-1 rounded-full bg-muted"></div>
        </div>

        <div className="w-full relative">
          {/* Header */}
          <div className="mb-12 text-center sm:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Create your organization
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground font-medium">
              Signed in as <span className="text-foreground font-semibold underline decoration-blue-200 underline-offset-4">{email}</span>.
              <br />
              Let&apos;s build your workspace in seconds.
            </p>
          </div>

          {/* Glassmorphism Form Container */}
          <div className="rounded-lg border border-border bg-card p-8 shadow-3xl">
            <form onSubmit={handleOrganizationSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="organizationName" className="text-sm font-bold text-foreground tracking-tight ml-1">
                  Organization Name
                </Label>
                <Input
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Acme Corp"
                  className="h-14 rounded-2xl border-border bg-background px-5 text-base focus-visible:ring-2 focus-visible:ring-blue-100 focus-visible:border-blue-400 transition-all placeholder:text-muted-foreground"
                  required
                />
                {error.organizationName && (
                  <p className="text-sm font-medium text-red-500 mt-1 ml-1">{error.organizationName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-bold text-foreground tracking-tight ml-1">
                  What does your company do?
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="e.g. Real estate sales, SaaS marketing"
                  className="h-14 rounded-2xl border-border bg-background px-5 text-base focus-visible:ring-2 focus-visible:ring-blue-100 focus-visible:border-blue-400 transition-all placeholder:text-muted-foreground"
                  required
                />
                {error.description && (
                  <p className="text-sm font-medium text-red-500 mt-1 ml-1">{error.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationLogo" className="text-sm font-bold text-foreground tracking-tight ml-1">
                  Brand Logo <span className="text-muted-foreground font-normal">(Optional)</span>
                </Label>
                <div className="rounded-2xl border-2 border-dashed border-border bg-card p-1 hover:border-blue-200 transition-colors">
                  <Input
                    id="organizationLogo"
                    type="file"
                    name="organizationLogo"
                    onChange={handleFileChange}
                    accept="image/jpeg,image/png,image/webp"
                    className="h-12 cursor-pointer border-0 file:mr-4 file:rounded-xl file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-blue-600 shadow-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
                {error.organizationLogo && (
                  <p className="text-sm font-medium text-red-500 mt-1 ml-1">{error.organizationLogo}</p>
                )}
              </div>

              <div className="flex items-center space-x-3 pt-3 px-1">
                <Checkbox 
                  id="terms" 
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="h-5 w-5 rounded-md border-input transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary" 
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-relaxed text-muted-foreground cursor-pointer"
                >
                  I agree to SyncSales&apos;s <Link href="#" className="text-foreground font-bold hover:underline">Terms</Link> & <Link href="#" className="text-foreground font-bold hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading || isRedirecting}
                  className="group relative h-14 w-full overflow-hidden rounded-full bg-primary hover:bg-primary/90 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading || isRedirecting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                        <span>{isRedirecting ? "Finalizing Trial..." : "Setting up..."}</span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </Button>
              </div>

              <div className="pt-4 text-center">
                <Link href="/" className="inline-flex min-h-11 items-center px-3 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground">
                  ← Back to home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      }
    >
      <OnboardingForm />
    </Suspense>
  );
}
