"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { isLocale, messages, type Locale } from "@/lib/i18n/site";

const languageOptions: { locale: "en" | Locale; code: string; name: string }[] = [
  { locale: "en", code: "EN", name: "English" },
  { locale: "de", code: "DE", name: "Deutsch" },
  { locale: "fr", code: "FR", name: "Français" },
  { locale: "es-419", code: "ES", name: "Español (Latinoamérica)" },
  { locale: "pt-BR", code: "PT", name: "Português (Brasil)" },
  { locale: "ja", code: "JA", name: "日本語" },
];

export function Nav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const firstSegment = pathname?.split("/")[1] ?? "";
  const activeLocale = isLocale(firstSegment) ? firstSegment : "en";
  const basePath = isLocale(firstSegment) ? pathname?.slice(firstSegment.length + 1) || "/" : pathname || "/";
  const navLabels = activeLocale === "en" ? siteConfig.nav.map((item) => item.label) : messages[activeLocale].nav;
  const selectedLanguage = languageOptions.find((option) => option.locale === activeLocale) ?? languageOptions[0];

  function changeLanguage(locale: string) {
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;samesite=lax`;
    const path = basePath.startsWith("/blog") || ["/support", "/privacy", "/terms", "/contact"].some((prefix) => basePath.startsWith(prefix))
      ? "/"
      : basePath;
    window.location.assign(locale === "en" ? path : `/${locale}${path === "/" ? "" : path}`);
  }

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
          <Link href={activeLocale === "en" ? "/" : `/${activeLocale}`} className="group" aria-label="Mibbles home">
            <Image
              src="/images/mibbles-wordmark.webp"
              alt="Mibbles"
              width={1987}
              height={607}
              priority
              className="h-9 w-auto transition-transform duration-300 group-hover:scale-[1.02] md:h-10"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item, index) => {
              const href = activeLocale === "en" || index === 2 ? item.href : `/${activeLocale}${item.href}`;
              return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "text-[15px] text-ink-700 hover:text-ink-900 transition-colors",
                  pathname?.startsWith(item.href) && "text-ink-900 font-medium"
                )}
              >
                {navLabels[index]}
              </Link>
            );})}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher
              selected={selectedLanguage}
              label={activeLocale === "en" ? "Language" : messages[activeLocale].common.language}
              onSelect={changeLanguage}
            />
            <AppStoreButton size="md" label={activeLocale === "en" ? undefined : messages[activeLocale].download.cta} />
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
            <LanguageSwitcher
              selected={selectedLanguage}
              label={activeLocale === "en" ? "Language" : messages[activeLocale].common.language}
              onSelect={changeLanguage}
              mobile
            />
            {siteConfig.nav.map((item, index) => (
              <Link
                key={item.href}
                href={activeLocale === "en" || index === 2 ? item.href : `/${activeLocale}${item.href}`}
                className="py-3 text-lg font-serif text-ink-900"
              >
                {navLabels[index]}
              </Link>
            ))}
            <div className="pt-4">
              <AppStoreButton size="md" label={activeLocale === "en" ? undefined : messages[activeLocale].download.cta} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function LanguageSwitcher({
  selected,
  label,
  onSelect,
  mobile = false,
}: {
  selected: (typeof languageOptions)[number];
  label: string;
  onSelect: (locale: string) => void;
  mobile?: boolean;
}) {
  return (
    <details className={`group relative ${mobile ? "mb-3 w-full" : ""}`}>
      <summary
        aria-label={`${label}: ${selected.name}`}
        className={`flex cursor-pointer list-none items-center gap-2 rounded-full border border-ink-200 text-ink-800 outline-none transition hover:bg-white focus-visible:ring-2 focus-visible:ring-terracotta-500 [&::-webkit-details-marker]:hidden ${mobile ? "w-full justify-between bg-white/70 px-4 py-3" : "px-3 py-2 text-sm"}`}
      >
        <span className="flex items-center gap-2">
          <Globe2 aria-hidden="true" className="h-[18px] w-[18px] text-ink-600" strokeWidth={1.8} />
          {mobile && <span className="text-base">{label}</span>}
          <span className="font-semibold tracking-wide">{selected.code}</span>
        </span>
        <ChevronDown aria-hidden="true" className="h-4 w-4 text-ink-500 transition-transform group-open:rotate-180" />
      </summary>
      <div className={`absolute z-[60] mt-2 min-w-56 overflow-hidden rounded-2xl border border-ink-100 bg-white p-1.5 shadow-card ${mobile ? "left-0 right-0" : "right-0"}`}>
        <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[.12em] text-ink-500">{label}</p>
        {languageOptions.map((option) => (
          <button
            key={option.locale}
            type="button"
            onClick={() => onSelect(option.locale)}
            aria-current={option.locale === selected.locale ? "true" : undefined}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-cream-100 ${option.locale === selected.locale ? "font-semibold text-terracotta-800" : "text-ink-800"}`}
          >
            <span>{option.name}</span>
            <span className="text-xs text-ink-500">{option.code}</span>
          </button>
        ))}
      </div>
    </details>
  );
}
