import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How quickly will I see results?",
    answer:
      "Most customers see immediate improvements in lead response times and organization within the first week. You&apos;ll typically save 10+ hours per week on lead management from day one.",
  },
  {
    question: "Can I really close 40% more deals?",
    answer:
      "Yes! By automating lead qualification, ensuring no leads fall through the cracks, and providing instant notifications, our customers consistently report 35-45% increases in deal closure rates.",
  },
  {
    question: "What if I&apos;m not technical?",
    answer:
      "SyncSales is designed for sales professionals, not developers. Our 5-minute setup wizard guides you through everything. Plus, our support team is here to help with any questions.",
  },
  {
    question: "How does the free trial work?",
    answer:
      "Start with a 14-day free trial with full access to all Professional features. No credit card required, no commitment. If you love it, upgrade when you&apos;re ready. If not, cancel anytime.",
  },
  {
    question: "Can I integrate with my existing tools?",
    answer:
      "Absolutely! SyncSales connects to any CRM or tool via webhooks. Whether you use HubSpot, Salesforce, Pipedrive, or custom systems, we&apos;ll help you set up seamless integration.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your data is always yours. If you cancel, you can export all your leads, campaigns, and analytics. We never hold your data hostage.",
  },
  {
    question: "Is SyncSales secure for enterprise use?",
    answer:
      "Yes! We&apos;re SOC 2 compliant with enterprise-grade security. Your data is encrypted, backed up daily, and we offer role-based access control for team collaboration.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "All plans include email support with 24-hour response times. Professional and Enterprise plans get priority support, and Enterprise customers get dedicated account management.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="border-y border-border bg-muted py-24 sm:py-32"
    >
      <div className="container space-y-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
            Got Questions? We&apos;ve Got Answers
          </h2>
          <p className="mx-auto mt-6 max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Everything you need to know to get started and succeed with
            SyncSales
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-4xl"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-border"
            >
              <AccordionTrigger className="text-left text-lg font-medium text-foreground transition-colors hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional CTA after FAQ */}
        <div className="pt-8 text-center">
          <p className="mb-6 text-muted-foreground">
            Still have questions? Our team is here to help.
          </p>
          <a
            href="/contact?source=free-trial"
            className="gradient-primary inline-flex h-12 items-center justify-center rounded-lg px-8 font-semibold text-white transition-transform duration-200 hover:scale-105"
          >
            Start Your Free Trial Today
          </a>
        </div>
      </div>
    </section>
  );
}
