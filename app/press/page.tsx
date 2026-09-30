import type { Metadata } from "next";
import Link from "next/link";
import { Download, Mail } from "lucide-react";
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
  "Mibbles is an iOS app for cat enrichment and wellbeing, with interactive play, Cat TV, Cat Cam, and simple ways to follow a cat’s play.";

const boilerplate = `Mibbles started in a small apartment with a bored cat named Suki. Her humans worked long hours, and the closest thing to enrichment was a cat toy wand they were always too tired to use. There had to be a better way. We’re building Mibbles to close that gap and turn the best of feline welfare research into something a cat parent can use in 30 seconds on a weekday morning.`;

const assets = [
  {
    title: "Complete press kit (ZIP)",
    description: "Logos, app icon, screenshots, brand colors, and a founders photo.",
    href: "/press-kit/mibbles-press-kit.zip",
    type: "ZIP · 24 MB",
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
    type: "PNG · 813 KB",
  },
  {
    title: "iPhone screenshots",
    description: "10 high-resolution JPGs, 1320×2868.",
    href: "/press-kit/screenshots-iphone.zip",
    type: "ZIP · 8 MB",
  },
  {
    title: "iPad screenshots",
    description: "10 high-resolution JPGs, 2064×2752.",
    href: "/press-kit/screenshots-ipad.zip",
    type: "ZIP · 11 MB",
  },
  {
    title: "Founders photo",
    description: "High-resolution photo of the Mibbles co-founders.",
    href: "/press-kit/founder-headshots.zip",
    type: "ZIP · 1.7 MB",
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
            Logos, screenshots, brand colors, boilerplate, and a founders photo —
            all in one place. For press inquiries, email{" "}
            <a href="mailto:mibblesapp@gmail.com" className="text-terracotta-700 underline underline-offset-4">
              mibblesapp@gmail.com
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
              href="mailto:mibblesapp@gmail.com"
              className="inline-flex items-center mt-6 text-cream underline underline-offset-4 hover:text-terracotta-300"
            >
              mibblesapp@gmail.com
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
