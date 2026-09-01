"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "./_components/contact-form";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const isFreeTrial = searchParams.get("source") === "free-trial";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-16 pt-32">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="mb-16 text-center">
            <h1 className="gradient-text mb-4 text-4xl font-bold md:text-5xl">
              {isFreeTrial ? "Start Your Free Trial" : "Get in Touch"}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {isFreeTrial
                ? "Fill out the form below to start your 7-day free trial. No credit card required, cancel anytime."
                : "Have a question or want to learn more about SyncSales? We'd love to hear from you."}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-semibold text-foreground">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-md border border-border bg-muted p-3">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-foreground">Email</h3>
                      <p className="text-muted-foreground">contact.syncsales@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-md border border-border bg-muted p-3">
                      <MessageSquare className="h-5 w-5 text-brand-ink" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-foreground">
                        Response Time
                      </h3>
                      <p className="text-muted-foreground">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-md border border-border bg-muted p-3">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-foreground">Support</h3>
                      <p className="text-muted-foreground">
                        Available Monday - Friday, 9 AM - 6 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted p-6">
                <h3 className="mb-2 font-semibold text-foreground">
                  {isFreeTrial
                    ? "What's Included in Your Free Trial?"
                    : "Why Contact Us?"}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {isFreeTrial ? (
                    <>
                      <li>• Full access to all Professional features</li>
                      <li>• 7 days completely free, no credit card required</li>
                      <li>• Setup assistance from our team</li>
                      <li>• Cancel anytime, no commitment</li>
                    </>
                  ) : (
                    <>
                      <li>• Get answers to your questions</li>
                      <li>• Request a custom demo</li>
                      <li>• Discuss enterprise solutions</li>
                      <li>• Report issues or provide feedback</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm isFreeTrial={isFreeTrial} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="pb-16 pt-32">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}
