import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageShell } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Apne Hath Crochet" },
      {
        name: "description",
        content: "Sign in to Apne Hath Crochet to track orders, save your wishlist and check out faster.",
      },
      { property: "og:title", content: "Sign In — Apne Hath Crochet" },
      { property: "og:description", content: "Track orders, save your wishlist and check out faster." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setStep("otp");
    toast.success("We've sent a 6-digit code to your email");
  };

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }
    toast.success("Signed in ♡ — accounts sync once the studio backend is connected");
  };

  return (
    <PageShell>
      <div className="container-page flex justify-center py-20">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h1 className="font-display text-3xl">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with a one-time code — no password to remember.
          </p>

          {step === "email" ? (
            <form onSubmit={sendOtp} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loginemail">Email address</Label>
                <Input
                  id="loginemail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send me a code
              </Button>
            </form>
          ) : (
            <form onSubmit={verify} className="mt-8 space-y-5">
              <p className="text-sm text-muted-foreground">
                Enter the code we sent to <span className="text-foreground">{email}</span>.
              </p>
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <Button type="submit" size="lg" className="w-full">
                Verify &amp; sign in
              </Button>
              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full text-center text-sm text-muted-foreground underline underline-offset-4"
              >
                Use a different email
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Just browsing?{" "}
            <Link to="/shop" className="text-accent underline underline-offset-4">
              Continue shopping
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
