"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  isFreeTrial?: boolean;
}

export function ContactForm({ isFreeTrial = false }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: isFreeTrial ? "Start Free Trial" : "",
      message: isFreeTrial
        ? "I'm interested in starting a free trial of SyncSales. Please get in touch with me to get started."
        : "",
    },
  });

  // Update form values when isFreeTrial changes
  useEffect(() => {
    if (isFreeTrial) {
      form.setValue("subject", "Start Free Trial");
      form.setValue(
        "message",
        "I'm interested in starting a free trial of SyncSales. Please get in touch with me to get started.",
      );
    }
  }, [isFreeTrial, form]);

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          isFreeTrial,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-semibold text-white">
        {isFreeTrial ? "Request Your Free Trial" : "Send us a Message"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-white/20 bg-white/10 text-white placeholder:text-gray-500 focus:border-blue-400"
                    placeholder="Your name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border-white/20 bg-white/10 text-white placeholder:text-gray-500 focus:border-blue-400"
                    placeholder="your.email@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Subject</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-white/20 bg-white/10 text-white placeholder:text-gray-500 focus:border-blue-400"
                    placeholder={
                      isFreeTrial
                        ? "Subject (e.g., Start Free Trial)"
                        : "What's this about?"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={6}
                    className="resize-none border-white/20 bg-white/10 text-white placeholder:text-gray-500 focus:border-blue-400"
                    placeholder={
                      isFreeTrial
                        ? "Tell us about your business and how SyncSales can help you..."
                        : "Tell us more about your inquiry..."
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-amber-400 py-6 font-semibold text-white hover:from-blue-600 hover:to-amber-500"
          >
            <LoadingSwap isLoading={isSubmitting}>
              {isFreeTrial ? "Request Free Trial" : "Send Message"}
            </LoadingSwap>
          </Button>
        </form>
      </Form>
    </div>
  );
}
