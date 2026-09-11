import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell, Prose } from "@/components/site/Layout";

export const Route = createFileRoute("/return-policy")({
  head: () => ({
    meta: [
      { title: "Returns & Refunds — Apne Hath Crochet" },
      {
        name: "description",
        content:
          "Our 7-day return window, exchange process, refund timelines and rules for custom handmade crochet pieces at Apne Hath Crochet.",
      },
      { property: "og:title", content: "Returns & Refunds — Apne Hath Crochet" },
      { property: "og:description", content: "7-day returns, exchanges and refund timelines explained." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReturnPolicyPage,
});

function ReturnPolicyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Returns"
        title="Returns & refunds"
        intro="We want you to love your piece. If something is not right, here is what happens next."
      />
      <Prose>
        <h2>Return window</h2>
        <p>
          Ready-made pieces can be returned within 7 days of delivery, provided they are unused, unwashed and
          in their original packaging with tags intact.
        </p>

        <h2>What cannot be returned</h2>
        <ul>
          <li>Custom, personalised and made-to-measure pieces</li>
          <li>Items marked final sale or bought during a clearance event</li>
          <li>Items damaged through use, washing or improper storage</li>
        </ul>

        <h2>Handmade variations</h2>
        <p>
          Small differences in colour, size and stitch tension are natural in handmade crochet and are not
          considered defects. Screen colours can also vary from real yarn shades.
        </p>

        <h2>How to start a return</h2>
        <p>
          Email hello@apnehathcrochet.in with your order number and photos within 7 days of delivery. Once
          approved, we arrange a reverse pickup where serviceable, or share a return address.
        </p>

        <h2>Refunds</h2>
        <p>
          After the returned item reaches us and passes a quick quality check, refunds are issued to the
          original payment method within 5–7 working days. Shipping charges are non-refundable unless the item
          arrived damaged or incorrect.
        </p>

        <h2>Damaged or wrong items</h2>
        <p>
          Send us an unboxing photo or video within 48 hours of delivery and we will replace the piece or
          refund you in full, including shipping — no questions asked.
        </p>

        <h2>Exchanges</h2>
        <p>
          Want a different colour or size instead? We are happy to exchange within the same 7-day window,
          subject to availability. Custom pieces are excluded.
        </p>
      </Prose>
    </PageShell>
  );
}
