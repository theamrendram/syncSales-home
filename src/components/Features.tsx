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
  Filter,
} from "lucide-react";

const features = [
  {
    title: "AI Lead Filtering",
    description:
      "Our AI-powered lead filtering system automatically filters lead, ensuring only the highest-quality leads are passed to your sales team.",
    icon: Filter,
    benefit: "Increase conversion rates by 35%",
  },
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
];

export function Features() {
  return (
    <section id="features" className="bg-background py-24 sm:py-32">
      <div className="container space-y-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
            Everything you need to{" "}
            <span className="gradient-text">close more deals</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Stop losing revenue to manual processes. These powerful features
            transform your sales pipeline from chaotic to predictable.
          </p>
        </div>
        <div className="grid justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="flex h-full flex-col p-8 transition-all hover:-translate-y-1 hover:shadow-3xl"
            >
              <CardHeader className="flex flex-col items-start space-y-4 p-0 pb-4">
                <div className="gradient-primary flex h-14 w-14 items-center justify-center rounded-xl">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4 p-0">
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-brand-ink">
                    &#128176; {feature.benefit}
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
