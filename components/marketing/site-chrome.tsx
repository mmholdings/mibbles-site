"use client";

import { usePathname } from "next/navigation";

/**
 * Hides marketing chrome (nav, footer, sticky CTA) on broadcast routes.
 * Keeps the root layout intact for every other page.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/live")) return null;
  return <>{children}</>;
}
