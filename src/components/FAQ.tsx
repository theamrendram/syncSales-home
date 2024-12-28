import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "What is SyncSales?",
        answer: "SyncSales is an AI-powered sales automation platform that helps teams generate, qualify, and convert leads more effectively. It combines lead scoring, automation, and team collaboration features in one unified platform."
    },
    {
        question: "How does the free trial work?",
        answer: "Our 14-day free trial gives you full access to all Pro features. No credit card is required to start, and you can cancel anytime. At the end of the trial, you can choose to upgrade to a paid plan or continue with the free plan."
    },
    {
        question: "Can I upgrade or downgrade my plan anytime?",
        answer: "Yes, you can change your plan at any time. When upgrading, you'll be prorated for the remainder of your billing period. When downgrading, the new rate will apply at the start of your next billing cycle."
    },
    {
        question: "Do you offer custom enterprise solutions?",
        answer: "Yes, we offer customized enterprise solutions with dedicated support, custom integrations, and flexible pricing based on your needs. Contact our sales team to learn more."
    },
    {
        question: "What kind of support do you offer?",
        answer: "We offer email support for all plans, with priority support for Pro users and dedicated account management for Enterprise customers. Our help center is available 24/7 with detailed guides and tutorials."
    }
]

export function FAQ() {
    return (
        <section id="faq" className="container py-24 sm:py-32">
            <div className="space-y-16">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Frequently asked questions
                    </h2>
                    <p className="mx-auto mt-4 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Everything you need to know about SyncSales
                    </p>
                </div>
                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}

