"use client";
import { motion } from "framer-motion";
import { Highlight } from "./ui/hero-highlight";
import illustration from "@/public/undraw_growing_re_olpi.svg"
import Image from "next/image";
import { Button } from "./ui/button";
export function HeroSection() {
    return (
        <section className="flex items-center justify-center px-20">
            <div className="flex flex-col justify-center gap-x-48 gap-y-8">
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
                    className="text-2xl md:text-6xl font-bold text-white max-w-4xl md:leading-normal mx-auto">
                    Streamline your sales with <br></br>
                    <Highlight className="text-black rounded-xl">
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
                    className="text-lg px-4 font-medium text-white max-w-4xl md:leading-normal"> Get leads, manage campaigns, and boost your sales with our all-in-one CRM solution. Integrate easily and start selling smarter today.</motion.p>

                <div className="flex items-start gap-4">
                    <Button variant={"accent"} className="h-16 text-xl font-medium rounded-xl">Start Free Trial</Button>
                    <Button variant={"secondary"} className="h-16 text-xl font-medium rounded-xl">Contact Us</Button>
                </div>
            </div>
            <div className="">
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
