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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
const organizationSchema = z.object({
  name: z.string().min(3, "Name is required").trim(),
  domain: z.string().optional(),
  logo: z.string().optional(),
  description: z.string().optional(),
});

const OrganizationTab = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      domain: "",
      logo: "",
      description: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof organizationSchema>) {
    console.log("data", data);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/org/create`,
      data,
      {
        withCredentials: true,
      },
    );
    console.log("response", response);
    toast.success("Organization created successfully");
    // router.push("/success?type=organization");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="text-2xl font-bold">
          <CardTitle>Create Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of your organization</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Eg. Syncsales Inc." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="my-2 w-full"
              >
                {form.formState.isSubmitting ? (
                  <LoadingSwap isLoading={form.formState.isSubmitting}>
                    Creating organization...
                  </LoadingSwap>
                ) : (
                  "Create Organization"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationTab;
