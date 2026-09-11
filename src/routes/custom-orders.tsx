import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader, PageShell } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import hero from "@/assets/hero-crochet.jpg";

export const Route = createFileRoute("/custom-orders")({
  head: () => ({
    meta: [
      { title: "Custom Crochet Orders — Apne Hath Crochet" },
      {
        name: "description",
        content:
          "Commission a one-of-a-kind crochet piece: bridal bouquets, pet replicas, baby gifts and corporate hampers, made to your colours and deadline.",
      },
      { property: "og:title", content: "Custom Crochet Orders — Apne Hath Crochet" },
      {
        property: "og:description",
        content: "Bridal bouquets, pet replicas, baby gifts and hampers, crocheted to your brief.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomOrdersPage,
});

const steps = [
  { n: "01", t: "Share your idea", d: "Fill the brief with colours, size, budget and the date you need it by." },
  { n: "02", t: "Sketch & quote", d: "Within 48 hours we send a reference sketch, yarn palette and a final price." },
  { n: "03", t: "We crochet it", d: "Once you approve and pay 50% advance, your piece goes on the hook." },
  { n: "04", t: "Photos & dispatch", d: "You see photos before it ships. Pay the balance and it is on its way." },
];

function CustomOrdersPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    budget: "",
    deadline: "",
    colors: "",
    details: "",
  });
  const [sending, setSending] = useState(false);

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Please tell us your name");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return toast.error("Please enter a valid email address");
    if (!form.type) return toast.error("Please choose what you'd like made");
    if (form.details.trim().length < 15) return toast.error("Please describe your idea in a little more detail");
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", phone: "", type: "", budget: "", deadline: "", colors: "", details: "" });
      toast.success("Request received — we'll send a sketch and quote within 48 hours ♡");
    }, 800);
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Made just for you"
        title="Custom crochet orders"
        intro="If you can picture it, we can probably crochet it — in your colours, your size, for your occasion."
      />

      <section className="container-page grid items-center gap-12 py-16 md:grid-cols-2">
        <img
          src={hero}
          alt="Custom crochet flower bouquet in warm neutral yarn tones"
          className="rounded-3xl object-cover shadow-soft"
          loading="lazy"
        />
        <div>
          <h2 className="font-display text-3xl md:text-4xl">How it works</h2>
          <ol className="mt-8 space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-display text-2xl text-accent">{s.n}</span>
                <div>
                  <p className="font-medium">{s.t}</p>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40 py-16 md:py-24">
        <div className="container-page max-w-3xl">
          <p className="eyebrow text-center">The brief</p>
          <h2 className="mt-3 text-center font-display text-3xl md:text-4xl">Tell us what you'd love</h2>
          <form onSubmit={submit} className="mt-10 rounded-3xl border border-border bg-card p-7 shadow-soft md:p-9">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cname">Your name</Label>
                <Input id="cname" value={form.name} onChange={set("name")} placeholder="Aditi Sharma" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cemail">Email</Label>
                <Input id="cemail" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cphone">Phone / WhatsApp</Label>
                <Input id="cphone" value={form.phone} onChange={set("phone")} placeholder="+91 …" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctype">What would you like made?</Label>
                <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                  <SelectTrigger id="ctype">
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Bridal / event bouquet",
                      "Amigurumi toy or pet replica",
                      "Bag or tote",
                      "Home decor",
                      "Baby gift set",
                      "Bulk / corporate gifting",
                      "Something else",
                    ].map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cbudget">Budget (₹)</Label>
                <Input id="cbudget" value={form.budget} onChange={set("budget")} placeholder="2000 – 4000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cdeadline">Needed by</Label>
                <Input id="cdeadline" type="date" value={form.deadline} onChange={set("deadline")} />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="ccolors">Colour palette</Label>
              <Input id="ccolors" value={form.colors} onChange={set("colors")} placeholder="Ivory, dusty rose, sage" />
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="cdetails">Describe your idea</Label>
              <Textarea
                id="cdetails"
                rows={6}
                value={form.details}
                onChange={set("details")}
                placeholder="Size, quantity, occasion, any reference you have in mind…"
              />
            </div>
            <Button type="submit" size="lg" className="mt-6 w-full" disabled={sending}>
              {sending ? "Sending…" : "Request a quote"}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No payment now. We'll only ask for an advance once you approve the sketch.
            </p>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
