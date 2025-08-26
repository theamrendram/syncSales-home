import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is SyncSales?",
    answer:
      "SyncSales is a lead management SaaS that centralizes lead collection, automates lead distribution, and integrates seamlessly with third-party CRMs via webhooks.",
  },
  {
    question: "How does SyncSales handle leads?",
    answer:
      "SyncSales collects leads from multiple landing pages and assigns them to campaigns. Leads are then processed through predefined routes, which may trigger webhooks to forward data to external platforms.",
  },
  {
    question: "Can I integrate SyncSales with my CRM?",
    answer:
      "Yes! SyncSales supports webhook-based integration, allowing you to send leads to third-party CRMs like HubSpot, Salesforce, and Zoho in real time.",
  },
  {
    question: "What are Routes and Campaigns in SyncSales?",
    answer:
      "Routes define how leads are processed and whether they trigger webhooks. Campaigns group leads under specific categories for better organization and tracking.",
  },
  {
    question: "What is the Webmaster feature?",
    answer:
      "The Webmaster feature allows users to create sub-accounts for webmasters. These webmasters can access specific campaigns to view and manage assigned leads.",
  },
  {
    question: "How secure is SyncSales?",
    answer:
      "SyncSales uses Clerk for authentication, ensuring secure login and Single Sign-On (SSO) across subdomains. Role-based access control also ensures users only access what they need.",
  },
  {
    question: "Does SyncSales provide analytics?",
    answer:
      "Yes! Our analytics dashboard provides insights into lead performance, conversion rates, and campaign effectiveness to help you optimize your sales process.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Our 7-day free trial gives you full access to all Pro features. No credit card is required to start, and you can cancel anytime. At the end of the trial, you can choose to upgrade to a paid plan or continue with the free plan.",
  },
  {
    question: "What pricing plans are available?",
    answer:
      "SyncSales offers flexible pricing plans, including basic, pro, and enterprise tiers. Contact us for a custom quote based on your needs.",
  },
  {
    question: "What kind of support does SyncSales provide?",
    answer:
      "We offer email support for all users, with priority support for Pro users and dedicated account management for Enterprise clients.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-24 sm:py-32 text-white bg-[linear-gradient(to_top_right,#171717_0%,#171717_60%,#465C88_75%,#FF9B00_100%)]">
      <div className="container space-y-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Everything you need to know about SyncSales
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
