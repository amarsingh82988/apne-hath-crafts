import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, PageShell } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatINR } from "@/lib/format";
import { productById, useShop } from "@/store/shop";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Apne Hath Crochet" },
      { name: "description", content: "Review the handmade crochet pieces in your cart before checkout." },
      { property: "og:title", content: "Your Cart — Apne Hath Crochet" },
      { property: "og:description", content: "Review your handmade crochet pieces." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

const COUPONS: Record<string, { type: "percent" | "flat"; value: number }> = {
  HANDMADE10: { type: "percent", value: 10 },
  COZY200: { type: "flat", value: 200 },
};

function CartPage() {
  const { cart, updateQty, removeLine, subtotal } = useShop();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; amount: number } | null>(null);

  const discount = applied?.amount ?? 0;
  const shipping = subtotal === 0 || subtotal >= 1499 ? 0 : 79;
  const total = Math.max(0, subtotal - discount) + shipping;

  const applyCoupon = () => {
    const c = COUPONS[code.trim().toUpperCase()];
    if (!c) {
      toast.error("That coupon code isn't valid");
      return;
    }
    const amount = c.type === "percent" ? Math.round((subtotal * c.value) / 100) : c.value;
    setApplied({ code: code.trim().toUpperCase(), amount });
    toast.success("Coupon applied ♡");
  };

  if (cart.length === 0) {
    return (
      <PageShell>
        <PageHeader eyebrow="Your cart" title="Your cart is empty" intro="Little things, made by hand — go find yours." />
        <div className="container-page py-20 text-center">
          <Button asChild size="lg">
            <Link to="/shop">Shop the collection</Link>
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader eyebrow="Your cart" title="Shopping Cart" />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.map((line, i) => {
            const p = productById(line.productId);
            if (!p) return null;
            return (
              <div key={`${line.productId}-${i}`} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                <Link to="/product/$slug" params={{ slug: p.slug }} className="size-24 shrink-0 overflow-hidden rounded-xl bg-secondary">
                  <img src={p.featuredImage} alt={p.name} loading="lazy" className="size-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-lg leading-tight">{p.name}</h2>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {[line.color, line.size].filter(Boolean).join(" · ")}
                      </p>
                      {line.note && <p className="mt-1 text-xs text-muted-foreground italic">"{line.note}"</p>}
                    </div>
                    <button aria-label="Remove item" onClick={() => removeLine(i)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-border">
                      <button aria-label="Decrease" className="p-2 disabled:opacity-40" disabled={line.qty <= 1} onClick={() => updateQty(i, line.qty - 1)}>
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm">{line.qty}</span>
                      <button
                        aria-label="Increase"
                        className="p-2 disabled:opacity-40"
                        disabled={line.qty >= p.stock}
                        onClick={() => {
                          if (line.qty >= p.stock) return;
                          updateQty(i, line.qty + 1);
                        }}
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <span className="font-medium">{formatINR(p.price * line.qty)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl">Order summary</h2>
          <div className="mt-5 flex gap-2">
            <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" />
            <Button variant="secondary" onClick={applyCoupon}>
              Apply
            </Button>
          </div>
          <dl className="mt-6 space-y-2.5 text-sm">
            <Row label="Subtotal" value={formatINR(subtotal)} />
            {applied && <Row label={`Discount (${applied.code})`} value={`−${formatINR(discount)}`} />}
            <Row label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
            <div className="stitch-rule my-3" />
            <div className="flex justify-between text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatINR(total)}</dd>
            </div>
          </dl>
          <Button asChild size="lg" className="mt-6 w-full">
            <Link to="/checkout">Proceed to Checkout</Link>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Free shipping on orders above ₹1,499</p>
        </aside>
      </div>
    </PageShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <dt>{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
