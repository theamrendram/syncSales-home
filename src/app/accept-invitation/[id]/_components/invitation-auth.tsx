"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth/auth-client";
import SocialAuthButtons from "@/app/auth/_components/social-auth-buttons";

// The API's minimum (Better Auth's default of 8), not the /auth sign-up tab's.
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters");

const signUpSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  password: passwordSchema,
});

const signInSchema = z.object({
  password: z.string().min(1, "Enter your password"),
});

type Mode = "signup" | "signin";

/**
 * Sign-up or sign-in for someone who opened an invitation link signed out.
 *
 * The email is fixed to the invited address in both modes: the invitation can
 * only be accepted by its recipient, so any other account would be a dead end.
 * Creating an account goes through the API's /invitation/sign-up, which skips
 * email verification — the link already proved the inbox — and signs the user
 * in. Either way the caller re-reads the session and shows Accept / Decline.
 */
export function InvitationAuth({
  invitationId,
  email,
  hasAccount,
  onAuthenticated,
}: {
  invitationId: string;
  email: string;
  hasAccount: boolean;
  onAuthenticated: () => void;
}) {
  const [mode, setMode] = useState<Mode>(hasAccount ? "signin" : "signup");
  // Where Google sign-in and the forgot-password detour come back to.
  const returnUrl = `/accept-invitation/${encodeURIComponent(invitationId)}`;

  return (
    <div className="space-y-4">
      {mode === "signup" ? (
        <SignUpForm
          invitationId={invitationId}
          email={email}
          onAuthenticated={onAuthenticated}
          onAccountExists={() => setMode("signin")}
        />
      ) : (
        <SignInForm email={email} returnUrl={returnUrl} onAuthenticated={onAuthenticated} />
      )}

      <p className="text-center text-sm text-muted-foreground">
        {mode === "signup" ? "Already have an account? " : "New to SyncSales? "}
        <button
          type="button"
          className="cursor-pointer font-medium text-foreground underline"
          onClick={() => setMode(mode === "signup" ? "signin" : "signup")}>
          {mode === "signup" ? "Sign in" : "Create an account"}
        </button>
      </p>

      <Separator />
      <SocialAuthButtons redirectUrl={returnUrl} />
    </div>
  );
}

function LockedEmail({ email }: { email: string }) {
  return (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <Input type="email" value={email} readOnly disabled />
    </FormItem>
  );
}

function SignUpForm({
  invitationId,
  email,
  onAuthenticated,
  onAccountExists,
}: {
  invitationId: string;
  email: string;
  onAuthenticated: () => void;
  onAccountExists: () => void;
}) {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", password: "" },
  });
  const { isSubmitting } = form.formState;

  async function handleSignUp(data: z.infer<typeof signUpSchema>) {
    const { error } = await authClient.$fetch("/invitation/sign-up", {
      method: "POST",
      body: { invitationId, ...data },
    });
    if (error) {
      // The API's error body carries a code; $fetch's default type omits it.
      if ((error as { code?: string }).code === "USER_ALREADY_EXISTS") {
        toast.info("You already have an account. Sign in to continue.");
        onAccountExists();
        return;
      }
      toast.error(error.message || "Couldn't create your account");
      return;
    }
    toast.success("Account created");
    onAuthenticated();
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSignUp)}>
        <LockedEmail email={email} />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-h-11 w-full cursor-pointer sm:min-h-10">
          <LoadingSwap isLoading={isSubmitting}>Create account</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}

function SignInForm({
  email,
  returnUrl,
  onAuthenticated,
}: {
  email: string;
  returnUrl: string;
  onAuthenticated: () => void;
}) {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { password: "" },
  });
  const { isSubmitting } = form.formState;

  async function handleSignIn(data: z.infer<typeof signInSchema>) {
    const { error } = await authClient.signIn.email({ email, password: data.password });
    if (error) {
      toast.error(
        error.code === "EMAIL_NOT_VERIFIED"
          ? "Verify your email first. Check your inbox for the verification link."
          : error.message || "Couldn't sign in",
      );
      return;
    }
    onAuthenticated();
  }

  const forgotPasswordUrl = `/auth?redirect_url=${encodeURIComponent(returnUrl)}`;

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSignIn)}>
        <LockedEmail email={email} />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                <span>Password</span>
                <a
                  href={forgotPasswordUrl}
                  className="text-xs text-muted-foreground underline">
                  Forgot password?
                </a>
              </FormLabel>
              <FormControl>
                <PasswordInput autoComplete="current-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-h-11 w-full cursor-pointer sm:min-h-10">
          <LoadingSwap isLoading={isSubmitting}>Sign in</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
