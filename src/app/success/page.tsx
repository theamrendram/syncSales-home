"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dashboardUrl = process.env.NEXT_PUBLIC_CRM_URL || "https://crm.syncsales.in";

function Success() {
  const searchParams = useSearchParams();
  const email = (searchParams.get("email") || "").trim();
  const clerkUserId = (searchParams.get("clerkUserId") || "").trim();
  const plan = searchParams.get("plan") || "pro";
  const [status, setStatus] = useState<"pending" | "active" | "not_found" | "failed">("pending");
  const [message, setMessage] = useState("Finalizing your subscription...");

  const shouldPoll = useMemo(
    () => email.length > 0 || clerkUserId.length > 0,
    [clerkUserId, email],
  );

  useEffect(() => {
    if (!shouldPoll) {
      setStatus("failed");
      setMessage("Missing checkout context. You can continue to dashboard manually.");
      return;
    }

    let attempts = 0;
    const maxAttempts = 24;

    const poll = async () => {
      attempts += 1;
      try {
        const query = new URLSearchParams();
        if (email) {
          query.set("email", email);
        }
        if (clerkUserId) {
          query.set("clerkUserId", clerkUserId);
        }
        const response = await fetch(`/api/subscription-status?${query.toString()}`);
        const data = await response.json();

        if (response.ok && data?.isActive && data?.entitlementReady) {
          setStatus("active");
          setMessage("Subscription and access are active. Redirecting to dashboard...");
          setTimeout(() => {
            window.location.href = dashboardUrl;
          }, 1200);
          return true;
        }

        if (response.ok && data?.status === "not_found") {
          setStatus("not_found");
          setMessage("Waiting for payment confirmation...");
          return false;
        }

        setStatus("pending");
        setMessage("Payment received. Finishing account activation...");
        return false;
      } catch {
        setStatus("pending");
        setMessage("Still syncing payment. Please wait...");
        return false;
      }
    };

    const interval = setInterval(async () => {
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        setStatus("failed");
        setMessage("Activation is taking longer than expected. Open dashboard and refresh billing status.");
        return;
      }
      const done = await poll();
      if (done) {
        clearInterval(interval);
      }
    }, 3500);

    void poll();
    return () => clearInterval(interval);
  }, [clerkUserId, email, shouldPoll]);

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-100 to-gray-400">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Checkout complete</CardTitle>
          <CardDescription className="text-md text-gray-500">
            Trial plan: {plan}. We are activating your account now.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{message}</p>
          <p className="mt-2 text-xs text-gray-500">Status: {status}</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={dashboardUrl} target="_blank">
              <ExternalLink className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <Success />
    </Suspense>
  );
}