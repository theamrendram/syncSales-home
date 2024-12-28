import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Zap, MessageSquare, BarChart, Calendar } from 'lucide-react'

const features = [
    {
        title: "AI-Powered Lead Scoring",
        description: "Automatically qualify and prioritize leads based on behavior patterns and engagement metrics.",
        icon: BarChart3,
    },
    {
        title: "Smart Automation",
        description: "Set up intelligent workflows that nurture leads and follow up at the perfect moment.",
        icon: Zap,
    },
    {
        title: "Team Collaboration",
        description: "Share insights, delegate tasks, and close deals faster with built-in team features.",
        icon: Users,
    },
    {
        title: "Multi-Channel Engagement",
        description: "Reach prospects through email, social, and messaging - all from one unified inbox.",
        icon: MessageSquare,
    },
    {
        title: "Advanced Analytics",
        description: "Get real-time insights into your sales pipeline and team performance.",
        icon: BarChart,
    },
    {
        title: "Smart Scheduling",
        description: "Let prospects book meetings instantly based on your team's real availability.",
        icon: Calendar,
    },
]

export function Features() {
    return (
        <section id="features" className="container py-24 sm:py-32">
            <div className="space-y-16">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Everything you need to <span className="gradient-text">accelerate sales</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Powerful features that help you convert more leads into customers.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <Card key={feature.title} className="flex flex-col group transition-all duration-300 hover:shadow-lg">
                            <CardHeader>
                                <div className="gradient-primary w-12 h-12 rounded-lg flex items-center justify-center">
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle className="mt-4">{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

