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
import { authClient } from "@/lib/auth/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { EmailVerification } from "./_components/email-verification";
import ForgotPassword from "./_components/forgot-password";
import SignUpTab from "./_components/sign-up-tab";
type TabsValue = "signin" | "signup" | "email-verification" | "forgot-password";

function LoginPageContent() {
  const [email, setEmail] = useState<string | null>("");
  const [selectedTab, setSelectedTab] = useState<TabsValue>("signin");
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const redirect_url = searchParams.get("redirect_url");
  useEffect(() => {
    authClient
      .getSession()
      .then((session: Awaited<ReturnType<typeof authClient.getSession>>) => {
        if (session.data != null) router.push(redirect_url || "/");
      });
  }, [router, redirect_url]);

  function openEmailVerificationTab(email: string) {
    setEmail(email);
    setSelectedTab("email-verification");
  }

  function openForgotPassword() {
    setSelectedTab("forgot-password");
  }

  function openSignInTab() {
    setSelectedTab("signin");
  }

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
              <SignInTab
                openEmailVerificationTab={openEmailVerificationTab}
                openForgotPassword={openForgotPassword}
              />
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
              <SignUpTab openEmailVerificationTab={openEmailVerificationTab} />
            </CardContent>
          </Card>
        </TabsContent>
        {/* <TabsContent value="organization">
          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Create Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <OrganizationTab />
            </CardContent>
          </Card>
        </TabsContent> */}
        <TabsContent value="email-verification">
          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Verify Your Email</CardTitle>
            </CardHeader>
            <CardContent>
              <EmailVerification email={email} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forgot-password">
          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Forgot Password</CardTitle>
            </CardHeader>
            <CardContent>
              <ForgotPassword
                openSignIn={openSignInTab}
                openForgotPassword={openForgotPassword}
              />
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
