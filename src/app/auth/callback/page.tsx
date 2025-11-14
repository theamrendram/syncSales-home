"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session after OAuth callback
        const session = await authClient.getSession();

        if (session.data) {
          toast.success("Signed in successfully");
          router.push("/");
        } else {
          toast.error("Authentication failed");
          router.push("/");
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
        toast.error("Authentication failed");
        router.push("/");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        <p className="text-muted-foreground mt-4">Completing sign in...</p>
      </div>
    </div>
  );
}
