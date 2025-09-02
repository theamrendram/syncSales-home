import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Layers,
  Network,
  Share2,
  Users,
  ShieldCheck,
  MonitorSmartphone,
} from "lucide-react";

const features = [
  {
    title: "Never Lose Another Lead",
    description:
      "Collect leads from all your landing pages in one place. No more spreadsheets, missed opportunities, or manual data entry.",
    icon: Layers,
    benefit: "Save 10+ hours per week on lead management",
  },
  {
    title: "Automate Your Sales Process",
    description:
      "Set up smart routes that automatically qualify leads and send them to the right team member. Your sales team focuses on closing, not organizing.",
    icon: Network,
    benefit: "Qualify leads 5x faster with automation",
  },
  {
    title: "Scale Your Team Without Chaos",
    description:
      "Give webmasters access to specific campaigns while keeping your data secure. Collaborate effectively without losing control.",
    icon: Users,
    benefit: "Onboard new team members in minutes",
  },
  {
    title: "Make Data-Driven Decisions",
    description:
      "See exactly which campaigns are working and which aren't. Track conversion rates, lead quality, and ROI in real-time.",
    icon: BarChart,
    benefit: "Increase conversion rates by 35%",
  },
  {
    title: "Integrate with Your Existing Tools",
    description:
      "Connect to any CRM or tool with webhooks. No more manual data transfer or duplicate work across systems.",
    icon: Share2,
    benefit: "Eliminate 90% of manual data entry",
  },
  {
    title: "Get Instant Notifications",
    description:
      "Know immediately when high-value leads come in. Never miss a hot prospect or let leads go cold.",
    icon: MonitorSmartphone,
    benefit: "Respond to leads 10x faster",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-24 sm:py-32 bg-gradient-to-br from-black to-neutral-800">
      <div className="container space-y-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white tracking-tighter sm:text-4xl md:text-5xl">
            Everything you need to{" "}
            <span className="gradient-text">close more deals</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Stop losing revenue to manual processes. These powerful features
            transform your sales pipeline from chaotic to predictable.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="backdrop-blur-sm rounded-3xl p-8 flex flex-col h-full text-white transition-transform hover:scale-105 border border-white/10 hover:border-white/20">
              <CardHeader className="flex flex-col items-start space-y-4 pb-4">
                <div className="gradient-secondary w-14 h-14 rounded-xl flex items-center justify-center">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-amber-400 font-semibold text-sm">
                    💰 {feature.benefit}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
