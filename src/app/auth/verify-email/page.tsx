"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  console.log("token", token);

  useEffect(() => {
    async function verifyToken() {
      if (token) {
        await authClient.verifyEmail(
          {
            query: {
              token,
            },
          },
          {
            onError: (error) => {
              console.log("error", error);
              toast.error(error.error.message || "Email verification failed");
              router.push("/auth");
            },
            onSuccess: () => {
              toast.success("Email verified successfully");
              router.push("/");
            },
          },
        );
      }
    }
    verifyToken();
  }, [token, router]);

  return <div>Token: {token}</div>;
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Verifying email...</p>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
