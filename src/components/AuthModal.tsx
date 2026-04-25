"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSignIn } from "@clerk/nextjs";
import { Hexagon } from "lucide-react";
import { toast } from "sonner";

// A custom Google SVG icon for the button
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

interface AuthModalProps {
  planKey?: string;
  triggerButton: React.ReactNode;
}

export function AuthModal({ planKey = "pro", triggerButton }: AuthModalProps) {
  const { signIn, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: `/onboarding?plan=${planKey}`,
      });
    } catch (err) {
      console.error("OAuth error:", err);
      toast.error("Failed to authenticate with Google. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-white/20 bg-white/5 shadow-4xl backdrop-blur-3xl animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/10 blur-3xl rounded-full" />

          <div className="mb-8 relative">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl animate-gradient bg-size-200 bg-gradient-to-br from-blue-500/10 via-transparent to-amber-500/10">
              <Hexagon className="h-10 w-10 text-black float-medium" strokeWidth={1.5} />
            </div>
            {/* Logo ring glow */}
            <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-2xl -z-10" />
          </div>

          <DialogHeader className="mb-8 space-y-3">
            <DialogTitle className="text-3xl font-extrabold tracking-tight text-gray-900 text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600">
              Welcome to SyncSales
            </DialogTitle>
            <DialogDescription className="text-base text-gray-500 text-center max-w-[280px] mx-auto leading-relaxed">
              Experience the future of CRM. Sign in to start your {planKey.toUpperCase()} trial.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full space-y-5 px-2">
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading || !isLoaded}
              className="group relative w-full h-14 overflow-hidden rounded-2xl bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
              variant="outline"
            >
              {/* Premium shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-gray-900"></div>
              ) : (
                <div className="flex items-center justify-center w-full relative font-semibold text-[16px]">
                  <span className="mr-3 transition-transform group-hover:scale-110 duration-300">
                    <GoogleIcon />
                  </span>
                  <span>Continue with Google</span>
                </div>
              )}
            </Button>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              <p className="text-[11px] text-gray-400 text-center max-w-[260px] mx-auto leading-loose uppercase tracking-[0.1em] font-medium">
                Protected by enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
