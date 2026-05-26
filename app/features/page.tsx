import type { Metadata } from "next";
import Image from "next/image";
import { Tv, Camera, Sparkles, UserPlus, GraduationCap, Clock } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { IPhoneMockup } from "@/components/ui/iphone-mockup";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Cat TV, Cat Cam, personalized cat profiles, and wellness insights — every Mibbles feature, explained.",
  openGraph: {
    title: "Features — Mibbles",
    description:
      "Cat TV, Cat Cam, personalized profiles, wellness insights. Every Mibbles feature, explained.",
    images: ["/api/og?title=Features&eyebrow=Mibbles"],
  },
};

const features = [
  {
    icon: Tv,
    name: "Cat TV",
    headline: "Channels designed for the feline visual system.",
    description:
      "Slow, deliberate movement. Quiet, prey-evoking audio. Bird, fish, squirrel, and calming scenes — built around how cats actually attend to a screen.",
    bullets: [
      "Six rotating channels with new content monthly",
      "Adaptive volume — never startling, always engaging",
      "AirPlay to your Apple TV for a full-screen session",
      "Auto-stop timer prevents excessive screen exposure",
    ],
    screenshot: "/screenshots/cat-mode.png",
  },
  {
    icon: Camera,
    name: "Cat Cam",
    headline: "Turn your iPhone into a private cat camera.",
    description:
      "Set up an old iPhone in any room and check in remotely. Video stays on your device — no third-party servers, no cloud uploads.",
    bullets: [
      "Local-only video — never uploaded",
      "Motion alerts for when your cat is active",
      "Two-way audio so you can say hi from the office",
      "Works with any iPhone running iOS 16+",
    ],
    screenshot: "/screenshots/cat-cam.png",
  },
  {
    icon: UserPlus,
    name: "Cat Profiles",
    headline: "A personalized space for every cat in the house.",
    description:
      "Name, photo, age, breed, preferences. Mibbles tunes content recommendations based on what each cat actually watches.",
    bullets: [
      "Unlimited cat profiles",
      "Per-cat preference learning",
      "Birthday & adoption-day reminders",
      "Multi-cat household tips & schedules",
    ],
    screenshot: "/screenshots/profile.png",
  },
  {
    icon: Sparkles,
    name: "Wellness Insights",
    headline: "Gentle nudges, grounded in feline behavior research.",
    description:
      "Track enrichment minutes, play sessions, and watch patterns. Get research-informed suggestions when your cat seems under-stimulated.",
    bullets: [
      "Weekly enrichment report",
      "Behavior pattern detection",
      "Daily activity goals tuned to your cat's life stage",
      "Vet-shareable PDF summary",
    ],
    screenshot: "/screenshots/insights.png",
  },
  {
    icon: GraduationCap,
    name: "Onboarding Science",
    headline: "Learn the why behind everything in the app.",
    description:
      "Five short lessons walk you through what enrichment actually means for cats — drawn from peer-reviewed feline welfare research.",
    bullets: [
      "Five 2-minute lessons",
      "Skim or deep-read formats",
      "Cited studies you can read in full",
      "Refresher mode for new cat parents",
    ],
    screenshot: "/screenshots/onboarding.png",
  },
  {
    icon: Clock,
    name: "Built for Daily Use",
    headline: "Quietly fits into the routine you already have.",
    description:
      "Quick-start widget, Lock Screen shortcut, Siri integration. Two taps from your home screen to a calm cat.",
    bullets: [
      "Home Screen widget",
      "Siri shortcuts (\"Hey Siri, start Cat Mode\")",
      "Apple Watch quick-start",
      "Focus mode automation",
    ],
    screenshot: "/screenshots/widgets.png",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Features", url: "/features" },
        ]}
      />
      <Section className="pt-16 md:pt-24 pb-12">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Features</Eyebrow>
            <h1 className="font-serif text-display-2xl mt-5 mb-6 text-balance">
              A complete toolkit for your cat&apos;s mental wellbeing.
            </h1>
            <p className="text-xl text-ink-600 max-w-prose leading-snug">
              Everything in Mibbles is built around one question: how do we
              make an indoor cat&apos;s day richer? Here&apos;s what that looks
              like in practice.
            </p>
            <div className="mt-8">
              <AppStoreButton size="lg" />
            </div>
          </div>
        </Container>
      </Section>

      {features.map((feat, i) => (
        <Section key={feat.name} className={i % 2 === 1 ? "bg-cream-200" : ""}>
          <Container>
            <div
              className={`grid lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="h-12 w-12 rounded-2xl bg-terracotta-50 flex items-center justify-center mb-5">
                  <feat.icon className="h-6 w-6 text-terracotta-600" strokeWidth={1.5} />
                </div>
                <Eyebrow>{feat.name}</Eyebrow>
                <h2 className="font-serif text-display-lg mt-5 mb-6 text-balance">
                  {feat.headline}
                </h2>
                <p className="text-lg text-ink-700 leading-relaxed mb-6 max-w-prose">
                  {feat.description}
                </p>
                <ul className="space-y-3 max-w-prose">
                  {feat.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-ink-700">
                      <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <IPhoneMockup src={feat.screenshot} alt={`${feat.name} screenshot`}>
                  <span className="font-serif">{feat.name}</span>
                </IPhoneMockup>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section className="bg-ink-900 text-cream">
        <Container size="md">
          <div className="text-center">
            <h2 className="font-serif text-display-lg text-balance">
              Mibbles is coming to iOS.
            </h2>
            <p className="mt-5 text-cream/70 text-lg max-w-prose mx-auto">
              Join the waitlist and we&apos;ll email you the day it launches.
            </p>
            <div className="mt-8 flex justify-center">
              <AppStoreButton variant="light" size="lg" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
