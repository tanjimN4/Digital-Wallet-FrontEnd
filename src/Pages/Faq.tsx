import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Faq() {
  const faqs = [
    {
      q: "Is my money safe?",
      a: "Yes, we use bank-level encryption and multi-factor authentication.",
    },
    {
      q: "How fast are transactions?",
      a: "All transactions are processed instantly, 24/7.",
    },
    {
      q: "Can I use the wallet abroad?",
      a: "Yes, our wallet supports international access with local compliance.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full max-w-2xl">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
