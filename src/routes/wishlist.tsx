import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { productById, useShop } from "@/store/shop";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Apne Hath Crochet" },
      { name: "description", content: "The handmade crochet pieces you've saved for later." },
      { property: "og:title", content: "Wishlist — Apne Hath Crochet" },
      { property: "og:description", content: "Your saved handmade crochet pieces." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = wishlist.map(productById).filter(Boolean);

  return (
    <PageShell>
      <PageHeader eyebrow="Saved" title="Your Wishlist" intro="Pieces you've kept an eye on." />
      <div className="container-page py-12">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="font-display text-2xl">Nothing saved yet</p>
            <p className="mt-2 text-sm text-muted-foreground">Tap the heart on any piece to save it here.</p>
            <Button asChild className="mt-6">
              <Link to="/shop">Browse the collection</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => p && <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </PageShell>
  );
}
