import React from "react";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Pricing = () => {
  const plans = [
    {
      id: "basic",
      name: "Starter",
      fullName: "Starter",
      price: "$20",
      period: "/month",
      description: "Perfect for small sales teams getting started",
      features: [
        "Up to 200 leads/day",
        "2 Webhook Endpoints",
        "2 Campaigns",
        "API Access",
        "Email Support",
        "7-day free trial",
      ],
      popular: false,
      cta: "Start Free Trial",
      highlight: "Save 10+ hours/week",
    },
    {
      id: "pro",
      name: "Professional",
      fullName: "Professional",
      price: "$46",
      period: "/month",
      description: "Best for growing sales teams",
      features: [
        "Everything in Starter",
        "Unlimited Webhook Endpoints",
        "Unlimited Campaigns",
        "Webmaster Access",
        "Priority Support",
        "Advanced Analytics",
      ],
      popular: true,
      cta: "Start Free Trial",
      highlight: "Close 40% more deals",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      fullName: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with custom needs",
      features: [
        "Everything in Professional",
        "Custom integrations",
        "24/7 phone support",
        "Team collaboration",
        "Dedicated account manager",
        "Custom SLA",
      ],
      popular: false,
      cta: "Contact Sales",
      highlight: "Scale without limits",
    },
  ];

  return (
    <div className="bg-[linear-gradient(to_bottom_right,#171717_0%,#171717_60%,#465C88_75%,#FF9B00_100%)] py-24 sm:py-32">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
          Simple pricing that scales with your success
        </h2>
        <p className="mx-auto mt-6 max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Start free, grow when you&apos;re ready. No hidden fees, no surprises.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export { Pricing };

function PricingCard({ plan }: { plan: any }) {
  return (
    <div
      className={`flex w-80 flex-col justify-between rounded-3xl p-8 text-white backdrop-blur-sm transition-transform hover:scale-105 ${
        plan.popular
          ? "border-2 border-amber-400 bg-neutral-700/50 shadow-2xl"
          : "border border-white/10 bg-neutral-700/30"
      }`}
    >
      {plan.popular && (
        <span className="mb-6 inline-block max-w-fit rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black">
          Most Popular
        </span>
      )}

      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold">{plan.name}</h3>
        <div className="mb-2 flex items-baseline">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="ml-1 text-gray-400">{plan.period}</span>
        </div>
        <p className="mb-4 text-sm text-gray-400">{plan.description}</p>
        <div className="rounded-lg border border-white/10 bg-gradient-to-r from-blue-500/20 to-amber-400/20 p-3">
          <p className="text-sm font-semibold text-amber-400">
            🎯 {plan.highlight}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-4 text-sm font-medium text-gray-400">
          What&apos;s included:
        </p>
        <ul className="space-y-3">
          {plan.features.map((feature: string) => (
            <li key={feature} className="flex items-start gap-3 text-gray-300">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <Link
          href={plan.id === "enterprise" ? "/contact" : "/checkout"}
          className={`w-full rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${
            plan.popular
              ? "bg-gradient-to-r from-blue-500 to-amber-400 text-white hover:scale-105"
              : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {plan.cta}
        </Link>
        {plan.popular && (
          <p className="mt-3 text-sm text-gray-400">
            Start with a 7-day free trial
          </p>
        )}
      </div>
    </div>
  );
}
