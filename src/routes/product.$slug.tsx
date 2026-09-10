import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";
import { getProduct, products, testimonials } from "@/data/catalog";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Apne Hath Crochet" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Apne Hath Crochet` },
        { name: "description", content: product.shortDescription },
        { property: "og:title", content: `${product.name} — Apne Hath Crochet` },
        { property: "og:description", content: product.shortDescription },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, inWishlist } = useShop();
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const outOfStock = product.stock <= 0;
  const wished = inWishlist(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const add = () => {
    addToCart({ productId: product.id, qty, color, size, note: note.trim() || undefined });
    toast.success("Added to your cart ♡");
  };

  return (
    <PageShell>
      <div className="container-page py-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/shop" className="hover:text-accent">
            Shop
          </Link>{" "}
          / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-secondary">
              <img
                src={product.images[activeImage] ?? product.featuredImage}
                alt={product.name}
                width={900}
                height={1100}
                className="size-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "size-20 overflow-hidden rounded-xl border-2",
                      i === activeImage ? "border-accent" : "border-border",
                    )}
                  >
                    <img src={img} alt="" loading="lazy" className="size-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="eyebrow">{product.sku}</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">{product.name}</h1>

            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn("size-4", i < Math.round(product.rating) && "fill-accent text-accent")}
                  />
                ))}
              </span>
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-semibold">{formatINR(product.price)}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatINR(product.compareAtPrice)}
                  </span>
                  <span className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground">
                    {Math.round(100 - (product.price / product.compareAtPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 text-muted-foreground">{product.description}</p>

            <p className="mt-5 text-sm">
              {outOfStock ? (
                <span className="text-destructive">Currently unavailable</span>
              ) : product.stock <= 5 ? (
                <span className="text-accent">Only {product.stock} left — made to order after that</span>
              ) : (
                <span className="text-muted-foreground">In stock, ready to ship</span>
              )}
            </p>

            {product.colors.length > 0 && (
              <OptionRow label="Colour" options={product.colors} value={color} onChange={setColor} />
            )}
            {product.sizes.length > 1 && (
              <OptionRow label="Size" options={product.sizes} value={size} onChange={setSize} />
            )}

            {product.customizable && (
              <div className="mt-7">
                <p className="eyebrow">Make it yours</p>
                <Textarea
                  className="mt-3"
                  rows={3}
                  maxLength={300}
                  placeholder="Add your customization request — a name, a colour, a note for the card…"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            )}

            <div className="mt-7 flex items-center gap-4">
              <div className="flex items-center rounded-full border border-border">
                <button
                  aria-label="Decrease quantity"
                  className="p-3 disabled:opacity-40"
                  disabled={qty <= 1}
                  onClick={() => setQty((q) => q - 1)}
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button
                  aria-label="Increase quantity"
                  className="p-3 disabled:opacity-40"
                  disabled={qty >= product.stock}
                  onClick={() => setQty((q) => q + 1)}
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <Button
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                variant="outline"
                size="icon"
                className="size-12 rounded-full"
                onClick={() => {
                  toggleWishlist(product.id);
                  toast.success(wished ? "Removed from wishlist" : "Saved to your wishlist ♡");
                }}
              >
                <Heart className={cn("size-5", wished && "fill-accent text-accent")} />
              </Button>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1" disabled={outOfStock} onClick={add}>
                {outOfStock ? "Currently unavailable" : "Add to Cart"}
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1" disabled={outOfStock}>
                <Link to="/checkout" onClick={add}>
                  Buy Now
                </Link>
              </Button>
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="size-4" /> Ships in {product.estimatedDelivery}
            </p>

            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem value="materials">
                <AccordionTrigger>Materials</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{product.materials}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger>Care instructions</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{product.careInstructions}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping &amp; returns</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Dispatched in {product.estimatedDelivery}. Free shipping on orders above ₹1,499. Returns
                  accepted within 7 days for non-customised pieces.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="font-display text-3xl">Reviews</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm text-muted-foreground">"{t.text}"</blockquote>
                <figcaption className="mt-4 text-sm font-medium">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-3xl">You may also love</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
}

function OptionRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-7">
      <p className="eyebrow">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              value === o ? "border-accent bg-accent text-accent-foreground" : "border-border hover:bg-secondary",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
