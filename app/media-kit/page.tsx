import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Download, Heart, DollarSign, MessageSquare } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Creator Program",
  description:
    "For cat creators on YouTube, TikTok, and Instagram — affiliate codes, pre-made assets, and partnership opportunities with Mibbles.",
  openGraph: {
    title: "Creator Program — Mibbles",
    description:
      "Affiliate, asset, and partnership opportunities for cat creators.",
    images: ["/api/og?title=For+creators&eyebrow=Mibbles"],
  },
};

export default function MediaKitPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Creators", url: "/media-kit" },
        ]}
      />

      <Section className="relative isolate overflow-hidden pt-16 md:pt-24 pb-10">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[linear-gradient(180deg,#bdeeff_0%,#e6f8ff_42%,#fff_100%)]" />
        <Container size="md">
          <div className="text-center">
            <Eyebrow>For creators</Eyebrow>
            <h1 className="font-serif text-display-2xl mt-5 mb-6 text-balance">
              Built for the cat internet.
            </h1>
            <p className="mx-auto text-xl text-ink-600 max-w-2xl leading-snug">
              If you make cat content on YouTube, TikTok, Instagram, or anywhere
              else — we&apos;d love to work with you. Share play, grow with us, and
              make something your audience will love.
            </p>
          </div>
          <div className="relative mx-auto mt-8 aspect-[3/2] max-w-5xl overflow-hidden">
            <Image src="/images/creator-pixel-cats.webp" alt="A lively group of pixel-art creator cats in different styles and accessories, gathered in a flowered field" fill priority sizes="(max-width: 768px) 100vw, 960px" className="object-contain" />
          </div>
          <div className="mx-auto -mt-1 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
            <Benefit icon={DollarSign} title="30% commission" text="On first-year annual subscriptions from your code." />
            <Benefit icon={Heart} title="Free year" text="Try Mibbles before you share it." />
            <Benefit icon={Download} title="Asset library" text="Ready-to-post images, clips, and captions." />
          </div>
        </Container>
      </Section>

      {/* Sign up */}
      <Section className="bg-cream-200">
        <Container size="md">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Eyebrow>Apply</Eyebrow>
              <h2 className="font-serif text-display-lg mt-5 mb-6 text-balance">
                Tell us about your audience.
              </h2>
              <p className="text-ink-700 leading-relaxed">
                We reply within a week. Roughly 5–10k engaged cat-content
                followers across any platform tends to be the sweet spot —
                but we make exceptions for great work.
              </p>
            </div>
            <Card>
              <h3 className="font-serif text-2xl text-ink-900">A few details help us get back to you.</h3>
              <p className="mt-3 leading-relaxed text-ink-600">
                In your email, include your name, contact email, platform and handle,
                audience size, and a little about your cats.
              </p>
              <a href="mailto:mibblesapp@gmail.com?subject=Creator%20Program%20Application" className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink-900 px-6 text-[15px] font-medium text-cream hover:bg-ink-700">
                Apply by email
              </a>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <Eyebrow>Already approved?</Eyebrow>
          <h2 className="font-serif text-display-lg mt-5 mb-8">
            Grab pre-made assets.
          </h2>
          <p className="text-ink-700 max-w-prose">
            Logos, screenshots, B-roll, and a Notion page of approved caption
            copy live in our shared Dropbox. Email{" "}
            <a href="mailto:mibblesapp@gmail.com" className="text-terracotta-700 underline underline-offset-4">
              mibblesapp@gmail.com
            </a>{" "}
            and we&apos;ll send the link.
          </p>
          <div className="mt-6">
            <Button href="mailto:mibblesapp@gmail.com" variant="outline" size="md">
              <MessageSquare className="h-4 w-4" /> Get the asset link
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Benefit({ icon: Icon, title, text }: { icon: typeof DollarSign; title: string; text: string }) {
  return (
    <Card className="flex items-center gap-3 !p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta-50 text-terracotta-600">
        <Icon className="h-5 w-5" strokeWidth={1.7} />
      </span>
      <span>
        <span className="block font-serif text-lg text-ink-900">{title}</span>
        <span className="mt-0.5 block text-sm leading-snug text-ink-600">{text}</span>
      </span>
    </Card>
  );
}
