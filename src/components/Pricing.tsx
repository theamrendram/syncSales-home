"use client";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
const Pricing = () => {
    return (
        <section id="pricing" className="py-10">
            <p className="text-3xl sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center px-10">
                Simple and Transparent Pricing
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-4 sm:mx-auto px-4 sm:px-10">
                <WobbleCard
                    containerClassName="h-full bg-black/80 min-h-[500px] lg:min-h-[300px] border-white"
                    className="flex flex-col gap-4">
                    <p className="text-4xl">Free</p>
                    <p><span className="text-5xl font-semibold">$0</span>/month</p>
                    <div className="flex flex-col gap-2">
                        <p className="flex items-center gap-2"><span><Check size={20} /></span>Up to 200 leads/day</p>
                        <p className="flex items-center gap-2"><span><Check size={20} /></span>Basic charts</p>
                        <p className="flex items-center gap-2"><span><Check size={20} /></span>3 webhook integration</p>
                    </div>
                    <Button className="w-full bg-white text-black rounded-xl hover:bg-gray-500 hover:text-white pointer-events-auto z-10  " variant={"ghost"}>Contact Sales</Button>
                </WobbleCard>
                <WobbleCard
                    containerClassName="h-full bg-black/80 min-h-[500px] lg:min-h-[300px] border-white"
                    className="flex flex-col gap-4">
                    <p className="text-4xl">Basic</p>
                    <p><span className="text-5xl font-semibold">$25</span>/month</p>
                    <div className="flex flex-col gap-2">
                        <p className="flex items-center gap-2"><span><Check size={20} /></span>Up to 500 leads/day</p>
                        <p className="flex items-center gap-2"><span><Check size={20} /></span>Advanced Charts</p>
                        <p className="flex items-center gap-2"><span><Check size={20} /></span>10 Webhook Integration</p>
                        <p className="flex items-center gap-2"><span><Check size={20} /></span>Email Support</p>
                    </div>
                    <Button className="w-full bg-white text-black rounded-xl hover:bg-gray-500 hover:text-white pointer-events-auto z-10  " variant={"ghost"}>Contact Sales</Button>
                </WobbleCard>
                <WobbleCard
                    containerClassName="h-full bg-black/80 min-h-[500px] lg:min-h-[300px] border-white"
                    className="flex flex-col gap-4">
                    <p className="text-4xl">Pro</p>
                    <p><span className="text-5xl font-semibold">$69</span>/month</p>
                    <div className="flex flex-col gap-2">
                        <p className="flex items-center gap-2"><span><Check size={20} /></span>Unlimited leads</p>
                        <p className="flex items-center gap-2"><span><Check size={20} /></span>Custom charts</p>
                        <p className="flex items-center gap-2"><span><Check size={20} /></span>Unlimited Webhook Integration</p>
                        <p className="flex items-center gap-2"><span><Check size={20} /></span>Priority Support</p>
                    </div>
                    <Button className="w-full bg-white text-black rounded-xl hover:bg-gray-500 hover:text-white pointer-events-auto z-10  " variant={"ghost"}>Contact Sales</Button>
                </WobbleCard>

            </div>
        </section>
    )
}

export default Pricing