"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { navigateAfterAuth } from "@/lib/auth/redirect";
import { toast } from "sonner";

function Spinner({ label }: { label: string }) {
  return (
    <div className="flex">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        <p className="text-muted-foreground mt-4">{label}</p>
      </div>
    </div>
  );
}

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect_url = searchParams.get("redirect_url");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session after OAuth callback
        const session = await authClient.getSession();

        if (session.data) {
          toast.success("Signed in successfully");
          navigateAfterAuth(redirect_url);
        } else {
          toast.error("Authentication failed");
          router.push(
            redirect_url
              ? `/auth?redirect_url=${encodeURIComponent(redirect_url)}`
              : "/auth",
          );
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
        toast.error("Authentication failed");
        router.push("/auth");
      }
    };

    handleCallback();
  }, [router, redirect_url]);

  return (
    <>
      <div className="h-full flex items-center justify-center w-full">
        <Spinner label="Completing sign in..." />
      </div>
    </>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<Spinner label="Completing sign in..." />}>
      <AuthCallbackContent />
    </Suspense>
  );
}
