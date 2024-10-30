import React from 'react'
import { HoverEffect } from "./ui/card-hover-effect";
import { ChartColumnIncreasing, ChartPie, Webhook } from "lucide-react";
const Features = () => {
    return (
        <div className="min-h-screen w-full bg-black bg-grid-white/[0.2] relative">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
                Key Features
            </p>
            <div className="max-w-6xl mx-4 sm:mx-auto">
                <HoverEffect items={projects} />
            </div>
        </div>

    )
}

export default Features

const projects = [
    {
        title: "Lead Generation",
        description:
            "Capture leads effortlessly from your landing pages and forms, ensuring a steady flow of potential customers.",
        link: "https://stripe.com",
        icon: <ChartColumnIncreasing size={40} />
    },  
    {
        title: "Insightful Charts",
        description:
            "Visualize your sales data with interactive charts, helping you make data-driven decisions quickly.",
        link: "https://netflix.com",
        icon: <ChartPie size={40} />
    },
    {
        title: "Webhook Integration",
        description:
            "Easily connect with third-party tools using our powerful webhook system, enhancing your workflow.",
        link: "https://google.com",
        icon: <Webhook size={40} />
    },
    {
        title: "Meta",
        description:
            "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
        link: "https://meta.com",
        icon: <Webhook size={40} />
    },
    {
        title: "Amazon",
        description:
            "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
        link: "https://amazon.com",
        icon: <Webhook size={40} />
    },
    {
        title: "Microsoft",
        description:
            "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
        link: "https://microsoft.com",
        icon: <Webhook size={40} />
    },
];
