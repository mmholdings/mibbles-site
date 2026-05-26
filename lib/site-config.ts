export const siteConfig = {
  name: "Mibbles",
  tagline: "Mental wellness for your cat",
  description:
    "Mibbles is the iOS app for cat mental health, enrichment, and wellness. Cat TV, Cat Cam, and science-backed insights — built with feline behaviorists.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mibbles.app",
  ogImage: "/og-default.png",
  appStoreUrl:
    process.env.NEXT_PUBLIC_APP_STORE_URL ??
    "https://apps.apple.com/app/mibbles/idXXXXXXXXX",
  appStoreId: process.env.NEXT_PUBLIC_APP_STORE_ID ?? "XXXXXXXXX",
  // Pre-launch. Real numbers added when the app ships.
  launching: true,
  pricing: {
    trialDays: 7,
    weekly: { price: "$4.99", per: "week" },
    annual: { price: "$49.99", per: "year", savings: "Save 80%" },
  },
  author: {
    name: "The Mibbles Team",
    email: "hello@mibbles.app",
    press: "press@mibbles.app",
    support: "support@mibbles.app",
  },
  links: {
    twitter: "https://twitter.com/mibblesapp",
    instagram: "https://instagram.com/mibblesapp",
    tiktok: "https://tiktok.com/@mibblesapp",
  },
  nav: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
  footerSections: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Join the waitlist", href: "/#waitlist" },
        { label: "What's New", href: "/blog?category=Trends" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Cat Wellness Guide", href: "/blog?category=Health" },
        { label: "Enrichment Ideas", href: "/blog?category=Enrichment" },
        { label: "Support", href: "/support" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Press Kit", href: "/press" },
        { label: "Creators", href: "/media-kit" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
  blogCategories: [
    "Behavior",
    "Enrichment",
    "Health",
    "How-To",
    "Mental Health",
    "Nutrition",
    "Training",
    "Breeds",
    "Trends",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
