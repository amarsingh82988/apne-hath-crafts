import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/site/Layout";
import { ProductGrid, type ShopSearch } from "@/components/site/ProductGrid";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search — Apne Hath Crochet" },
      { name: "description", content: "Search handmade crochet bouquets, bags, plushies and accessories." },
      { property: "og:title", content: "Search — Apne Hath Crochet" },
      { property: "og:description", content: "Find the handmade crochet piece you're looking for." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const search = Route.useSearch();
  return (
    <PageShell>
      <PageHeader
        eyebrow="Search"
        title={search.q ? `Results for "${search.q}"` : "Search"}
        intro="Looking for something specific? Start typing in the search bar above."
      />
      <ProductGrid search={search} />
    </PageShell>
  );
}
