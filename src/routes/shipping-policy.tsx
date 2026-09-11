import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell, Prose } from "@/components/site/Layout";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping Policy — Apne Hath Crochet" },
      {
        name: "description",
        content:
          "Dispatch timelines, pan-India delivery estimates, shipping charges and international orders for handmade crochet from Apne Hath Crochet.",
      },
      { property: "og:title", content: "Shipping Policy — Apne Hath Crochet" },
      { property: "og:description", content: "Dispatch timelines, delivery estimates and shipping charges." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShippingPolicyPage,
});

function ShippingPolicyPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Shipping" title="Shipping policy" intro="How and when your handmade parcel reaches you." />
      <Prose>
        <h2>Processing time</h2>
        <p>
          Ready-to-ship pieces are dispatched within 1–2 working days. Made-to-order pieces need 5–7 working
          days, and larger custom bouquets can take up to 14 working days. The timeline for each item is shown
          on its product page.
        </p>

        <h2>Delivery estimates</h2>
        <ul>
          <li>Metro cities: 2–4 working days after dispatch</li>
          <li>Rest of India: 4–7 working days after dispatch</li>
          <li>Remote pincodes: up to 10 working days</li>
        </ul>

        <h2>Shipping charges</h2>
        <p>
          Free shipping on all prepaid orders above ₹1,499. Below that, a flat ₹79 applies. Cash on delivery,
          where available, carries an additional ₹49 handling fee.
        </p>

        <h2>Tracking</h2>
        <p>
          You will receive an email and WhatsApp message with your tracking link as soon as the parcel leaves
          our studio. You can also track it any time from the track order page using your order number.
        </p>

        <h2>International orders</h2>
        <p>
          We ship worldwide on request. Write to hello@apnehathcrochet.in with your address and wish list and
          we will share a shipping quote. Customs duties, where applicable, are payable by the recipient.
        </p>

        <h2>Delays</h2>
        <p>
          Festive seasons, weather and courier disruptions can occasionally delay a parcel. If your order has
          not moved for more than 72 hours, contact us and we will chase the courier for you.
        </p>
      </Prose>
    </PageShell>
  );
}
