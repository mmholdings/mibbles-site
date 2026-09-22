"use client";

import { useEffect, useMemo, useState } from "react";
import { Apple, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Platform = "ios" | "android";
type StoreLocation = "hero" | "bottom_cta";

interface StoreButtonsProps {
  appleUrl: string;
  googlePlayUrl: string;
  location: StoreLocation;
  compact?: boolean;
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function GooglePlayMark() {
  return (
    <svg viewBox="0 0 32 36" aria-hidden="true" className="h-8 w-8 shrink-0">
      <path fill="#34A853" d="M2.1 1.7A3.7 3.7 0 0 0 1 4.4v27.2c0 1 .4 2 1.1 2.7l.2.2 15.3-15.3v-.4L2.3 1.5l-.2.2Z" />
      <path fill="#FBBC04" d="m22.7 24.3-5.1-5.1v-.4l5.1-5.1.1.1 6.1 3.5c1.7 1 1.7 2.6 0 3.6l-6.2 3.4Z" />
      <path fill="#EA4335" d="m22.8 24.2-5.2-5.2L2.1 34.4c.6.6 1.6.7 2.7.1l18-10.3Z" />
      <path fill="#4285F4" d="M22.8 13.8 4.8 3.5c-1.1-.6-2.1-.5-2.7.1L17.6 19l5.2-5.2Z" />
    </svg>
  );
}

export function StoreButtons({ appleUrl, googlePlayUrl, location, compact = false }: StoreButtonsProps) {
  const [device, setDevice] = useState<"ios" | "android" | "desktop">("desktop");

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    if (/Android/i.test(ua)) setDevice("android");
    else if (/iPhone|iPad|iPod/i.test(ua) || isIPadOS) setDevice("ios");
  }, []);

  const stores = useMemo(
    () => [
      { platform: "ios" as const, href: appleUrl, eyebrow: "Download on the", label: "App Store" },
      { platform: "android" as const, href: googlePlayUrl, eyebrow: "Get it on", label: "Google Play" },
    ].sort((a, b) => {
      if (device === "desktop") return 0;
      return a.platform === device ? -1 : b.platform === device ? 1 : 0;
    }),
    [appleUrl, device, googlePlayUrl]
  );

  const track = (platform: Platform) => {
    const event = platform === "ios" ? "app_store_click" : "google_play_click";
    const props = { platform, location };
    window.plausible?.(event, { props });
    window.gtag?.("event", event, props);
  };

  return (
    <div className={cn("grid gap-3", compact && "min-[410px]:grid-cols-2")}>
      {stores.map((store, index) => (
        <a
          key={store.platform}
          href={store.href}
          onClick={() => track(store.platform)}
          data-analytics={store.platform === "ios" ? "app_store_click" : "google_play_click"}
          data-location={location}
          className={cn(
            "group flex min-h-[72px] items-center rounded-[22px] bg-[#111] px-5 text-left text-white transition duration-200 hover:-translate-y-0.5 hover:bg-black focus-visible:ring-offset-[#effbf5]",
            index === 0
              ? "shadow-[0_18px_42px_-20px_rgba(0,0,0,.8)]"
              : "shadow-[0_10px_28px_-22px_rgba(0,0,0,.7)]",
            compact && "min-[410px]:min-h-[66px] min-[410px]:px-4"
          )}
          aria-label={`${store.eyebrow} ${store.label}`}
        >
          {store.platform === "ios" ? (
            <Apple className="mr-4 h-9 w-9 shrink-0 fill-white" strokeWidth={1.2} />
          ) : (
            <span className="mr-4 flex"><GooglePlayMark /></span>
          )}
          <span className="min-w-0 flex-1 leading-none">
            <span className="block text-[11px] font-medium text-white/72">{store.eyebrow}</span>
            <span className={cn("mt-1 block whitespace-nowrap text-[21px] font-bold tracking-[-.025em]", compact && "min-[410px]:text-[17px]")}>{store.label}</span>
          </span>
          <ChevronRight className="ml-2 h-5 w-5 shrink-0 text-white/85 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
        </a>
      ))}
    </div>
  );
}
