import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
    const data = [
        {
            title: "1",
            content: (
                <div>
                    <div className="">

                        <p className="text-white text-xl md:text-2xl font-bold mb-8">
                            Create and Integrate with Webhook
                        </p>
                        <p>Easily connect with third-party tools using our powerful webhook system, enhancing your workflow.</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        <Image src={"/route-onboarding.png"} alt="illustration" width={400} height={400} className="rounded-md" />
                        <Image src={"/route-onboarding-2.png"} alt="illustration" width={400} height={400} className="rounded-md" />
                    </div>
                </div>
            ),
        },
        {
            title: "2",
            content: (
                <div>
                    <div className="">
                        <p className="text-white text-xl md:text-2xl font-bold mb-8">
                            Create Campaign
                        </p>
                        <p>Create campaigns and share api keys and with you sellers.</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        <Image src={"/campaign-onboarding.png"} alt="illustration" width={400} height={400} className="rounded-md" />
                        <Image src={"/campaign-onboarding-2.png"} alt="illustration" width={400} height={400} className="rounded-md" />
                    </div>

                </div>
            ),
        },
        {
            title: "3",
            content: (
                <div>
                  <div className="">
                        <p className="text-white text-xl md:text-2xl font-bold mb-4">
                            Lead generation
                        </p>

                        <p>
                            Capture leads effortlessly from your landing pages and forms, ensuring a steady flow of potential customers.
                        </p>
                  </div>

                  <div className="">
                    <Image src={'/leads-chart.png'} alt="illustration" width={400} height={400} className="rounded-md" />
                  </div>
                </div>
            ),
        },
    ];
    return (
        <div className="w-full">
            <Timeline data={data} />
        </div>
    );
}
