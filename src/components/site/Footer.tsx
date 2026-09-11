import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const columns = [
  {
    title: "Shop",
    links: [
      { to: "/shop", label: "All Products" },
      { to: "/shop", label: "New Arrivals", search: { sort: "newest" } },
      { to: "/shop", label: "Best Sellers", search: { sort: "bestselling" } },
      { to: "/custom-orders", label: "Custom Orders" },
    ],
  },
  {
    title: "Help",
    links: [
      { to: "/contact", label: "Contact" },
      { to: "/faq", label: "FAQ" },
      { to: "/shipping-policy", label: "Shipping" },
      { to: "/return-policy", label: "Returns" },
      { to: "/track-order", label: "Track Order" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/about", label: "Our Story" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms" },
      { to: "/return-policy", label: "Refund Policy" },
    ],
  },
] as const;

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="max-w-sm">
          <p className="font-display text-2xl">Apne Hath Crochet</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Little things, made by hand. Every piece is crocheted slowly in small batches, in our home studio.
          </p>
          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) {
                toast.error("Please enter a valid email address");
                return;
              }
              setEmail("");
              toast.success("You're on the list ♡");
            }}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email address"
            />
            <Button type="submit" variant="secondary">
              Join
            </Button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">
            Get cozy updates, new drops &amp; exclusive offers.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="eyebrow">{col.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    {...("search" in l ? { search: l.search as never } : {})}
                    className="text-muted-foreground transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-page flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Apne Hath Crochet. Made slowly, loved deeply.</p>
        <div className="flex gap-5">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-accent">
            Instagram
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-accent">
            Facebook
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-accent">
            Pinterest
          </a>
        </div>
      </div>
    </footer>
  );
}
