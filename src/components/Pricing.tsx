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
    <div className="py-24 sm:py-32 bg-[linear-gradient(to_bottom_right,#171717_0%,#171717_60%,#465C88_75%,#FF9B00_100%)]">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
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
      className={`backdrop-blur-sm rounded-3xl p-8 w-80 flex flex-col justify-between text-white transition-transform hover:scale-105 ${
        plan.popular
          ? "bg-neutral-700/50 border-2 border-amber-400 shadow-2xl"
          : "bg-neutral-700/30 border border-white/10"
      }`}>
      {plan.popular && (
        <span className="inline-block bg-amber-500 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6 max-w-fit">
          Most Popular
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
        <div className="flex items-baseline mb-2">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-gray-400 ml-1">{plan.period}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
        <div className="bg-gradient-to-r from-blue-500/20 to-amber-400/20 rounded-lg p-3 border border-white/10">
          <p className="text-amber-400 font-semibold text-sm">
            🎯 {plan.highlight}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-4 font-medium">
          What&apos;s included:
        </p>
        <ul className="space-y-3">
          {plan.features.map((feature: string) => (
            <li key={feature} className="flex items-start gap-3 text-gray-300">
              <Check className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <Link
          href={plan.id === "enterprise" ? "/contact" : "/checkout/free-trial"}
          className={`w-full rounded-xl py-3 px-6 font-semibold transition-all duration-200 ${
            plan.popular
              ? "bg-gradient-to-r from-blue-500 to-amber-400 text-white hover:scale-105"
              : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
          }`}>
          {plan.cta}
        </Link>
        {plan.popular && (
          <p className="text-sm text-gray-400 mt-3">
            Start with a 7-day free trial
          </p>
        )}
      </div>
    </div>
  );
}
