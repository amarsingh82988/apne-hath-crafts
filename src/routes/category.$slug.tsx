import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/site/Layout";
import { ProductGrid } from "@/components/site/ProductGrid";
import { categories } from "@/data/catalog";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — Apne Hath Crochet" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    return {
      meta: [
        { title: `${category.name} — Apne Hath Crochet` },
        { name: "description", content: category.description },
        { property: "og:title", content: `${category.name} — Apne Hath Crochet` },
        { property: "og:description", content: category.description },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  return (
    <PageShell>
      <PageHeader eyebrow="Category" title={category.name} intro={category.description} />
      <ProductGrid search={{}} lockedCategory={category.slug} />
    </PageShell>
  );
}
