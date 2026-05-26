import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "@/styles/globals.css";
import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { StickyAppCTA } from "@/components/marketing/sticky-app-cta";
import { Analytics } from "@/components/seo/analytics";
import { OrganizationSchema } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "cat tv",
    "cat enrichment",
    "cat mental health",
    "indoor cat",
    "cat wellness app",
    "cat behavior",
  ],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@mibblesapp",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    // iOS Smart App Banner — auto-shows download prompt to Safari iOS visitors
    "apple-itunes-app": `app-id=${siteConfig.appStoreId}`,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-ink-900">
        <OrganizationSchema />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyAppCTA />
        <Analytics />
      </body>
    </html>
  );
}
