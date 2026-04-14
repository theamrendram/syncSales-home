"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type signInForm = z.infer<typeof signInSchema>;

export default function SignInTab() {
  const searchParams = useSearchParams();
  const redirect_url = searchParams.get("redirect_url");
  const router = useRouter();
  const { signIn, isLoaded, setActive } = useSignIn();
  const form = useForm<signInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;
  async function handleSignIn(data: signInForm) {
    if (!isLoaded || !signIn) {
      toast.error("Authentication is still loading. Please try again.");
      return;
    }

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(redirect_url || "/");
        return;
      }

      // Keep the existing UX for unfinished auth states.
      if (result.status === "needs_first_factor" || result.status === "needs_second_factor") {
        toast.error("Authentication incomplete. Please complete verification.");
        return;
      }

      toast.error("Please verify your email before signing in.");
    } catch (error: unknown) {
      const clerkError = error as {
        errors?: Array<{ code?: string; longMessage?: string; message?: string }>;
      };
      const firstError = clerkError.errors?.[0];
      const errorCode = firstError?.code;

      if (errorCode === "form_identifier_not_found" || errorCode === "form_password_incorrect") {
        toast.error("Invalid email or password.");
        return;
      }

      if (errorCode === "form_identifier_exists_but_not_verified") {
        toast.error("Please verify your email before signing in.");
        return;
      }

      toast.error(firstError?.longMessage || firstError?.message || "Authentication failed.");
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSignIn)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting || !isLoaded}
          className="w-full cursor-pointer"
        >
          <LoadingSwap isLoading={isSubmitting}>Sign In</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
