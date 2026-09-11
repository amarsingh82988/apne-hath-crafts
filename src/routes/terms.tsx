import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell, Prose } from "@/components/site/Layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Apne Hath Crochet" },
      {
        name: "description",
        content:
          "The terms that apply when you browse, order or commission a handmade crochet piece from Apne Hath Crochet.",
      },
      { property: "og:title", content: "Terms & Conditions — Apne Hath Crochet" },
      { property: "og:description", content: "The terms that apply when you shop with Apne Hath Crochet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title="Terms & conditions" intro="The simple rules that keep things fair for both of us." />
      <Prose>
        <h2>Using this website</h2>
        <p>
          By browsing or ordering from Apne Hath Crochet you agree to these terms. If you do not agree, please
          do not use the site.
        </p>

        <h2>Products &amp; pricing</h2>
        <p>
          All prices are in Indian Rupees and inclusive of applicable taxes unless stated otherwise. We may
          change prices, but never after an order is confirmed. Photographs are as accurate as we can make
          them; handmade pieces will vary slightly.
        </p>

        <h2>Orders</h2>
        <p>
          An order is confirmed only once payment is received. We may cancel and refund an order if an item is
          unavailable, a pricing error occurred or the delivery address is not serviceable.
        </p>

        <h2>Custom orders</h2>
        <p>
          Custom work begins after you approve the sketch and pay the agreed advance. Advances on custom work
          are non-refundable once making has started, since materials are bought and hours are worked
          specifically for you.
        </p>

        <h2>Care &amp; use</h2>
        <p>
          Crochet items are decorative and handmade. Toys are not certified safety toys and should be kept
          away from infants unsupervised. Follow the care instructions supplied with your piece.
        </p>

        <h2>Intellectual property</h2>
        <p>
          All designs, photographs and text on this site belong to Apne Hath Crochet. Please do not copy or
          resell them without written permission.
        </p>

        <h2>Liability</h2>
        <p>
          Our liability for any order is limited to the amount you paid for it. We are not responsible for
          courier delays outside our control.
        </p>

        <h2>Contact</h2>
        <p>Questions about these terms? Write to hello@apnehathcrochet.in.</p>
      </Prose>
    </PageShell>
  );
}
