"use client";

import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Shield,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

interface SignInModalProps {
  children: React.ReactNode;
}

export function SignInModal({ children }: SignInModalProps) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signUp } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isOpen, setIsOpen] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setTouched({ email: true, password: true });

    if (!validateForm()) return;

    if (!isLoaded) {
      setErrors({
        global: "Sign-in service is not loaded. Please try again later.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Welcome back! You're now signed in.", {
          icon: <CheckCircle className="h-4 w-4" />,
        });
        setIsOpen(false);
        setFormData({ email: "", password: "" });
        setTouched({});
      } else {
        console.log("Sign-in not complete:", result);
      }
    } catch (err: any) {
      console.error("Sign-in failed", err);
      const errorMessage =
        err.errors?.[0]?.message || "Invalid email or password";
      setErrors({
        global: errorMessage,
      });
      toast.error(errorMessage, {
        icon: <AlertCircle className="h-4 w-4" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) {
      toast.error("Authentication service is not loaded. Please try again.");
      return;
    }

    setIsGoogleLoading(true);

    try {
      const result = await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      console.error("Google sign-in failed", err);
      toast.error("Google sign-in failed. Please try again.", {
        icon: <AlertCircle className="h-4 w-4" />,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched({
      ...touched,
      [field]: true,
    });
    validateForm();
  };

  const getFieldStatus = (field: string) => {
    if (!touched[field]) return "default";
    if (errors[field]) return "error";
    if (formData[field as keyof typeof formData]) return "success";
    return "default";
  };

  const handleModalClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset form when modal closes
      setFormData({ email: "", password: "" });
      setErrors({});
      setTouched({});
      setShowPassword(false);
    }
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
            {/* Google Sign In Button */}
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full h-12 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-xl transition-all duration-300 hover:shadow-md focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group mb-6">
              {isGoogleLoading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                  <span>Connecting to Google...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </div>
              )}
            </Button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 font-medium">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  Email Address
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    className={`pl-11 pr-4 h-12 border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                      getFieldStatus("email") === "error"
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 bg-red-50/50"
                        : getFieldStatus("email") === "success"
                        ? "border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-green-50/50"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300"
                    } group-hover:shadow-md focus:shadow-lg`}
                  />
                  <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  {getFieldStatus("email") === "success" && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                </div>
                {errors.email && touched.email && (
                  <div className="flex items-center gap-2 text-sm text-red-600 animate-in slide-in-from-left-2 duration-200">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-500" />
                  Password
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    className={`pl-11 pr-12 h-12 border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                      getFieldStatus("password") === "error"
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 bg-red-50/50"
                        : getFieldStatus("password") === "success"
                        ? "border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-green-50/50"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300"
                    } group-hover:shadow-md focus:shadow-lg`}
                  />
                  <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                  {getFieldStatus("password") === "success" && (
                    <CheckCircle className="absolute right-12 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                </div>
                {errors.password && touched.password && (
                  <div className="flex items-center gap-2 text-sm text-red-600 animate-in slide-in-from-left-2 duration-200">
                    <AlertCircle className="h-4 w-4" />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Global Error */}
              {errors.global && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-red-100 rounded-full">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <p className="text-sm text-red-700 font-medium">
                      {errors.global}
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !formData.email || !formData.password}
                className="w-full h-13 bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-900 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Signing you in...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span>Sign In to SyncSales</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>

              {/* Footer */}
              <div className="text-center pt-4 border-t border-gray-100">
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
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
