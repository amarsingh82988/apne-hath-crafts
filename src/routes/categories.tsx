import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/site/Layout";
import { categories, products } from "@/data/catalog";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Apne Hath Crochet" },
      {
        name: "description",
        content: "Shop crochet flowers, bags, keychains, plushies, home decor, accessories and custom orders.",
      },
      { property: "og:title", content: "Shop by Category — Apne Hath Crochet" },
      { property: "og:description", content: "Find your favourite kind of handmade crochet." },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <PageShell>
      <PageHeader eyebrow="Browse" title="Categories" intro="Every collection, made by hand in small batches." />
      <div className="container-page grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.slug).length;
          return (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={900}
                  height={675}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h2 className="font-display text-xl">{c.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
                  {count} {count === 1 ? "piece" : "pieces"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
