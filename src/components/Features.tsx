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

// const features = [
//   {
//     title: "Instantly share leads with advertisers",
//     description:
//       "Instantly share leads with advertisers and get real-time insights into your sales pipeline. Using our best of the class webhook",
//     icon: BarChart3,
//   },
//   //   {
//   //     title: "Smart Automation",
//   //     description:
//   //       "Set up intelligent workflows that nurture leads and follow up at the perfect moment.",
//   //     icon: Zap,
//   //   },
//   {
//     title: "Team Collaboration",
//     description:
//       "Share insights and collaborate with built-in webmaster feature.",
//     icon: Users,
//   },
//   {
//     title: "Multi-Channel Engagement",
//     description:
//       "Get leads from multiple channels or campaigns and funnel them to a single route.",
//     icon: MessageSquare,
//   },
//   {
//     title: "Advanced Analytics",
//     description:
//       "Get real-time insights into your sales pipeline and campaigns performances.",
//     icon: BarChart,
//   },
// //   {
// //     title: "Smart Scheduling",
// //     description:
// //       "Let prospects book meetings instantly based on your team's real availability.",
// //     icon: Calendar,
// //   },
// ];

// const features = [
//   {
//     title: "Centralized Lead Collection",
//     description:
//       "Collect leads from multiple landing pages into a single platform for seamless management.",
//     icon: Layers,
//   },
//   {
//     title: "Route-Based Lead Processing",
//     description:
//       "Define lead handling rules with Routes and optionally configure Webhooks for automated CRM integration.",
//     icon: Network,
//   },
//   {
//     title: "Campaign Management",
//     description:
//       "Create and organize campaigns to categorize leads efficiently and track their performance.",
//     icon: Globe,
//   },
//   {
//     title: "Webhooks for Third-Party CRM Integration",
//     description:
//       "Easily send leads to external CRMs using configurable webhooks, reducing manual work.",
//     icon: Share2,
//   },
//   {
//     title: "Advanced Analytics",
//     description:
//       "Get real-time insights into lead performance, conversion rates, and campaign effectiveness.",
//     icon: BarChart,
//   },
//   {
//     title: "Webmaster Access & Lead Sharing",
//     description:
//       "Create webmasters with restricted access to specific campaigns, allowing them to manage assigned leads.",
//     icon: Users,
//   },
//   {
//     title: "Secure Authentication & User Roles",
//     description:
//       "Ensure secure access with Clerk-powered authentication and role-based permissions.",
//     icon: ShieldCheck,
//   },
//   {
//     title: "User-Friendly Dashboard",
//     description:
//       "Navigate seamlessly between leads, routes, and campaigns with a clean and intuitive UI.",
//     icon: MonitorSmartphone,
//   },
//   {
//     title: "Lead Scoring & Qualification",
//     description:
//       "Prioritize high-quality leads with automated lead scoring and qualification mechanisms.",
//     icon: TrendingUp,
//   },
//   {
//     title: "Email & SMS Notifications",
//     description:
//       "Receive real-time notifications whenever new leads arrive or when important actions occur.",
//     icon: Mail,
//   },
//   {
//     title: "Custom Reporting & Exports",
//     description:
//       "Generate detailed reports and export lead data in CSV, Excel, or JSON formats.",
//     icon: FileText,
//   },
// ];

const features = [
  {
    title: "Centralized Lead Management",
    description:
      "Collect and organize leads from multiple landing pages into a single platform. Manage routes, campaigns, and webmasters seamlessly.",
    icon: Layers,
  },
  {
    title: "Automated Lead Processing & Webhooks",
    description:
      "Define routes to automate lead handling and optionally forward leads to third-party CRMs using configurable webhooks.",
    icon: Network,
  },
  {
    title: "Campaign & Webmaster Access Control",
    description:
      "Create campaigns to categorize leads efficiently. Share campaign-specific access with webmasters to collaborate effectively.",
    icon: Users,
  },
  {
    title: "Advanced Analytics & Reporting",
    description:
      "Gain real-time insights into lead performance, conversion rates, and campaign effectiveness. Export reports in multiple formats.",
    icon: BarChart,
  },
  //   {
  //     title: "Secure Authentication & Role Management",
  //     description:
  //       "Ensure secure access with Clerk-powered authentication, role-based permissions, and single sign-on (SSO) across subdomains.",
  //     icon: ShieldCheck,
  //   },
   {
     title: "User-Friendly Dashboard",
     description:
       "Navigate seamlessly between leads, routes, and campaigns with a clean and intuitive UI.",
     icon: MonitorSmartphone,
   },
  {
    title: "Real-Time Notifications & Alerts",
    description:
      "Receive instant email and SMS notifications for new leads and important actions, ensuring quick response times.",
    icon: Share2,
  },
];

export function Features() {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <div className="space-y-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything you need to{" "}
            <span className="gradient-text">accelerate sales</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Powerful features that help you convert more leads into customers.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="flex flex-col group transition-all duration-300 hover:shadow-lg">
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
  );
}
