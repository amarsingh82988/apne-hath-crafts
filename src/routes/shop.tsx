import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid, type ShopSearch } from "@/components/site/ProductGrid";
import { PageHeader, PageShell } from "@/components/site/Layout";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    sort: typeof search["sort"] === "string" ? search["sort"] : undefined,
    page: typeof search["page"] === "number" ? search["page"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Handmade Crochet — Apne Hath Crochet" },
      {
        name: "description",
        content:
          "Browse every handmade crochet piece: bouquets, tote bags, plushies, keychains, coasters and hair accessories.",
      },
      { property: "og:title", content: "Shop All Handmade Crochet" },
      { property: "og:description", content: "Handcrafted crochet pieces, made in small batches." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  return (
    <PageShell>
      <PageHeader
        eyebrow="The collection"
        title="All Products"
        intro="Crochet pieces made slowly, in small batches, by hand."
      />
      <ProductGrid search={search} />
    </PageShell>
  );
}
