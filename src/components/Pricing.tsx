"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$20",
    description: "Perfect for trying out SyncSales",
    features: [
      "Up to 100 leads/day",
      "2 Webhook endpoints",
      "2 Campaigns",
      "API access",
      "Email Support",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    description: "Best for growing sales teams",
    features: [
      "Unlimited Leads",
      "Unlimited Webhook endpoints",
      "Custom workflows",
      "Webmaster Access",
      "API Access",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "24/7 phone support",
      "Team collaboration",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <div className="space-y-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Choose the plan that&apos;s right for your team
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.popular ? "border-primary" : undefined}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-gray-500">/month</span>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  onClick={() =>     {
                    if (plan.name === "Basic") {
                      window.location.href =
                        "/checkout?plan=basic";
                    } else if (plan.name === "Pro") {
                      window.location.href =
                        "/checkout?plan=pro";
                    } else {
                      window.location.href = "/contact";
                    }
                  }}>
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
