"use client";

import { useState } from "react";
import { useAuth0 } from "@/hooks/useAuth0";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, Shield, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface SignInModalProps {
  children: React.ReactNode;
}

export function SignInModal({ children }: SignInModalProps) {
  const { login, isLoading } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await login();
      toast.success("Redirecting to Auth0...", {
        icon: <CheckCircle className="h-4 w-4" />,
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleModalClose = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden bg-white border-0 shadow-2xl">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" />
          {/* Floating orbs for visual appeal */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="px-8 pt-8 pb-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Welcome Back
                </DialogTitle>
                <DialogDescription className="text-gray-600 font-medium">
                  Sign in to continue to SyncSales
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 pb-8">
            {/* Auth0 Sign In Button */}
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-900 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="flex items-center gap-3">
                <span>Sign In with Auth0</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Button>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-100 mt-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span>New to SyncSales?</span>
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold underline underline-offset-2 transition-colors duration-200 hover:decoration-2"
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = "/checkout/free-trial";
                  }}>
                  Start your free trial
                </button>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <Shield className="h-3 w-3" />
                  Your data is protected with enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
