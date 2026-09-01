import React from "react";
import { Check } from "lucide-react";
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
    <section id="pricing" className="bg-background py-24 sm:py-32">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
          Simple pricing that scales with your success
        </h2>
        <p className="mx-auto mt-6 max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Start free, grow when you&apos;re ready. No hidden fees, no surprises.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
};

export { Pricing };

function PricingCard({ plan }: { plan: any }) {
  return (
    <div
      className={`flex w-80 flex-col justify-between rounded-lg p-8 transition-all hover:-translate-y-1 ${
        plan.popular
          ? "border-2 border-primary bg-card shadow-3xl"
          : "border border-border bg-card shadow-sm hover:shadow-3xl"
      }`}
    >
      {plan.popular && (
        <span className="gradient-primary mb-6 inline-block max-w-fit rounded-full px-4 py-2 text-sm font-semibold text-white">
          Most Popular
        </span>
      )}

      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          {plan.name}
        </h3>
        <div className="mb-2 flex items-baseline">
          <span className="text-4xl font-bold text-foreground">
            {plan.price}
          </span>
          <span className="ml-1 text-muted-foreground">{plan.period}</span>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>
        <div className="rounded-md border border-border bg-muted p-3">
          <p className="text-sm font-semibold text-brand-ink">
            &#127919; {plan.highlight}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-4 text-sm font-medium text-muted-foreground">
          What&apos;s included:
        </p>
        <ul className="space-y-3">
          {plan.features.map((feature: string) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-foreground"
            >
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <Link
          href={
            plan.checkoutPlan
              ? `/checkout?plan=${plan.checkoutPlan}&source=pricing`
              : "/contact?source=free-trial"
          }
          className={`inline-flex w-full items-center justify-center rounded-md px-6 py-3 font-semibold transition-all duration-200 ${
            plan.popular
              ? "gradient-primary text-white hover:scale-[1.02]"
              : "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          {plan.cta}
        </Link>
        {plan.popular && (
          <p className="mt-3 text-sm text-muted-foreground">
            Start with a 7-day free trial
          </p>
        )}
      </div>
    </div>
  );
}
