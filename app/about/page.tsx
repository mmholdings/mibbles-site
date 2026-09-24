import type { Metadata } from "next";
import Image from "next/image";
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
            Mibbles started with a bored cat named Suki.
          </h1>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="sm">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-ink-700 leading-snug">
              Mibbles started in a small apartment with a bored cat named Suki.
              Her humans worked long hours, and the closest thing to enrichment
              was a cat toy wand that they were always too tired to use. There
              had to be a better way.
            </p>

            <h2>The mission</h2>
            <p>
              Indoor cats live longer than outdoor cats but they live in
              dramatically less stimulating environments. Veterinary behaviorists
              have spent two decades quietly building consensus that
              environmental enrichment is one of the single most impactful
              interventions for indoor cat welfare. The science is there. The
              tools, mostly, aren&apos;t.
            </p>
            <p>
              We&apos;re building Mibbles to close that gap and to take the
              best of feline welfare research and turn it into something a
              cat parent can use in 30 seconds on a weekday morning.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="overflow-hidden bg-cream-200 pb-0">
        <Container size="md">
          <Eyebrow>Our team</Eyebrow>
          <h2 className="mt-3 mb-5 font-serif text-3xl text-balance md:text-4xl">
            Just a tiny team of Cat Lovers
          </h2>
          <p className="max-w-3xl text-ink-700 leading-relaxed mb-4">
            Mibbles is run by our small team based in Florida. We&apos;ve shipped
            at a handful of small startups you&apos;ve probably never heard of. We
            combined our passion in business, healthcare and our love for animals
            to create Mibbles. We are working hard to improve, and make Mibbles
            more stimulating for cats every day.
          </p>
          <p className="text-ink-700 leading-relaxed">
            Reach out at{" "}
            <a href="mailto:hello@mibbles.app" className="text-terracotta-700 underline underline-offset-4">
              hello@mibbles.app
            </a>
            .
          </p>
        </Container>

        <div className="relative mx-auto mt-8 aspect-[3/1] w-full max-w-[1440px] sm:mt-10">
          <Image
            src="/images/founders-banner.png"
            alt="The Mibbles team surrounded by cats"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[32%] bg-gradient-to-b from-cream-200 via-cream-200/65 to-transparent" />
        </div>
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
