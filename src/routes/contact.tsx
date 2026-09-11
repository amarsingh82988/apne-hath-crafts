import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, PageShell } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Apne Hath Crochet" },
      {
        name: "description",
        content:
          "Questions about an order, a custom piece or bulk gifting? Write to the Apne Hath Crochet studio and we will reply within a day.",
      },
      { property: "og:title", content: "Contact Us — Apne Hath Crochet" },
      { property: "og:description", content: "Reach the Apne Hath Crochet studio — we reply within a day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      toast.error("Please tell us your name");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (form.message.trim().length < 10) {
      toast.error("Please add a few more details to your message");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      toast.success("Message sent — we'll reply within 24 hours ♡");
    }, 700);
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Say hello"
        title="Contact the studio"
        intro="Order help, custom pieces, wholesale or just yarn talk — we read every message ourselves."
      />

      <div className="container-page grid gap-12 py-16 md:grid-cols-[1fr_1.2fr] md:py-24">
        <div className="space-y-6">
          {[
            { icon: Mail, label: "Email", value: "hello@apnehathcrochet.in" },
            { icon: Phone, label: "Phone / WhatsApp", value: "+91 98765 43210" },
            { icon: MapPin, label: "Studio", value: "Lucknow, Uttar Pradesh, India" },
            { icon: Clock, label: "Hours", value: "Mon–Sat, 10am – 7pm IST" },
            { icon: Instagram, label: "Instagram", value: "@apnehathcrochet" },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <item.icon className="mt-0.5 size-5 text-accent" />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-7 shadow-soft md:p-9">
          <h2 className="font-display text-2xl">Send us a message</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" value={form.name} onChange={set("name")} placeholder="Aditi Sharma" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" value={form.phone} onChange={set("phone")} placeholder="+91 …" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={form.subject} onChange={set("subject")} placeholder="Order #, custom piece…" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={6} value={form.message} onChange={set("message")} placeholder="Tell us what you have in mind…" />
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={sending}>
            {sending ? "Sending…" : "Send message"}
          </Button>
        </form>
      </div>
    </PageShell>
  );
}
