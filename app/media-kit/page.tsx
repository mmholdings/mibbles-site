import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

      <Section className="pt-16 md:pt-24 pb-12">
        <Container size="md">
          <Eyebrow>For creators</Eyebrow>
          <h1 className="font-serif text-display-2xl mt-5 mb-6 text-balance">
            Built for the cat internet.
          </h1>
          <p className="text-xl text-ink-600 max-w-prose leading-snug">
            If you make cat content on YouTube, TikTok, Instagram, or anywhere
            else — we&apos;d love to work with you. Affiliate revenue,
            ready-to-post assets, and (sometimes) free product giveaways for
            your audience.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="md">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <DollarSign className="h-8 w-8 text-terracotta-600 mb-3" strokeWidth={1.5} />
              <h3 className="font-serif text-2xl mb-2">30% commission</h3>
              <p className="text-ink-600">
                For the first year of every annual subscription your code converts.
                Paid monthly via Stripe.
              </p>
            </Card>
            <Card>
              <Heart className="h-8 w-8 text-terracotta-600 mb-3" strokeWidth={1.5} />
              <h3 className="font-serif text-2xl mb-2">Free year</h3>
              <p className="text-ink-600">
                A free annual subscription so you can review the product
                honestly before you ever post about it.
              </p>
            </Card>
            <Card>
              <Download className="h-8 w-8 text-terracotta-600 mb-3" strokeWidth={1.5} />
              <h3 className="font-serif text-2xl mb-2">Asset library</h3>
              <p className="text-ink-600">
                Drop-in B-roll, app screenshots, brand-safe captions, and
                disclosure copy.
              </p>
            </Card>
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
              <form
                action="https://formspree.io/f/REPLACE_ME"
                method="POST"
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-ink-700 block mb-1">Your name</label>
                  <input name="name" required className="w-full h-11 rounded-lg border border-ink-200 px-4" />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink-700 block mb-1">Email</label>
                  <input type="email" name="email" required className="w-full h-11 rounded-lg border border-ink-200 px-4" />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink-700 block mb-1">Primary platform & handle</label>
                  <input name="handle" required placeholder="e.g. TikTok @yourname" className="w-full h-11 rounded-lg border border-ink-200 px-4" />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink-700 block mb-1">Audience size</label>
                  <input name="audience" required className="w-full h-11 rounded-lg border border-ink-200 px-4" />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink-700 block mb-1">Tell us about your cats</label>
                  <textarea name="cats" rows={3} className="w-full rounded-lg border border-ink-200 px-4 py-3" />
                </div>
                <Button type="submit" variant="primary" size="md" className="w-full">
                  Apply to the program
                </Button>
              </form>
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
            <a href="mailto:creators@mibbles.app" className="text-terracotta-700 underline underline-offset-4">
              creators@mibbles.app
            </a>{" "}
            and we&apos;ll send the link.
          </p>
          <div className="mt-6">
            <Button href="mailto:creators@mibbles.app" variant="outline" size="md">
              <MessageSquare className="h-4 w-4" /> Get the asset link
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
