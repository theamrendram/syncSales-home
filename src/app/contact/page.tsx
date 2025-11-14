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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />
      <main className="pb-16 pt-32">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-4xl font-bold text-transparent text-white md:text-5xl">
              {isFreeTrial ? "Start Your Free Trial" : "Get in Touch"}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              {isFreeTrial
                ? "Fill out the form below to start your 7-day free trial. No credit card required, cancel anytime."
                : "Have a question or want to learn more about SyncSales? We'd love to hear from you."}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-semibold text-white">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-amber-400/20 p-3">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-white">Email</h3>
                      <p className="text-gray-400">contact.syncsales@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-amber-400/20 p-3">
                      <MessageSquare className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-white">
                        Response Time
                      </h3>
                      <p className="text-gray-400">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-amber-400/20 p-3">
                      <MapPin className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-white">Support</h3>
                      <p className="text-gray-400">
                        Available Monday - Friday, 9 AM - 6 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-amber-400/10 p-6">
                <h3 className="mb-2 font-semibold text-white">
                  {isFreeTrial
                    ? "What's Included in Your Free Trial?"
                    : "Why Contact Us?"}
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
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
