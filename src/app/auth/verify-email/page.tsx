"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

export default function Page() {
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
