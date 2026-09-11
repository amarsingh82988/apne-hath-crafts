import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { findOrder, type Order } from "@/store/orders";

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (search: Record<string, unknown>) => ({
    order: typeof search['order'] === "string" ? search['order'] : "",
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — Apne Hath Crochet" },
      { name: "description", content: "Thank you for your handmade crochet order." },
      { property: "og:title", content: "Order Confirmed — Apne Hath Crochet" },
      { property: "og:description", content: "Thank you for your handmade crochet order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmationPage,
});

function OrderConfirmationPage() {
  const { order: orderId } = Route.useSearch();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrder(findOrder(orderId) ?? null);
  }, [orderId]);

  return (
    <PageShell>
      <div className="container-page max-w-2xl py-20 text-center">
        <CheckCircle2 className="mx-auto size-14 text-accent" />
        <h1 className="mt-6 font-display text-4xl">Thank you ♡</h1>
        <p className="mt-3 text-muted-foreground">
          Your order is confirmed. We've emailed the details and will message you the moment it ships.
        </p>

        {orderId && (
          <p className="mt-6 inline-block rounded-full border border-border bg-secondary/60 px-5 py-2 text-sm">
            Order number <span className="font-medium">{orderId}</span>
          </p>
        )}

        {order && (
          <div className="mt-10 rounded-3xl border border-border bg-card p-7 text-left shadow-soft">
            <h2 className="font-display text-xl">What's on the hook</h2>
            <div className="mt-5 space-y-3">
              {order.items.map((it) => (
                <div key={`${it.productId}-${it.color}-${it.size}`} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {it.title} × {it.qty}
                  </span>
                  <span>{formatINR(it.price * it.qty)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-border pt-3 font-medium">
                <span>Total paid</span>
                <span>{formatINR(order.total)}</span>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Shipping to {order.customer.name}, {order.customer.address}, {order.customer.city}{" "}
              {order.customer.pin}
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/shop">Keep shopping</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to="/track-order">Track this order</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
