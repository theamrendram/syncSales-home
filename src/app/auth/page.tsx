"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  User,
  Shield,
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { GridBackgroundDemo } from "@/components/GridBackground";
import Link from "next/link";
import { motion } from "framer-motion";

function AuthPageContent() {
  const [activeTab, setActiveTab] = useState("sign-in");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");

  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up Form State
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");

  const handleGoogleSignIn = async () => {
    if (!signInLoaded) return;

    setIsGoogleLoading(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: redirectUrl || "/user",
        redirectUrlComplete: redirectUrl || "/user",
      });
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast.error(
        error.errors?.[0]?.message || "Google sign in failed. Please try again."
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!signUpLoaded) return;

    setIsGoogleLoading(true);
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: redirectUrl || "/user",
        redirectUrlComplete: redirectUrl || "/user",
      });
    } catch (error: any) {
      console.error("Google sign up error:", error);
      toast.error(
        error.errors?.[0]?.message || "Google sign up failed. Please try again."
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInLoaded) return;

    setIsLoading(true);
    try {
      const result = await signIn.create({
        identifier: signInEmail,
        password: signInPassword,
        redirectUrl: redirectUrl || "/user",
      });

      if (result.status === "complete") {
        toast.success("Signed in successfully!");
      } else {
        toast.error("Sign in failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(
        error.errors?.[0]?.message || "Sign in failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpLoaded) return;

    if (signUpPassword !== signUpConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signUp.create({
        emailAddress: signUpEmail,
        password: signUpPassword,
        firstName: signUpFirstName,
        lastName: signUpLastName,
        redirectUrl: redirectUrl || "/user",
      });

      if (result.status === "complete") {
        toast.success("Account created successfully!");
      } else {
        toast.error("Sign up failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(
        error.errors?.[0]?.message || "Sign up failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GridBackgroundDemo>
      <div className="relative text-white min-h-screen w-full">
        <div className="absolute inset-0 -z-10 gradient-secondary" />

        {/* Back to home button */}
        <div className="absolute top-8 left-8 z-10">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </motion.div>
          </Link>
        </div>

        <div className="container flex flex-col items-center justify-center py-20 px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <Link href="/" className="inline-block mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  SyncSales
                </span>
              </div>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-xl text-gray-300 max-w-md mx-auto">
              Sign in to continue to your sales dashboard
            </p>
          </motion.div>

          {/* Auth Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-lg">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Liquid glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400/60 rounded-full animate-pulse" />
              <div
                className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              />

              <div className="relative z-10">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-[400px]">
                  <TabsList className="grid grid-cols-2 w-full rounded-full">
                    <TabsTrigger
                      value="sign-in"
                      className="flex items-center justify-center h-10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-amber-400 data-[state=active]:text-white text-gray-300 rounded-full transition-all duration-300 font-medium">
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="sign-up"
                      className="flex items-center justify-center h-10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-amber-400 data-[state=active]:text-white text-gray-300 rounded-full transition-all duration-300 font-medium">
                      Create Account
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="sign-in" className="mt-8">
                    {/* Google Sign In Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading || !signInLoaded}
                        className="w-full mb-6 backdrop-blur-xl bg-white/20 border border-white/30 text-white hover:bg-white/30 font-medium rounded-2xl transition-all duration-300 h-12 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                        {isGoogleLoading
                          ? "Signing in with Google..."
                          : "Continue with Google"}
                      </Button>
                    </motion.div>

                    {/* Divider */}
                    <div className="relative my-8">
                      <div className="absolute inset-8 flex items-center">
                        <span className="w-full border-t border-white/20" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-transparent px-4 text-gray-400 font-medium">
                          Or continue with email
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-6">
                      <div className="space-y-3">
                        <Label
                          htmlFor="signin-email"
                          className="text-white font-medium text-sm">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="signin-email"
                            type="email"
                            placeholder="Enter your email"
                            value={signInEmail}
                            onChange={(e) => setSignInEmail(e.target.value)}
                            className="pl-12 pr-4 h-12 backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/30 focus:border-white/50 rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="signin-password"
                          className="text-white font-medium text-sm">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="signin-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            className="pl-12 pr-12 h-12 backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/30 focus:border-white/50 rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200">
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="pt-4">
                        <Button
                          type="submit"
                          disabled={isLoading || !signInLoaded}
                          className="w-full h-12 bg-gradient-to-r from-blue-500 to-amber-400 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-base">
                          {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                      </motion.div>
                    </form>
                  </TabsContent>

                  <TabsContent value="sign-up" className="mt-8">
                    {/* Google Sign Up Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      <Button
                        type="button"
                        onClick={handleGoogleSignUp}
                        disabled={isGoogleLoading || !signUpLoaded}
                        className="w-full mb-6 backdrop-blur-xl bg-white/20 border border-white/30 text-white hover:bg-white/30 font-medium rounded-2xl transition-all duration-300 h-12 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                        {isGoogleLoading
                          ? "Signing up with Google..."
                          : "Continue with Google"}
                      </Button>
                    </motion.div>

                    {/* Divider */}
                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/20" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-transparent px-4 text-gray-400 font-medium">
                          Or continue with email
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label
                            htmlFor="signup-firstname"
                            className="text-white font-medium text-sm">
                            First Name
                          </Label>
                          <Input
                            id="signup-firstname"
                            type="text"
                            placeholder="First name"
                            value={signUpFirstName}
                            onChange={(e) => setSignUpFirstName(e.target.value)}
                            className="h-12 backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/30 focus:border-white/50 rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label
                            htmlFor="signup-lastname"
                            className="text-white font-medium text-sm">
                            Last Name
                          </Label>
                          <Input
                            id="signup-lastname"
                            type="text"
                            placeholder="Last name"
                            value={signUpLastName}
                            onChange={(e) => setSignUpLastName(e.target.value)}
                            className="h-12 backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/30 focus:border-white/50 rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="signup-email"
                          className="text-white font-medium text-sm">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            className="pl-12 pr-4 h-12 backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/30 focus:border-white/50 rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="signup-password"
                          className="text-white font-medium text-sm">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            className="pl-12 pr-12 h-12 backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/30 focus:border-white/50 rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200">
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="signup-confirm-password"
                          className="text-white font-medium text-sm">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="signup-confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={signUpConfirmPassword}
                            onChange={(e) =>
                              setSignUpConfirmPassword(e.target.value)
                            }
                            className="pl-12 pr-12 h-12 backdrop-blur-xl bg-white/20 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/30 focus:border-white/50 rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200">
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="pt-4">
                        <Button
                          type="submit"
                          disabled={isLoading || !signUpLoaded}
                          className="w-full h-12 bg-gradient-to-r from-blue-500 to-amber-400 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-base">
                          {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                      </motion.div>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-white/20 mt-8">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-3">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span>New to SyncSales?</span>
                    <Link
                      href="/checkout/free-trial"
                      className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors duration-200 hover:decoration-2">
                      Start your free trial
                    </Link>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
                      <Shield className="h-3 w-3 text-green-400" />
                      Your data is protected with enterprise-grade security
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </GridBackgroundDemo>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/70"></div>
        </div>
      }>
      <AuthPageContent />
    </Suspense>
  );
}
