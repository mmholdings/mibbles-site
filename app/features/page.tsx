import type { Metadata } from "next";
import Image from "next/image";
import { Brain, Gamepad2, Heart, Share2 } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Mibbles game modes, AI Adaptive play, cat profiles, enrichment tracking, and shareable reaction clips.",
  openGraph: {
    title: "A happier day for your cat — Mibbles",
    description:
      "Interactive games, personalized play, visible enrichment progress, and reactions worth saving.",
    images: ["/api/og?title=A%20happier%20day%20for%20your%20cat&eyebrow=Mibbles"],
  },
};

const features = [
  {
    icon: Gamepad2,
    name: "Play that stays interesting",
    headline: "A new hunt whenever they are ready.",
    description:
      "Choose from Classic, Beetle Chase, Mouse Dash, Feather Frenzy, Lizard Rush, Bird Flash, water play, and more. Each mode pairs Mibbles' fluid movement with prey designed to hold feline attention.",
    benefits: [
      "Every standard game mode is free",
      "5- and 10-minute sessions included",
      "Longer and unlimited sessions with Premium",
    ],
    screenshot: "/screenshots/current/games.png",
    tone: "bg-[#edf9f1]",
  },
  {
    icon: Brain,
    name: "Play built around your cat",
    headline: "Tune every session—or let Mibbles learn.",
    description:
      "Pick the background, texture, session length, and movement speed that gets the best response. AI Adaptive can learn from taps and engagement, then shape future sessions around what your cat enjoys most.",
    benefits: [
      "Visual background and texture choices",
      "Simple speed and session controls",
      "AI Adaptive is included with Premium",
    ],
    screenshot: "/screenshots/current/personalized.png",
    tone: "bg-[#f4efff]",
  },
  {
    icon: Heart,
    name: "Progress you can feel",
    headline: "See the play that brightens their week.",
    description:
      "Mibbles records taps, hits, sessions, daily streaks, and favorite hunts for each cat. A simple engagement circle turns all that activity into progress an owner can understand at a glance.",
    benefits: [
      "Per-cat engagement and stimulation view",
      "Favorite games and heart ratings",
      "Multiple profiles with Premium",
    ],
    screenshot: "/screenshots/current/progress.png",
    tone: "bg-[#f7f4e9]",
  },
  {
    icon: Share2,
    name: "Reactions worth keeping",
    headline: "Save the moment after the pounce.",
    description:
      "Reaction clips live together in a clean 9:16 gallery, ready to replay or share. It is an easy way to keep the funny, focused, and unexpectedly sweet moments that happen during play.",
    benefits: [
      "Vertical clips made for mobile sharing",
      "Organized by the game your cat played",
      "One-tap replay and sharing",
    ],
    screenshot: "/screenshots/current/reactions.png",
    tone: "bg-[#edf8f8]",
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

      <Section className="relative overflow-hidden pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_25%,rgba(199,245,219,0.65),transparent_35%),radial-gradient(circle_at_85%_30%,rgba(246,221,211,0.75),transparent_38%)]" />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Made for happier indoor cats</Eyebrow>
              <h1 className="mt-5 font-serif text-display-2xl text-balance">
                A happier cat starts with something to chase.
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-snug text-ink-600">
                Mibbles turns a screen into active enrichment: fresh hunts,
                responsive movement, visible progress, and play that grows more
                personal with every session.
              </p>
              <div className="mt-9">
                <AppStoreButton size="lg" />
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm lg:col-span-5">
              <div className="absolute inset-10 -z-10 rounded-full bg-terracotta-100 blur-3xl" />
              <Image
                src="/screenshots/current/home.png"
                alt="Current Mibbles home screen and favorite game experience"
                width={1242}
                height={2688}
                priority
                className="h-auto w-full rounded-[2rem] shadow-card"
              />
            </div>
          </div>
        </Container>
      </Section>

      {features.map((feature, index) => (
        <Section key={feature.name} className={index % 2 === 1 ? "bg-cream-200/55" : ""}>
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
              <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta-50">
                  <feature.icon className="h-6 w-6 text-terracotta-600" strokeWidth={1.5} />
                </div>
                <Eyebrow>{feature.name}</Eyebrow>
                <h2 className="mt-5 font-serif text-display-lg text-balance">
                  {feature.headline}
                </h2>
                <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-700">
                  {feature.description}
                </p>
                <ul className="mt-7 space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-ink-700">
                      <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className={`mx-auto max-w-md overflow-hidden rounded-[2rem] p-4 shadow-soft sm:p-6 ${feature.tone}`}>
                  <Image
                    src={feature.screenshot}
                    alt={`Current Mibbles app screen for ${feature.name}`}
                    width={1242}
                    height={2688}
                    className="h-auto w-full rounded-2xl shadow-card"
                    sizes="(min-width: 1024px) 42vw, 90vw"
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section className="bg-ink-900 text-cream">
        <Container size="md">
          <div className="text-center">
            <h2 className="font-serif text-display-lg text-cream text-balance">
              Give their curiosity somewhere to go.
            </h2>
            <p className="mx-auto mt-5 max-w-prose text-lg text-cream/70">
              Download Mibbles on the App Store and start playing today.
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
