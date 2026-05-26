import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Mibbles is launching soon on iOS. Here's what's planned — one simple plan with a free trial. Join the waitlist for launch.",
  openGraph: {
    title: "Pricing — Mibbles",
    description:
      "Mibbles is launching soon on iOS. One simple plan, free trial — join the waitlist.",
    images: ["/api/og?title=Pricing&eyebrow=Mibbles"],
  },
};

const planFeatures = [
  "Cat TV — all channels, new content monthly",
  "Cat Cam — private, local-only video",
  "Unlimited cat profiles",
  "Weekly wellness insights & enrichment report",
  "Siri shortcuts, widgets, Apple Watch support",
  "AirPlay to Apple TV",
  "Vet-shareable PDF summary",
];

const faqs = [
  {
    question: "When does Mibbles launch?",
    answer:
      "We're in the final stretch before the App Store. Join the waitlist on this page and we'll email you the day it goes live.",
  },
  {
    question: "Will there be a free trial?",
    answer:
      "Yes. We're planning a generous free trial at launch so you can see if Mibbles works for your cat before committing. Exact terms get announced with the launch.",
  },
  {
    question: "What's pricing going to look like?",
    answer:
      "One simple plan — we don't believe in feature tiers. Pricing is being finalized; we'll publish the numbers when Mibbles launches.",
  },
  {
    question: "Will early-waitlist signups get any benefit?",
    answer:
      "Yes. Everyone on the waitlist before launch day gets a launch-week discount and our cat-wellness welcome guide. We'll email you the day Mibbles ships.",
  },
  {
    question: "Education or shelter discount?",
    answer:
      "Yes. Cat rescues, shelters, and veterinary clinics will get Mibbles free from launch. Email hello@mibbles.app from your org address closer to launch.",
  },
];

export default function PricingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Pricing", url: "/pricing" },
        ]}
      />
      <FAQSchema items={faqs} />

      <Section className="pt-16 md:pt-24 pb-12">
        <Container size="md">
          <div className="text-center">
            <Eyebrow>Coming to iOS</Eyebrow>
            <h1 className="font-serif text-display-2xl mt-5 mb-6 text-balance">
              One simple plan. Free to start.
            </h1>
            <p className="text-xl text-ink-600 max-w-prose mx-auto leading-snug">
              Mibbles launches on the App Store soon. No feature tiers, no
              upsells, no ads — just one subscription that keeps the lights on
              so we can keep shipping new Cat TV content. Exact pricing will be
              announced with the launch.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="md">
          <div className="max-w-xl mx-auto">
            <div className="relative rounded-3xl bg-ink-900 text-cream p-10 md:p-12 shadow-card text-center">
              <Eyebrow className="text-terracotta-300">Launching soon</Eyebrow>
              <div className="mt-4 mb-2 flex items-baseline gap-3 justify-center">
                <span className="font-serif text-6xl text-cream">$ —</span>
                <span className="text-cream/60">/month</span>
              </div>
              <p className="text-cream/60 text-sm mb-8">
                Pricing announced at launch · Free trial included
              </p>
              <div className="flex justify-center">
                <AppStoreButton variant="light" size="lg" />
              </div>
            </div>
          </div>

          {/* Feature list */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl mb-6 text-center">
              What you&apos;ll get at launch.
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {planFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-ink-700">
                  <Check className="h-5 w-5 shrink-0 text-terracotta-600 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="font-serif text-display-lg mt-5">Common questions.</h2>
            </div>
            <div className="lg:col-span-8">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
