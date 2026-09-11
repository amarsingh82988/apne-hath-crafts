import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/site/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Apne Hath Crochet" },
      {
        name: "description",
        content:
          "Answers about crochet order timelines, shipping across India, custom pieces, washing care, returns and payments at Apne Hath Crochet.",
      },
      { property: "og:title", content: "FAQ — Apne Hath Crochet" },
      { property: "og:description", content: "Timelines, shipping, custom orders, care and returns — answered." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    q: "How long does it take to make my order?",
    a: "Ready-to-ship pieces leave the studio in 1–2 working days. Made-to-order pieces take 5–7 working days, and large custom bouquets can take up to 14 days. The exact timeline is shown on each product page.",
  },
  {
    q: "Do you ship across India?",
    a: "Yes, we ship pan-India with tracked courier partners. Delivery usually takes 3–6 working days after dispatch. Shipping is free on orders above ₹1,499; below that a flat ₹79 applies.",
  },
  {
    q: "Can I request custom colours or a completely custom piece?",
    a: "Absolutely — that is our favourite kind of order. Share your colours, size and occasion on the custom orders page and we will send a sketch and quote within 48 hours.",
  },
  {
    q: "How do I wash and care for crochet items?",
    a: "Hand wash in cold water with a mild detergent, do not wring, and dry flat in shade. For flowers and bouquets, simply dust them with a soft brush or a hairdryer on the cool setting.",
  },
  {
    q: "Will my item look exactly like the photo?",
    a: "Very close, but never identical. Each piece is crocheted by hand, so tiny variations in tension, yarn dye lot and shaping are part of the charm.",
  },
  {
    q: "What is your return policy?",
    a: "Ready-made pieces can be returned within 7 days of delivery if unused and in original packaging. Custom and personalised pieces cannot be returned, but we will always fix a genuine defect free of charge.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "UPI, all major credit and debit cards, net banking and wallets through our secure payment gateway. Cash on delivery is available on select pincodes for orders under ₹3,000.",
  },
  {
    q: "Do you take bulk or corporate gifting orders?",
    a: "Yes. We regularly make wedding favours, baby shower gifts and corporate hampers. Write to us with quantity and deadline and we will share bulk pricing.",
  },
];

function FaqPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Good to know"
        title="Frequently asked questions"
        intro="Everything about timelines, shipping, care and custom pieces — in one place."
      />
      <div className="container-page max-w-3xl py-16">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-display text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Still unsure about something?{" "}
          <Link to="/contact" className="text-accent underline underline-offset-4">
            Write to the studio
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
