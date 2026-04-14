"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignUpTab() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Create your account and organization in the dedicated onboarding flow.
      </p>
      <Button
        type="button"
        onClick={() => router.push("/create-account")}
        className="w-full cursor-pointer"
      >
        Continue to Sign Up
      </Button>
    </div>
  );
}
