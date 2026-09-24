"use client";

import * as React from "react";
import Image from "next/image";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { cn } from "@/lib/utils";

/**
 * Sticky download bar — appears on mobile only, after the user has scrolled
 * past the hero. Quietly disappears at the very top of the page.
 */
export function StickyAppCTA() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handle = () => setVisible(window.scrollY > 600);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed bottom-4 left-4 right-4 z-40 md:hidden transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      )}
    >
      <div className="rounded-full bg-cream-50 border border-ink-100 shadow-card flex items-center justify-between gap-3 pl-4 pr-1.5 py-1.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image src="/images/app-icon.png" alt="" width={40} height={40} className="rounded-[11px]" />
          <div className="min-w-0 text-sm leading-tight">
            <div className="font-medium text-ink-900">Mibbles</div>
            <div className="truncate text-xs text-ink-500">Mental wellness for your cat</div>
          </div>
        </div>
        <AppStoreButton size="md" />
      </div>
    </div>
  );
}
