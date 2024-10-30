import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import { Tally1, Tally2, Tally3 } from "lucide-react";
const Setup = () => {
  return (
    <section className="min-h-[50vh]">
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
        3 Step Setup
      </p>
      <div className="max-w-6xl mx-auto">
        <HoverEffect items={steps} />
      </div>
    </section>
  );
};

export default Setup;

const steps = [
  {
    title: "Create Route and Integrate Webhook",
    description:
      "Easily connect with third-party tools using our powerful webhook system, enhancing your workflow.",
    link: "https://stripe.com",
    icon: <Tally1 size={40} />,
  },
  {
    title: "Create Campaign",
    description: "Create campaigns and share api keys and with you sellers.",
    link: "https://google.com",
    icon: <Tally3 size={40} />,
  },
  {
    title: "Lead Generation",
    description:
      "Capture leads effortlessly from your landing pages and forms, ensuring a steady flow of potential customers.",
    link: "https://netflix.com",
    icon: <Tally2 size={40} />,
  },
];
