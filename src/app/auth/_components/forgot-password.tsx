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
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type forgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword({
  openSignIn,
  openForgotPassword,
}: {
  openSignIn: () => void;
  openForgotPassword: () => void;
}) {
  const form = useForm<forgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;
  async function handleForgotPassword(data: forgotPasswordForm) {
    await authClient.requestPasswordReset(
      {
        ...data,
        redirectTo: "/auth/reset-password?email=" + data.email,
      },
      {
        onError: (response) => {
          toast.error(response.error.message || "Failed to send password reset email");
        },
        onSuccess: () => {
          toast.success("Password reset email sent");
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleForgotPassword)}>
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
        <div className="flex gap-2">
          <Button type="button" variant={"outline"} onClick={openSignIn}>
            <LoadingSwap isLoading={isSubmitting}>Back</LoadingSwap>
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 cursor-pointer">
            <LoadingSwap isLoading={isSubmitting}>Forgot Password</LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  );
}
