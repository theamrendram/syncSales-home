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
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { use } from "react";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type signInForm = z.infer<typeof signInSchema>;

export default function SignInTab({
  openEmailVerificationTab,
  openForgotPassword,
}: {
  openEmailVerificationTab: (email: string) => void;
  openForgotPassword: () => void;
}) {
  const searchParams = useSearchParams();
  const redirect_url = searchParams.get("redirect_url");
  const router = useRouter();
  const form = useForm<signInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;
  async function handleSignIn(data: signInForm) {
    const response = await authClient.signIn.email(
      {
        ...data,
      },
      {
        onError: (response) => {
          console.log(response);
          if (response.error.code === "EMAIL_NOT_VERIFIED") {
            openEmailVerificationTab(data.email);
          } else {
            toast.error(
              response.error.message ||
                response.error.statusText ||
                "Something went wrong",
            );
          }
        },
        onSuccess: async (response) => {
          console.log("Sign-in response:", response?.data);

          // Get the session with customized user data
          const session = await authClient.getSession();
          console.log("Session with customized user:", session?.data);

          if (session?.data) {
            console.log("redirecting to", redirect_url || "/");
            router.push(redirect_url || "/");
          } else {
            console.log("redirecting to", "/auth");
            router.push("/auth");
          }
        },
      },
    );

    console.log(response?.data);
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
              <FormLabel className="flex justify-between">
                <p>Password</p>
                <p
                  className="text-muted-foreground cursor-pointer text-xs underline"
                  onClick={openForgotPassword}
                >
                  Forgot password?
                </p>
              </FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer"
        >
          <LoadingSwap isLoading={isSubmitting}>Sign In</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
