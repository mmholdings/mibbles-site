"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { AppStoreButton } from "@/components/ui/app-store-button";

export function Nav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-ink-100"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Mibbles home">
            <div className="h-8 w-8 rounded-xl bg-ink-900 flex items-center justify-center group-hover:bg-terracotta-500 transition-colors">
              {/* Replace with /public/logo.svg when you have it */}
              <span className="text-cream font-serif text-base font-semibold">M</span>
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[15px] text-ink-700 hover:text-ink-900 transition-colors",
                  pathname?.startsWith(item.href) && "text-ink-900 font-medium"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <AppStoreButton size="md" />
          </div>

          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-ink-900"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-ink-100 bg-cream">
          <nav className="px-5 py-6 flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-lg font-serif text-ink-900"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <AppStoreButton size="md" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
