"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useAuth();
  const redirectUrl = searchParams.get("redirect_url") || "/";

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      toast.success("Signed in successfully");
      router.push(redirectUrl);
      return;
    }

    toast.error("Authentication failed");
    router.push("/auth");
  }, [isLoaded, isSignedIn, router, redirectUrl]);

  return (
    <div className="flex">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        <p className="text-muted-foreground mt-4">Completing sign in...</p>
      </div>
    </div>
  );
}
