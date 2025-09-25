"use client";
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  type FormField = keyof typeof formData;
  const updateForm = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoogleAuth = async () => {
    const authMethod = isSignUp ? signUp : signIn;
    if (!authMethod) return;

    setIsLoading(true);
    try {
      await authMethod.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/user",
        redirectUrlComplete: "/user",
      });
    } catch (error) {
      toast.error("Google authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signInLoaded || !signUpLoaded) return;

    setIsLoading(true);
    try {
      if (isSignUp) {
        await signUp.create({
          emailAddress: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
        toast.success("Account created successfully!");
      } else {
        await signIn.create({
          identifier: formData.email,
          password: formData.password,
        });
        toast.success("Signed in successfully!");
      }
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err !== null && (err as any).errors
          ? (err as any).errors?.[0]?.message
          : "Authentication failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 text-white bg-gray-700">
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-300 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Logo */}
      <Link href="/" className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-amber-400 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-3xl font-bold">SyncSales</span>
        </div>
      </Link>

      {/* Auth Card */}
      <Tabs
        defaultValue={isSignUp ? "sign-up" : "sign-in"}
        onValueChange={(v) => setIsSignUp(v === "sign-up")}
        className="w-full max-w-sm bg-white/10 border border-white/20 rounded-2xl p-4">
        {/* Toggle */}
        <TabsList className="flex rounded-lg bg-white/10 mb-4 p-0">
          <TabsTrigger
            value="sign-in"
            className="flex-1 data-[state=active]:shadow-none data-[state=active]:bg-white data-[state=active]:text-black">
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="sign-up"
            className="flex-1 data-[state=active]:shadow-none data-[state=active]:bg-white data-[state=active]:text-black p-0 m-0">
            Sign Up
          </TabsTrigger>
        </TabsList>

        {/* Google Auth */}
        <Button
          onClick={handleGoogleAuth}
          disabled={isLoading}
          variant="outline"
          className="w-full mb-4 bg-white text-black hover:bg-gray-100">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
          Continue with Google
        </Button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 text-sm text-gray-400 bg-transparent">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Sign In */}
        <TabsContent value="sign-in">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label className="text-white text-sm">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateForm("email", e.target.value)
                }
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <Label className="text-white text-sm">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateForm("password", e.target.value)
                  }
                  className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              variant="outline"
              className="w-full bg-white text-black hover:bg-gray-100 font-medium">
              {isLoading ? "Please wait..." : "Sign In"}
            </Button>
          </form>
        </TabsContent>

        {/* Sign Up */}
        <TabsContent value="sign-up">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-white text-sm">First Name</Label>
                <Input
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateForm("firstName", e.target.value)
                  }
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <Label className="text-white text-sm">Last Name</Label>
                <Input
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateForm("lastName", e.target.value)
                  }
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="text-white text-sm">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateForm("email", e.target.value)
                }
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <Label className="text-white text-sm">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateForm("password", e.target.value)
                  }
                  className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              variant="outline"
              className="w-full bg-white text-black hover:bg-gray-100 font-medium">
              {isLoading ? "Please wait..." : "Create Account"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
