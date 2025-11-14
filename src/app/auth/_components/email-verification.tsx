"use client";

import { SyncsalesActionButton } from "@/components/syncsales-action-button";
import { authClient } from "@/lib/auth/auth-client";
import { useEffect, useRef, useState } from "react";

export function EmailVerification({ email }: { email: string | null }) {
  const [timeToNextResend, setTimeToNextResend] = useState<number>(0);

  const intervalRef = useRef<number | null>(null);

  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };

  }, []);

  function startTick() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      if (!endTimeRef.current) return;

      const msLeft = endTimeRef.current - Date.now();
      const secondsLeft = Math.max(0, Math.ceil(msLeft / 1000));
      setTimeToNextResend(secondsLeft);

      if (secondsLeft <= 0) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 200);
  }

  function startEmailVerificationCountdown(seconds = 30) {
    endTimeRef.current = Date.now() + seconds * 1000;
    setTimeToNextResend(seconds);
    startTick();
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mt-2">
        We sent you a verification link. Please check your email and click the
        link to verify your account.
      </p>

      <SyncsalesActionButton
        variant="outline"
        className="w-full"
        successMessage="Verification email sent!"
        disabled={timeToNextResend > 0}
        action={() => {
          startEmailVerificationCountdown(30);
          return authClient.sendVerificationEmail({
            email: email!,
            callbackURL: "/",
          });
        }}>
        {timeToNextResend > 0
          ? `Resend Email (${timeToNextResend})`
          : "Resend Email"}
      </SyncsalesActionButton>
    </div>
  );
}
