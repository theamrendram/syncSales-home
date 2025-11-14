"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInTab from "./sign-in-tab";
import { Separator } from "@/components/ui/separator";
import SocialAuthButtons from "./social-auth-buttons";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { EmailVerification } from "./email-verification";
import ForgotPassword from "./forgot-password";
type TabsValue = "signin" | "email-verification" | "forgot-password";

const LoginPage = () => {
  const [email, setEmail] = useState<string | null>("");
  const [selectedTab, setSelectedTab] = useState<TabsValue>("signin");
  const router = useRouter();
  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data != null) router.push("/");
    });
  }, [router]);

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
    <div className="bg-background flex min-h-screen items-center justify-center">
      <Tabs
        defaultValue="signin"
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as TabsValue)}
        className="mx-auto my-6 w-full max-w-md px-4"
      >
        {selectedTab === "signin" && (
          <TabsList>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
          </TabsList>
        )}
        <TabsContent value="signin">
          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Sign in</CardTitle>
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
};

export default LoginPage;
