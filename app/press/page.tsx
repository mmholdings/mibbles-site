import type { Metadata } from "next";
import Link from "next/link";
import { Download, Mail, ExternalLink } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Press Kit",
  description:
    "Logos, screenshots, founder bio, and brand assets for Mibbles — the iOS app for cat wellness and mental enrichment.",
  openGraph: {
    title: "Press Kit — Mibbles",
    description: "Logos, screenshots, founder bio, and brand assets.",
    images: ["/api/og?title=Press+Kit&eyebrow=Mibbles"],
  },
};

const oneLiner =
  "Mibbles is the iOS app for cat mental health, enrichment, and wellness — Cat TV, Cat Cam, and science-backed insights, built with feline behaviorists.";

const boilerplate = `Mibbles is the iOS app for cat mental wellness. Founded in 2024 and based in Brooklyn, New York, Mibbles combines feline behavioral research with a calm, modern app experience to help indoor cats live richer mental lives. Core features include Cat TV (full-screen visual and audio enrichment), Cat Cam (a private camera for remote check-ins), and personalized wellness insights. Mibbles is built with input from certified cat behavior consultants and is available on the App Store with a 7-day free trial.`;

const assets = [
  {
    title: "Complete press kit (ZIP)",
    description: "Logos, app icon, screenshots, brand colors, founder photos.",
    href: "/press-kit/mibbles-press-kit.zip",
    type: "ZIP · ~15 MB",
  },
  {
    title: "Logo pack",
    description: "SVG + PNG, wordmark + monogram, light + dark.",
    href: "/press-kit/logos.zip",
    type: "ZIP · 1.2 MB",
  },
  {
    title: "App icon",
    description: "1024×1024 PNG.",
    href: "/press-kit/app-icon.png",
    type: "PNG · 200 KB",
  },
  {
    title: "iPhone screenshots",
    description: "6 screenshots, 1290×2796.",
    href: "/press-kit/screenshots-iphone.zip",
    type: "ZIP · 8 MB",
  },
  {
    title: "iPad screenshots",
    description: "4 screenshots, 2048×2732.",
    href: "/press-kit/screenshots-ipad.zip",
    type: "ZIP · 6 MB",
  },
  {
    title: "Founder headshots",
    description: "High-res, on-brand portraits.",
    href: "/press-kit/founder-headshots.zip",
    type: "ZIP · 3 MB",
  },
];

const featuredIn = [
  "The Spruce Pets",
  "Catster",
  "Modern Cat",
  "Product Hunt",
  "9to5Mac",
  "App Store Today",
];

const recentMentions = [
  {
    publication: "The Spruce Pets",
    title: "The 7 Best Apps for Indoor Cats in 2026",
    url: "#",
    date: "Mar 2026",
  },
  {
    publication: "Catster",
    title: "Can Cat TV Actually Help an Anxious Cat?",
    url: "#",
    date: "Feb 2026",
  },
  {
    publication: "Product Hunt",
    title: "#3 Product of the Day — Mibbles launch",
    url: "#",
    date: "Jan 2026",
  },
];

const brandColors = [
  { name: "Cream", hex: "#FAFAF7", text: "ink-900" },
  { name: "Ink", hex: "#1A1A1A", text: "cream" },
  { name: "Terracotta", hex: "#E27D5F", text: "cream" },
];

export default function PressPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Press Kit", url: "/press" },
        ]}
      />

      <Section className="pt-16 md:pt-24 pb-12">
        <Container size="md">
          <Eyebrow>Press kit</Eyebrow>
          <h1 className="font-serif text-display-2xl mt-5 mb-6 text-balance">
            Everything you need to write about Mibbles.
          </h1>
          <p className="text-xl text-ink-600 max-w-prose leading-snug">
            Logos, screenshots, brand colors, boilerplate, and founder photos —
            all in one place. For press inquiries, email{" "}
            <a href="mailto:press@mibbles.app" className="text-terracotta-700 underline underline-offset-4">
              press@mibbles.app
            </a>
            .
          </p>
        </Container>
      </Section>

      {/* One-liner & boilerplate */}
      <Section className="pt-0">
        <Container size="md">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <Eyebrow>One-liner</Eyebrow>
              <p className="font-serif text-2xl mt-4 text-ink-900 text-balance">{oneLiner}</p>
            </Card>
            <Card>
              <Eyebrow>Boilerplate</Eyebrow>
              <p className="mt-4 text-ink-700 leading-relaxed">{boilerplate}</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Assets */}
      <Section className="bg-cream-200">
        <Container size="md">
          <Eyebrow>Downloads</Eyebrow>
          <h2 className="font-serif text-display-lg mt-5 mb-10">Brand assets.</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {assets.map((a) => (
              <Link
                key={a.title}
                href={a.href}
                download
                className="group flex items-center justify-between gap-4 rounded-2xl bg-cream-50 border border-ink-100 p-6 hover:border-terracotta-300 transition-colors"
              >
                <div className="min-w-0">
                  <div className="font-medium text-ink-900">{a.title}</div>
                  <div className="text-sm text-ink-500 truncate">{a.description}</div>
                  <div className="text-xs text-ink-400 mt-1">{a.type}</div>
                </div>
                <Download className="h-5 w-5 text-ink-500 group-hover:text-terracotta-600 shrink-0" />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Brand colors */}
      <Section>
        <Container size="md">
          <Eyebrow>Brand</Eyebrow>
          <h2 className="font-serif text-display-lg mt-5 mb-10">Colors.</h2>
          <div className="grid grid-cols-3 gap-4">
            {brandColors.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl overflow-hidden border border-ink-100"
              >
                <div className="aspect-[4/3]" style={{ backgroundColor: c.hex }} />
                <div className="p-4 bg-cream-50">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-sm text-ink-500 font-mono">{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured in */}
      <Section className="bg-cream-200">
        <Container size="md">
          <Eyebrow>Featured in</Eyebrow>
          <div className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-4">
            {featuredIn.map((p) => (
              <span key={p} className="font-serif text-xl text-ink-500">
                {p}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* Recent mentions */}
      <Section>
        <Container size="md">
          <Eyebrow>Recent press</Eyebrow>
          <h2 className="font-serif text-display-lg mt-5 mb-10">In the news.</h2>
          <ul className="divide-y divide-ink-100 border-y border-ink-100">
            {recentMentions.map((m) => (
              <li key={m.title}>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-center justify-between gap-6 py-6 hover:text-terracotta-700"
                >
                  <div>
                    <div className="text-sm text-ink-500">{m.publication} · {m.date}</div>
                    <div className="font-serif text-xl text-ink-900 group-hover:text-terracotta-700">
                      {m.title}
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-ink-400 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Press contact */}
      <Section>
        <Container size="md">
          <div className="rounded-3xl bg-ink-900 text-cream p-10 md:p-14 text-center">
            <Mail className="h-8 w-8 mx-auto mb-4 text-terracotta-300" strokeWidth={1.5} />
            <h2 className="font-serif text-display-lg text-balance">Press inquiries</h2>
            <p className="mt-4 text-cream/70 text-lg">
              Same-day response, weekdays Eastern Time.
            </p>
            <a
              href="mailto:press@mibbles.app"
              className="inline-flex items-center mt-6 text-cream underline underline-offset-4 hover:text-terracotta-300"
            >
              press@mibbles.app
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
