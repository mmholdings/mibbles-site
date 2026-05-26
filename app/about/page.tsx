import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mibbles is built by cat people for cat people — combining feline behavioral research with the iOS app craft of a small, focused team.",
  openGraph: {
    title: "About — Mibbles",
    description:
      "Built by cat people for cat people. The story and science behind Mibbles.",
    images: ["/api/og?title=About&eyebrow=Mibbles"],
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />

      <Section className="pt-16 md:pt-24 pb-12">
        <Container size="md">
          <Eyebrow>About</Eyebrow>
          <h1 className="font-serif text-display-2xl mt-5 mb-6 text-balance">
            We build the app we wished existed for our own cats.
          </h1>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="sm">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-ink-700 leading-snug">
              Mibbles started in a New York apartment with a bored cat named
              Olive. Her humans worked long hours, the windows looked onto a
              brick wall, and the closest thing to enrichment was a laser
              pointer they were always too tired to use. There had to be a
              better way.
            </p>

            <h2>The mission</h2>
            <p>
              Indoor cats live longer than outdoor cats — but they live in
              dramatically less stimulating environments. Veterinary behaviorists
              have spent two decades quietly building consensus that
              environmental enrichment is one of the single most impactful
              interventions for indoor cat welfare. The science is there. The
              tools, mostly, aren&apos;t.
            </p>
            <p>
              We&apos;re building Mibbles to close that gap — to take the
              best of feline welfare research and turn it into something a
              cat parent can use in 30 seconds on a weekday morning.
            </p>

            <h2>The science</h2>
            <p>
              We work with certified cat behavior consultants and consult the
              peer-reviewed literature when we ship anything that touches a
              cat&apos;s routine. We won&apos;t cite a study unless we can link
              it. We won&apos;t recommend something the research doesn&apos;t
              support. And we&apos;ll always defer to your vet for medical
              questions.
            </p>

            <h2>The team</h2>
            <p>
              Mibbles is built by a small team based in Brooklyn, New York,
              and Toronto. We&apos;ve shipped at Apple, Headspace, and a
              handful of small startups you&apos;ve probably never heard of.
              Between us we have six cats and approximately too many cat hairs
              on every laptop.
            </p>

            <h2>What we won&apos;t do</h2>
            <p>
              We won&apos;t sell your data. We won&apos;t recommend that you
              leave a screen on for your cat all day. We won&apos;t diagnose
              your cat&apos;s health. We won&apos;t use a single image of a
              cat on this site that we don&apos;t have the rights to. And we
              won&apos;t ship anything we wouldn&apos;t use with our own cats.
            </p>
          </div>
        </Container>
      </Section>

      {/* Founder card */}
      <Section className="bg-cream-200">
        <Container size="md">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-2xl bg-ink-200 grid place-items-center text-ink-500">
                {/* Replace with founder headshot in /public/images/founder.jpg */}
                <span className="font-serif text-2xl">Founder photo</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <Eyebrow>Founder</Eyebrow>
              <h2 className="font-serif text-3xl mt-3 mb-4">[Founder Name]</h2>
              <p className="text-ink-700 leading-relaxed mb-4">
                [Founder bio paragraph goes here — 80–120 words on their
                background, how Mibbles started, and why cat welfare is the
                hill they&apos;re willing to die on. Replace this placeholder
                with the real bio.]
              </p>
              <p className="text-ink-700 leading-relaxed">
                Reach out at{" "}
                <a href="mailto:hello@mibbles.app" className="text-terracotta-700 underline underline-offset-4">
                  hello@mibbles.app
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="md" className="text-center">
          <h2 className="font-serif text-display-lg text-balance">
            Help us give every indoor cat a better day.
          </h2>
          <div className="mt-8 flex justify-center">
            <AppStoreButton size="lg" />
          </div>
        </Container>
      </Section>
    </>
  );
}
