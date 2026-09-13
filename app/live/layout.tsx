import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#E9E9E7",
};

/** Bare layout for the broadcast surfaces (site chrome is hidden via SiteChrome). */
export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return <div className="live-root">{children}</div>;
}
