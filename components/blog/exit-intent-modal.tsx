"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Newsletter } from "@/components/marketing/newsletter";

const STORAGE_KEY = "mibbles-exit-intent-shown";

export function ExitIntentModal() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return; // desktop only
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setOpen(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
        document.removeEventListener("mouseout", handler);
      }
    };
    // 4-second delay before we start listening — don't ambush new visitors
    const timeout = window.setTimeout(() => {
      document.addEventListener("mouseout", handler);
    }, 4000);

    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("mouseout", handler);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-6"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-cream-50 p-10 shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 text-ink-500 hover:text-ink-900"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="text-xs font-medium uppercase tracking-widest text-terracotta-600 mb-3">
          Before you go
        </div>
        <h3 className="font-serif text-3xl text-ink-900 mb-3 text-balance">
          One cat wellness tip a week. Worth opening.
        </h3>
        <p className="text-ink-600 mb-6">
          Short, science-backed. Read in three minutes. Unsubscribe whenever.
        </p>
        <Newsletter source="exit-intent" />
      </div>
    </div>
  );
}
