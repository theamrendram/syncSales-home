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
import axios from "axios";

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signInLoaded || !signUpLoaded) return;

    setIsLoading(true);
    try {
      if (isSignUp) {
        // const result = await signUp.create({
        //   emailAddress: formData.email,
        //   password: formData.password,
        //   firstName: formData.firstName,
        //   lastName: formData.lastName,
        //   username: formData.email.split("@")[0].replace(/\s+/g, ""),
        // });

        const response = await axios.post("/api/user", {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
        const result = await response.data;
        console.log(result);
        
        console.log(result);
        toast.success("Account created successfully!");
      } else {
        const result = await signIn.create({
          identifier: formData.email,
          password: formData.password,
        });
        console.log(result);
        toast.success("Signed in successfully!");
      }
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err !== null && (err as any).errors
          ? (err as any).errors?.[0]?.message
          : "Authentication failed";

      console.log(err);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-700 p-2 text-white">
      {/* Back button */}
      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center gap-2 text-gray-300 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Logo */}
      <Link href="/" className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-amber-400">
            <span className="text-xl font-bold text-white">S</span>
          </div>
          <span className="text-3xl font-bold">SyncSales</span>
        </div>
      </Link>

      {/* Auth Card */}
      <Tabs
        defaultValue={isSignUp ? "sign-up" : "sign-in"}
        onValueChange={(v) => setIsSignUp(v === "sign-up")}
        className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 p-4"
      >
        {/* Toggle */}
        <TabsList className="mb-4 flex rounded-lg bg-white/10 p-0">
          <TabsTrigger
            value="sign-in"
            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-none"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="sign-up"
            className="m-0 flex-1 p-0 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-none"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        {/* Sign In */}
        <TabsContent value="sign-in">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label className="text-sm text-white">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateForm("email", e.target.value)
                }
                className="border-white/20 bg-white/10 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <Label className="text-sm text-white">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateForm("password", e.target.value)
                  }
                  className="border-white/20 bg-white/10 pr-10 text-white placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
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
              className="w-full bg-white font-medium text-black hover:bg-gray-100"
            >
              {isLoading ? "Please wait..." : "Sign In"}
            </Button>
          </form>
        </TabsContent>

        {/* Sign Up */}
        <TabsContent value="sign-up">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-sm text-white">First Name</Label>
                <Input
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateForm("firstName", e.target.value)
                  }
                  className="border-white/20 bg-white/10 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <Label className="text-sm text-white">Last Name</Label>
                <Input
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateForm("lastName", e.target.value)
                  }
                  className="border-white/20 bg-white/10 text-white placeholder:text-gray-400"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="text-sm text-white">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateForm("email", e.target.value)
                }
                className="border-white/20 bg-white/10 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <Label className="text-sm text-white">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateForm("password", e.target.value)
                  }
                  className="border-white/20 bg-white/10 pr-10 text-white placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
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
              className="w-full bg-white font-medium text-black hover:bg-gray-100"
            >
              {isLoading ? "Please wait..." : "Create Account"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
