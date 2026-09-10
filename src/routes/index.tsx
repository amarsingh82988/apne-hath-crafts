import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gift, HandHeart, PackageCheck, Sparkles, Star } from "lucide-react";
import { PageShell } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { categories, products, testimonials } from "@/data/catalog";
import heroImage from "@/assets/hero-crochet.jpg";
import storyImage from "@/assets/story-hands.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apne Hath Crochet — Handmade Crochet Gifts & Decor" },
      {
        name: "description",
        content:
          "Beautiful crochet creations, thoughtfully handcrafted in small batches. Bouquets, bags, plushies, keychains and custom crochet orders.",
      },
      { property: "og:title", content: "Apne Hath Crochet — Made by Hand, Made with Love" },
      {
        property: "og:description",
        content: "Handcrafted crochet bouquets, bags, plushies and custom pieces made just for you.",
      },
    ],
  }),
  component: Home,
});

const benefits = [
  { icon: HandHeart, title: "Handmade with Love", text: "Every stitch worked by hand, never machine-made." },
  { icon: Sparkles, title: "Premium Materials", text: "Soft, long-lasting cotton and milk-cotton yarns." },
  { icon: PackageCheck, title: "Carefully Packed", text: "Gift-ready packaging with a handwritten note." },
  { icon: Gift, title: "Made for You", text: "Colours, sizes and details customised on request." },
];

function Home() {
  const bestsellers = products.filter((p) => p.bestseller || p.featured).slice(0, 4);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container-page grid items-center gap-12 py-14 md:grid-cols-2 md:py-24">
          <div>
            <p className="eyebrow">Handcrafted with patience</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
              Made by Hand,
              <br />
              Made with Love.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Beautiful crochet creations, thoughtfully handcrafted to add a little more warmth to everyday
              life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/shop">Shop Collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">Explore Handmade</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-accent text-accent" /> 4.9 average rating
              </span>
              <span>1,200+ happy homes</span>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-lift)]">
              <img
                src={heroImage}
                alt="Handmade crochet sunflower bouquet, tote bag and teddy bear on cream linen"
                width={1600}
                height={1104}
                className="size-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-2xl border border-border bg-card px-5 py-3 shadow-[var(--shadow-soft)] md:-left-6">
              <p className="font-display text-lg">Made slowly. Loved deeply.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-20">
        <SectionHead
          eyebrow="Browse"
          title="Featured Categories"
          intro="From forever bouquets to everyday totes — find the piece that feels like you."
        />
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 7).map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <div className="aspect-square overflow-hidden bg-secondary">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={900}
                  height={900}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg">{c.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-secondary/40 py-20">
        <div className="container-page">
          <SectionHead eyebrow="Loved most" title="Best Sellers" intro="The pieces our customers keep coming back for." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/shop">
                View all products <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container-page py-20">
        <SectionHead eyebrow="Why us" title="Why Apne Hath Crochet?" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary">
                <b.icon className="size-5 text-accent" />
              </div>
              <h3 className="mt-4 font-display text-lg">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="bg-secondary/40 py-20">
        <div className="container-page grid items-center gap-12 md:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-soft)]">
            <img
              src={storyImage}
              alt="Hands crocheting a cream flower with a wooden hook"
              loading="lazy"
              width={1200}
              height={912}
              className="size-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 font-display text-4xl">The hands behind the hooks</h2>
            <p className="mt-5 text-muted-foreground">
              Apne Hath Crochet began at a kitchen table with one ball of cream cotton and a wooden hook. What
              started as a way to slow down became a small studio where every bouquet, bag and bear is worked
              row by row, by hand.
            </p>
            <p className="mt-3 text-muted-foreground">
              We make in small batches on purpose. It takes longer, but it means each piece leaves our hands
              only when it feels right — the way something made for someone you love should.
            </p>
            <Button asChild variant="outline" className="mt-7">
              <Link to="/about">Read our story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Custom orders CTA */}
      <section className="container-page py-20">
        <div className="rounded-[2rem] border border-border bg-card px-8 py-16 text-center shadow-[var(--shadow-soft)]">
          <p className="eyebrow">Custom crochet</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Want Something Made Just for You?</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Tell us the colours, the size and the story behind it. We'll crochet a one-of-a-kind piece, just
            for you.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/custom-orders">Request Custom Order</Link>
          </Button>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-secondary/40 py-20">
        <div className="container-page">
          <SectionHead eyebrow="Kind words" title="Customer Reviews" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-5 text-sm font-medium">
                  {t.name} <span className="text-muted-foreground">· {t.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="container-page py-20">
        <SectionHead eyebrow="@apnehathcrochet" title="From our studio" intro="Follow along for works in progress and new drops." />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <div key={p.id} className="aspect-square overflow-hidden rounded-2xl border border-border bg-secondary">
              <img
                src={p.featuredImage}
                alt={p.name}
                loading="lazy"
                width={900}
                height={900}
                className="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl">{title}</h2>
      {intro && <p className="mx-auto mt-3 max-w-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}
