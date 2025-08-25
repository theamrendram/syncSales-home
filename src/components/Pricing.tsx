import React from "react";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Pricing = () => {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      fullName: "Basic",
      price: "$20/month",
      description: "Perfect for trying out SyncSales",
      features: [
        "Up to 200 leads/day",
        "2 Webhook Endpoints",
        "2 Campaigns",
        "API Access",
        "Email Support",
        "14-day free trial",
      ],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      fullName: "Pro",
      price: "$46/month",
      description: "Best for growing sales teams",
      features: [
        "Everything in Basic",
        "Unlimited Webhook Endpoints",
        "Unlimited Campaigns",
        "Webmaster Access",
        "Priority Support",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      fullName: "Enterprise",
      price: "Custom",
      description: "For large organizations with custom needs",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "24/7 phone support",
        "Team collaboration",
        "Dedicated account manager",
        // "Custom SLA",
      ],
    },
  ];

  return (
    <div className="py-24 sm:py-32 bg-[linear-gradient(to_bottom_right,#171717_0%,#171717_60%,#465C88_75%,#FF9B00_100%)]">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Choose the plan that&apos;s right for your team
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
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
      className={`backdrop-blur-sm rounded-3xl p-6 w-80 flex flex-col justify-between text-white transition-transform hover:scale-105 ${
        plan.popular
          ? "bg-neutral-700/50 border-2 border-yellow-400"
          : "bg-neutral-700/30"
      }`}>
      {plan.popular && (
        <span className="inline-block bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-medium mb-4 max-w-fit">
          Most Popular
        </span>
      )}

      <p className="text-sm text-gray-500 py-2">{plan.name}</p>
      <p className="text-3xl">{plan.price}</p>

      <div className="py-8">
        <p className="text-sm text-gray-500 py-4">includes</p>
        <ul>
          {plan.features.map((feature: string) => (
            <li key={feature} className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-yellow-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        {plan.popular && (
          <p className="text-sm text-gray-500 py-2 text-center">
            Start with a 14-day free trial
          </p>
        )}
        <Link
          href="/signup"
          className="w-full bg-white rounded-xl text-black hover:bg-white/90 flex items-center justify-center py-1.5 px-4">
          Get Started
        </Link>
      </div>
    </div>
  );
}
