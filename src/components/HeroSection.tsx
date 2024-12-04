"use client";
import { motion } from "framer-motion";
import { Highlight } from "./ui/hero-highlight";
import illustration from "@/public/undraw_growing_re_olpi.svg"
import Image from "next/image";
import { Button } from "./ui/button";
export function HeroSection() {
    return (
        <section className="flex items-center justify-center px-4 sm:px-20">
            <div className="flex flex-col justify-center gap-x-48 gap-y-8 text-center sm:text-left z-[1]">
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-4xl md:text-6xl font-bold text-gray-200 max-w-4xl leading-10 sm:leading-snug">
                    <span className="me-2">Streamline your lead generation with</span>
                    <Highlight className="text-black rounded-xl mt-2">
                        SyncSales
                    </Highlight>
                </motion.h1>
                <motion.p
                    initial={{
                        opacity: 0,
                        y: 20,
                    }} animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }} transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-lg font-medium text-gray-200 max-w-4xl md:leading-normal"> Get leads, manage campaigns, and boost your sales with our all-in-one CRM solution. Integrate easily and start selling smarter today.</motion.p>

                <div className="flex justify-center sm:justify-start sm:items-start gap-4 z-10">
                    <Button variant={"ghost"} className="h-14 text-xl font-medium rounded-xl bg-gradient-to-b from-neutral-100 to-neutral-400 text-black hover:scale-105 duration-300 ease-in-out">Start Free Trial</Button>
                    <Button variant={"ghost"} className="h-14 text-xl font-medium rounded-xl duration-300 ease-in-out ring-1 ring-white hover:bg-secondary hover:text-white hover:ring-0">Contact Us</Button>
                </div>
            </div>
            <div className="hidden lg:flex">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                >
                    <Image src={illustration} alt="hero-img" />
                </motion.div>
            </div>
        </section>
    );
}
