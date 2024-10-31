import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
const FAQ = () => {
    return (
        <section id="faq" className="min-h-[70vh] flex flex-col justify-center items-center">
            <p className="text-4xl sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center h-[150px]">
                Frequently Asked Questions
            </p>
            <Accordion type="single" collapsible className="w-full sm:w-1/2 px-10 sm:px-0">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">What is SyncSales?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                        SyncSales is a SaaS CRM solution that helps businesses manage leads, integrate with third-party tools, and streamline their sales process through customizable workflows and detailed analytics.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl">How does the free plan work?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                        Our free plan allows you to manage up to 100 leads per month, access basic charts, and use one webhook integration. It&apos;s perfect for small businesses or those just starting with CRM.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl text-left">Can I upgrade or downgrade my plan anytime?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                        Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and your data will be adjusted according to your new plan&apos;s limits.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-xl text-left">How secure is my data with SyncSales?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                        We take data security seriously. SyncSales uses industry-standard encryption, regular security audits, and strict access controls to ensure your data is protected at all times.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
};

export default FAQ;
