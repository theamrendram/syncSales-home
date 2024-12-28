import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "Perfect for trying out SyncSales",
        features: [
            "Up to 100 contacts",
            "Basic lead scoring",
            "Email templates",
            "Chrome extension",
        ],
    },
    {
        name: "Pro",
        price: "$49",
        description: "Best for growing sales teams",
        features: [
            "Unlimited contacts",
            "Advanced lead scoring",
            "Custom workflows",
            "Team collaboration",
            "API access",
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
            "Dedicated account manager",
            "Custom AI training",
            "SLA",
            "24/7 phone support",
        ],
    },
]

export function Pricing() {
    return (
        <section id="pricing" className="container py-24 sm:py-32">
            <div className="space-y-16">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Simple, transparent pricing
                    </h2>
                    <p className="mx-auto mt-4 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Choose the plan that#&39;s right for your team
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={plan.popular ? "border-primary" : undefined}>
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-gray-500">/month</span>}
                                </div>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className="mt-8 w-full">
                                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

