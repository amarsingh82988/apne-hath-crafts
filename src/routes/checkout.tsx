import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, PageShell } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatINR } from "@/lib/format";
import { productById, useShop } from "@/store/shop";
import { newOrderId, saveOrder } from "@/store/orders";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Apne Hath Crochet" },
      { name: "description", content: "Securely complete your handmade crochet order." },
      { property: "og:title", content: "Checkout — Apne Hath Crochet" },
      { property: "og:description", content: "Securely complete your handmade crochet order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, subtotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<"prepaid" | "cod">("prepaid");
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    notes: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const shipping = subtotal >= 1499 ? 0 : 79;
  const codFee = payment === "cod" ? 49 : 0;
  const total = subtotal + shipping + codFee;

  if (cart.length === 0) {
    return (
      <PageShell>
        <PageHeader eyebrow="Checkout" title="Nothing to check out yet" intro="Your cart is empty." />
        <div className="container-page py-20 text-center">
          <Button asChild size="lg">
            <Link to="/shop">Shop the collection</Link>
          </Button>
        </div>
      </PageShell>
    );
  }

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      toast.error("Please enter your full name");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10))) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (form.address.trim().length < 8) {
      toast.error("Please enter your full address");
      return;
    }
    if (!/^\d{6}$/.test(form.pin)) {
      toast.error("Please enter a valid 6-digit PIN code");
      return;
    }

    setPlacing(true);
    const id = newOrderId();
    setTimeout(() => {
      saveOrder({
        id,
        createdAt: new Date().toISOString(),
        status: "confirmed",
        items: cart.map((line) => {
          const p = productById(line.productId);
          return {
            ...line,
            title: p?.name ?? "Handmade piece",
            price: p?.price ?? 0,
            image: p?.images[0] ?? "",
          };
        }),
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pin: form.pin,
        },
        payment,
        subtotal,
        discount: 0,
        shipping: shipping + codFee,
        total,
      });
      clearCart();
      setPlacing(false);
      void navigate({ to: "/order-confirmation", search: { order: id } });
    }, 900);
  };

  return (
    <PageShell>
      <PageHeader eyebrow="Almost yours" title="Checkout" intro="Tell us where to send your handmade parcel." />

      <form onSubmit={placeOrder} className="container-page grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <section className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="font-display text-2xl">Delivery details</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="fname">Full name</Label>
                <Input id="fname" value={form.name} onChange={set("name")} placeholder="Aditi Sharma" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="femail">Email</Label>
                <Input id="femail" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fphone">Mobile number</Label>
                <Input id="fphone" value={form.phone} onChange={set("phone")} placeholder="98765 43210" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="faddr">Address</Label>
                <Textarea id="faddr" rows={3} value={form.address} onChange={set("address")} placeholder="House / flat, street, landmark" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fcity">City</Label>
                <Input id="fcity" value={form.city} onChange={set("city")} placeholder="Lucknow" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fstate">State</Label>
                <Input id="fstate" value={form.state} onChange={set("state")} placeholder="Uttar Pradesh" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fpin">PIN code</Label>
                <Input id="fpin" value={form.pin} onChange={set("pin")} placeholder="226001" maxLength={6} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="fnotes">Order notes (optional)</Label>
                <Textarea id="fnotes" rows={2} value={form.notes} onChange={set("notes")} placeholder="Gift wrap, a message to add…" />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="font-display text-2xl">Payment</h2>
            <RadioGroup
              value={payment}
              onValueChange={(v) => setPayment(v as "prepaid" | "cod")}
              className="mt-6 space-y-3"
            >
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border p-4">
                <RadioGroupItem value="prepaid" id="pay-prepaid" className="mt-1" />
                <span>
                  <span className="block font-medium">UPI, cards, net banking &amp; wallets</span>
                  <span className="block text-sm text-muted-foreground">
                    Secure payment. Free shipping over ₹1,499.
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border p-4">
                <RadioGroupItem value="cod" id="pay-cod" className="mt-1" />
                <span>
                  <span className="block font-medium">Cash on delivery</span>
                  <span className="block text-sm text-muted-foreground">Additional ₹49 handling fee.</span>
                </span>
              </label>
            </RadioGroup>
            <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-accent" /> Your details are only used to deliver this order.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-3xl border border-border bg-card p-7 shadow-soft lg:sticky lg:top-24">
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="mt-6 space-y-4">
            {cart.map((line) => {
              const p = productById(line.productId);
              if (!p) return null;
              return (
                <div key={`${line.productId}-${line.color}-${line.size}`} className="flex gap-3">
                  <img src={p.images[0]} alt={p.name} className="size-16 rounded-xl object-cover" loading="lazy" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-muted-foreground">
                      Qty {line.qty}
                      {line.color ? ` · ${line.color}` : ""}
                      {line.size ? ` · ${line.size}` : ""}
                    </p>
                  </div>
                  <p className="text-sm">{formatINR(p.price * line.qty)}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
            <Row label="Subtotal" value={formatINR(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
            {codFee > 0 && <Row label="COD handling" value={formatINR(codFee)} />}
            <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full" disabled={placing}>
            <Lock className="size-4" />
            {placing ? "Placing order…" : `Place order · ${formatINR(total)}`}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            By ordering you agree to our{" "}
            <Link to="/terms" className="underline underline-offset-4">
              terms
            </Link>
            .
          </p>
        </aside>
      </form>
    </PageShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
