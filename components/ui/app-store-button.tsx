"use client";

import * as React from "react";
import { Mail, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  variant?: "dark" | "light";
  size?: "md" | "lg";
}

/**
 * "Coming Soon" CTA — replaces the App Store button while the app is unreleased.
 *
 * Clicking opens a single-field email modal that posts to /api/newsletter
 * with source="waitlist". Once the app is live, swap this component back to
 * a real App Store deeplink (see git history for the original).
 */
export function AppStoreButton({ className, variant = "dark", size = "md" }: Props) {
  const [open, setOpen] = React.useState(false);
  const dimensions = size === "lg" ? "h-14 px-7" : "h-12 px-6";
  const colors =
    variant === "dark"
      ? "bg-ink-900 text-cream hover:bg-ink-700"
      : "bg-cream text-ink-900 border border-ink-200 hover:bg-cream-200";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-3 rounded-full transition-colors shadow-soft",
          dimensions,
          colors,
          className
        )}
        data-analytics="waitlist-cta"
        aria-label="Get notified when Mibbles launches"
      >
        <Bell className="w-5 h-5" strokeWidth={1.5} />
        <div className="text-left leading-tight">
          <div className="text-[10px] opacity-70">Coming to iOS</div>
          <div className="text-base font-semibold tracking-tight">Get notified</div>
        </div>
      </button>

      {open && <WaitlistModal onClose={() => setOpen(false)} />}
    </>
  );
}

/* ──────────────────────────────────────────────────────────── */

function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  // Close on escape
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "waitlist" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-cream-50 p-10 shadow-card"
      >
        <Mail className="h-7 w-7 text-terracotta-600 mb-3" strokeWidth={1.5} />
        <h3 className="font-serif text-3xl text-ink-900 mb-2 text-balance">
          {status === "success" ? "You're on the list." : "We'll email you the day we launch."}
        </h3>
        <p className="text-ink-600 mb-6">
          {status === "success"
            ? "We'll send one email when Mibbles is live on the App Store. No spam."
            : "Mibbles is coming to iOS soon. Drop your email and we'll let you know the moment it's live."}
        </p>

        {status !== "success" ? (
          <form onSubmit={submit} className="flex flex-col gap-3">
            <input
              type="email"
              required
              autoFocus
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-full border border-ink-200 bg-cream px-5 text-[15px]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-12 px-6 rounded-full bg-ink-900 text-cream font-medium hover:bg-ink-700 disabled:opacity-60"
            >
              {status === "loading" ? "Adding you..." : "Notify me when Mibbles launches"}
            </button>
            {status === "error" && (
              <p className="text-sm text-terracotta-700">Something went wrong. Try again?</p>
            )}
            <p className="text-xs text-ink-500 text-center mt-1">
              One email. Unsubscribe anytime.
            </p>
          </form>
        ) : (
          <button
            onClick={onClose}
            className="h-12 px-6 rounded-full bg-ink-900 text-cream font-medium hover:bg-ink-700 w-full"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
