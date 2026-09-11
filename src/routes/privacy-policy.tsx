import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell, Prose } from "@/components/site/Layout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Apne Hath Crochet" },
      {
        name: "description",
        content:
          "How Apne Hath Crochet collects, uses, stores and protects your personal information when you shop with us.",
      },
      { property: "og:title", content: "Privacy Policy — Apne Hath Crochet" },
      { property: "og:description", content: "How we collect, use and protect your personal information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title="Privacy policy" intro="Your details stay with us and only where they are needed." />
      <Prose>
        <h2>What we collect</h2>
        <ul>
          <li>Contact details: name, email, phone number and delivery address</li>
          <li>Order details: items purchased, order value and communication about your order</li>
          <li>Technical data: device, browser and anonymous usage analytics</li>
        </ul>

        <h2>How we use it</h2>
        <p>
          To process and deliver your orders, send order updates, respond to your enquiries, prevent fraud and
          — only if you opt in — send occasional news about new collections.
        </p>

        <h2>Payments</h2>
        <p>
          Payments are handled by our PCI-compliant payment gateway. We never see or store your full card
          number, CVV or UPI credentials.
        </p>

        <h2>Sharing</h2>
        <p>
          We share the minimum necessary information with courier partners, payment providers and email
          services so your order can reach you. We never sell your data.
        </p>

        <h2>Cookies</h2>
        <p>
          We use essential cookies to keep your cart and session working, plus anonymous analytics cookies to
          understand which pages people find useful. You can clear them any time in your browser.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask us to show, correct or delete the personal data we hold about you, and unsubscribe from
          marketing at any time. Write to hello@apnehathcrochet.in and we will respond within 30 days.
        </p>

        <h2>Security &amp; retention</h2>
        <p>
          Data is transmitted over encrypted connections and kept only as long as needed for orders, warranty
          and legal record-keeping.
        </p>
      </Prose>
    </PageShell>
  );
}
