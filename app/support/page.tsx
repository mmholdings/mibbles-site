import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Button } from "@/components/ui/button";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Support",
  description: "Help articles, troubleshooting, and how to reach the Mibbles team.",
};

const helpArticles = [
  { title: "Getting started — your first 10 minutes with Mibbles", href: "/support/getting-started" },
  { title: "Troubleshooting Cat Cam", href: "/support/cat-cam" },
  { title: "Restoring a purchase on a new iPhone", href: "/support/restore-purchase" },
  { title: "Canceling your subscription", href: "/support/cancel" },
  { title: "Setting up Family Sharing", href: "/support/family-sharing" },
  { title: "Using Mibbles with multiple cats", href: "/support/multi-cat" },
];

const faqs = [
  {
    question: "My cat won't watch — what should I do?",
    answer:
      "Some cats need a few sessions to engage. Start with the bird channel (highest engagement rate), in a quiet room, with you nearby. Cats often watch passively for 1–2 sessions before they fully tune in. Don't force it.",
  },
  {
    question: "Cat Cam stops streaming when my iPhone screen sleeps.",
    answer:
      "iOS pauses most apps when the screen locks. In Settings → Display & Brightness, set Auto-Lock to Never on the device running Cat Cam. We're working on a background mode for a future update.",
  },
  {
    question: "AirPlay isn't working with my Apple TV.",
    answer:
      "Make sure both devices are on the same Wi-Fi network and your Apple TV is on the latest tvOS. From the Mibbles in-app player, tap the AirPlay icon (top-right) and pick your Apple TV. If it doesn't appear, restart both devices.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "In Mibbles, go to Settings → Account → Delete account. We remove your profile, cat profiles, and all on-device data immediately. There's no server-side data to delete because we don't store any.",
  },
];

export default function SupportPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Support", url: "/support" }]} />
      <FAQSchema items={faqs} />

      <Section className="pt-16 md:pt-24 pb-12">
        <Container size="md">
          <Eyebrow>Support</Eyebrow>
          <h1 className="font-serif text-display-2xl mt-5 mb-6 text-balance">
            How can we help?
          </h1>
          <p className="text-xl text-ink-600 leading-snug max-w-prose">
            Browse the most common articles, check the FAQ, or get in touch
            directly — we usually reply the same day.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="md">
          <Eyebrow>Help articles</Eyebrow>
          <ul className="mt-6 grid sm:grid-cols-2 gap-2">
            {helpArticles.map((a) => (
              <li key={a.href}>
                <Link
                  href={a.href}
                  className="block rounded-2xl border border-ink-100 bg-cream-50 px-5 py-4 hover:border-terracotta-300 transition-colors"
                >
                  <span className="font-medium text-ink-900">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="font-serif text-display-lg mt-5">Quick answers.</h2>
            </div>
            <div className="lg:col-span-8">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-cream-200">
        <Container size="md" className="text-center">
          <h2 className="font-serif text-display-lg text-balance">Still stuck?</h2>
          <p className="mt-4 text-ink-600 max-w-prose mx-auto">
            We&apos;re a small team — emails reach an actual human. Same-day
            replies on weekdays.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact" variant="primary" size="lg">Contact us</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
