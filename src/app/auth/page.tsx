"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInTab from "./_components/sign-in-tab";
import { Separator } from "@/components/ui/separator";
import SocialAuthButtons from "./_components/social-auth-buttons";
import { useRouter, useSearchParams } from "next/navigation";
import SignUpTab from "./_components/sign-up-tab";
import { useAuth } from "@clerk/nextjs";
type TabsValue = "signin" | "signup";

function LoginPageContent() {
  const [selectedTab, setSelectedTab] = useState<TabsValue>("signin");
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const redirect_url = searchParams.get("redirect_url");

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push(redirect_url || "/");
    }
  }, [isLoaded, isSignedIn, router, redirect_url]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Tabs
        defaultValue={type || "signin"}
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as TabsValue)}
        className="mx-auto my-6 w-full max-w-md px-4"
      >
        {(selectedTab === "signin" || selectedTab === "signup") && (
          <TabsList>
            <TabsTrigger
              value="signin"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
        )}
        <TabsContent value="signin">
          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Welcome back!</CardTitle>
            </CardHeader>
            <CardContent>
              <SignInTab />
            </CardContent>
            <Separator />
            <CardFooter className="flex w-full justify-center">
              <SocialAuthButtons />
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <SignUpTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
