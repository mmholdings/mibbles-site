export const siteConfig = {
  name: "Mibbles",
  tagline: "Mental wellness for your cat",
  description:
    "Mibbles is the iOS app for cat mental health, enrichment, and wellness. Cat TV, Cat Cam, and science-backed insights — built with feline behaviorists.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mibbles.app",
  ogImage: "/og-default.png",
  appStoreUrl:
    process.env.NEXT_PUBLIC_APP_STORE_URL ??
    "https://apps.apple.com/app/id6770523158",
  appStoreId: process.env.NEXT_PUBLIC_APP_STORE_ID ?? "6770523158",
  googlePlayUrl:
    process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ??
    "https://play.google.com/store/apps/details?id=app.rork.4z9riky51dy4223vpp3gb",
  launching: false,
  pricing: {
    trialDays: 7,
    monthly: { price: "$2.99", per: "month" },
    annual: { price: "$29.99", per: "year", savings: "Save 16%" },
  },
  author: {
    name: "The Mibbles Team",
    email: "hello@mibbles.app",
    press: "press@mibbles.app",
    support: "support@mibbles.app",
  },
  links: {
    tiktok: "https://tiktok.com/@mibblescat",
  },
  nav: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Download", href: "/download" },
  ],
  footerSections: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Download", href: "/download" },
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
      title: "Legal & Privacy",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Your Privacy Choices", href: "/privacy-choices" },
        { label: "CCPA Notice", href: "/ccpa" },
        { label: "Consumer Health Data", href: "/consumer-health-data" },
        { label: "Accessibility", href: "/accessibility" },
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
