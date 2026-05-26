import Image from "next/image";
import Link from "next/link";
import { Tv, Camera, Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { IPhoneMockup } from "@/components/ui/iphone-mockup";
import { Card } from "@/components/ui/card";
import { FeatureCard } from "@/components/marketing/feature-card";
import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { Newsletter } from "@/components/marketing/newsletter";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { SoftwareApplicationSchema } from "@/components/seo/json-ld";

const faqs = [
  {
    question: "Is Cat TV actually good for cats?",
    answer:
      "Feline behaviorists generally consider short, structured visual enrichment a positive form of mental stimulation for indoor cats — particularly those with limited access to outdoor stimuli. Mibbles content is built around prey-movement patterns cats find engaging, in 20–60 minute sessions rather than all-day exposure.",
  },
  {
    question: "What devices does Mibbles work on?",
    answer:
      "Mibbles is an iOS app for iPhone and iPad, optimized for iPad use in Cat Mode. You can also AirPlay to an Apple TV for a full-screen experience.",
  },
  {
    question: "How does Cat Cam work?",
    answer:
      "Cat Cam uses your iPhone's camera so you can check in on your cat from another room or remotely. It runs locally on your device — no third-party servers store the video.",
  },
  {
    question: "When does Mibbles launch?",
    answer:
      "We're targeting a launch on the iOS App Store in the coming weeks. Join the waitlist on this page and we'll email you the day it goes live — plus the early Mibbles weekly read on cat wellness.",
  },
  {
    question: "How much screen time is too much for a cat?",
    answer:
      "Cats benefit from variety — not just screens. We recommend 20–60 minute sessions a few times a day, paired with interactive play and quiet rest. Mibbles will not encourage all-day passive viewing.",
  },
  {
    question: "Is my cat's data private?",
    answer:
      "Yes. Cat profiles stay on your device. Cat Cam video never leaves your device. The only data we collect is anonymous app usage so we can improve the product. See our privacy policy for details.",
  },
  {
    question: "Will Mibbles diagnose health problems?",
    answer:
      "No. Mibbles is a wellness and enrichment app, not a diagnostic tool. Always consult a licensed veterinarian for medical concerns.",
  },
  {
    question: "Can I use Mibbles with multiple cats?",
    answer:
      "Yes. Create as many cat profiles as you like — each with their own preferences and viewing history.",
  },
];

export default function HomePage() {
  return (
    <>
      <SoftwareApplicationSchema />

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <Section className="pt-12 md:pt-20 pb-16 md:pb-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 animate-fade-up">
              <Eyebrow>iOS · Backed by feline behavior research</Eyebrow>
              <h1 className="font-serif text-display-2xl mt-5 mb-6 text-balance text-ink-900">
                Mental wellness <br className="hidden md:block" />
                for your cat.
              </h1>
              <p className="text-xl md:text-2xl text-ink-600 max-w-prose leading-snug mb-10">
                Mibbles is the iOS app for cat enrichment and wellbeing.
                Cat TV that actually holds their attention, a Cat Cam so
                you can check in, and insights drawn from real feline behavior research.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <AppStoreButton size="lg" />
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 px-4 h-14 text-ink-900 hover:text-terracotta-700 transition-colors font-medium"
                >
                  See how it works <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-6 text-sm text-ink-500">
                Mibbles is coming to iOS · Join the waitlist and we&apos;ll email you the moment it launches
              </p>
            </div>

            <div className="lg:col-span-5 relative">
              {/* Soft circle behind the phone */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="w-[420px] h-[420px] rounded-full bg-terracotta-50 blur-2xl" />
              </div>
              <IPhoneMockup
                src="/screenshots/cat-mode.png"
                alt="Mibbles app showing Cat Mode with birds on screen"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────── SOCIAL PROOF STRIP ─────────────────────────── */}
      <Container>
        <div className="border-y border-ink-100 py-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-ink-500">
          <span className="font-medium text-ink-700">As featured in</span>
          <span className="font-serif text-lg text-ink-400">The Spruce Pets</span>
          <span className="font-serif text-lg text-ink-400">Catster</span>
          <span className="font-serif text-lg text-ink-400">Modern Cat</span>
          <span className="font-serif text-lg text-ink-400">Product Hunt</span>
          <span className="font-serif text-lg text-ink-400">9to5Mac</span>
        </div>
      </Container>

      {/* ─────────────────────────── WHY MIBBLES ─────────────────────────── */}
      <Section>
        <Container>
          <div className="max-w-2xl mb-16">
            <Eyebrow>Why Mibbles</Eyebrow>
            <h2 className="font-serif text-display-lg mt-5 text-balance">
              Everything your cat&apos;s indoor brain is missing.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            <FeatureCard
              icon={Tv}
              title="Cat TV"
              description="Full-screen video and audio designed for cats — birds, fish, prey movement, and calming scenes — built around how cats actually attend to visual stimuli."
            />
            <FeatureCard
              icon={Camera}
              title="Cat Cam"
              description="Turn your iPhone into a private camera. Check in from another room or across the city. No third-party servers — your video never leaves your device."
            />
            <FeatureCard
              icon={Sparkles}
              title="Wellness Insights"
              description="Personalized profiles for each cat track what holds their attention. Get gentle, behavior-research-backed recommendations for their daily enrichment."
            />
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────── SCIENCE ─────────────────────────── */}
      <Section className="bg-cream-200">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <Eyebrow>The science</Eyebrow>
              <h2 className="font-serif text-display-lg mt-5 mb-6 text-balance">
                Backed by feline behavioral research.
              </h2>
              <p className="text-lg text-ink-700 leading-relaxed mb-6 max-w-prose">
                Indoor cats experience predictable environments — and that
                predictability is linked to higher rates of obesity, anxiety,
                and stress-related conditions. Environmental enrichment is one
                of the most consistent recommendations veterinary behaviorists
                make for indoor cat wellbeing.
              </p>
              <p className="text-lg text-ink-700 leading-relaxed max-w-prose">
                Mibbles is built around that body of research, with input from
                certified cat behavior consultants. Every Cat Mode channel is
                designed against established models of feline visual attention.
              </p>
            </div>
            <div className="lg:col-span-6">
              <Card className="bg-cream-50">
                <Eyebrow>Cited study</Eyebrow>
                <blockquote className="font-serif text-2xl md:text-3xl text-ink-900 mt-4 leading-snug text-balance">
                  &ldquo;Environmental enrichment for indoor cats is associated
                  with reduced stress-related behaviors and improved welfare
                  scores across multiple controlled studies.&rdquo;
                </blockquote>
                <p className="mt-6 text-sm text-ink-500">
                  Ellis, S.L.H. — <em>Journal of Feline Medicine and Surgery</em>, 2009
                </p>
                <div className="mt-6 pt-6 border-t border-ink-100 text-sm text-ink-600">
                  Mibbles is built with input from certified cat behavior consultants.
                  We&apos;ll never replace your vet — but we&apos;ll always cite
                  the research behind our recommendations.
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────── BIG VISUAL ─────────────────────────── */}
      <Section className="py-0 md:py-0">
        <Container className="px-0 sm:px-6">
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden md:rounded-3xl bg-ink-900">
            {/* Replace with /public/images/cat-watching-ipad.jpg */}
            <div className="absolute inset-0 bg-gradient-to-br from-terracotta-400/30 via-ink-700 to-ink-900" />
            <div className="absolute inset-0 flex items-end p-8 md:p-16">
              <div className="max-w-2xl">
                <h2 className="font-serif text-display-xl text-cream text-balance">
                  Designed for the way cats actually watch.
                </h2>
                <p className="mt-4 text-cream/80 text-lg max-w-prose">
                  Slow pans. Quiet audio. Prey-movement that triggers natural
                  hunting attention — without overstimulating.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */}
      <Section>
        <Container className="mb-12 px-5 sm:px-6 lg:px-8">
          <Eyebrow>Loved by cat parents</Eyebrow>
          <h2 className="font-serif text-display-lg mt-5 max-w-2xl text-balance">
            What people are saying.
          </h2>
        </Container>
        <TestimonialCarousel />
      </Section>

      {/* ─────────────────────────── PRICING TEASER ─────────────────────────── */}
      <Section>
        <Container>
          <PricingTeaser />
        </Container>
      </Section>

      {/* ─────────────────────────── FAQ ─────────────────────────── */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="font-serif text-display-lg mt-5 text-balance">
                Common questions.
              </h2>
              <p className="mt-5 text-ink-600 leading-relaxed max-w-sm">
                Can&apos;t find what you&apos;re looking for?{" "}
                <Link href="/support" className="text-terracotta-700 underline underline-offset-4">
                  Get in touch
                </Link>
                .
              </p>
            </div>
            <div className="lg:col-span-8">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────── NEWSLETTER ─────────────────────────── */}
      <Section className="bg-cream-200">
        <Container size="md">
          <div className="text-center max-w-2xl mx-auto">
            <BookOpen className="h-8 w-8 mx-auto mb-4 text-terracotta-600" strokeWidth={1.5} />
            <Eyebrow>The Mibbles weekly</Eyebrow>
            <h2 className="font-serif text-display-lg mt-4 mb-6 text-balance">
              One thoughtful cat wellness tip, every Sunday.
            </h2>
            <p className="text-ink-600 mb-8 text-lg">
              Behavior, enrichment, science. Written by cat people. Read in under three minutes.
            </p>
            <Newsletter source="home-bottom" variant="inline" className="max-w-md mx-auto" />
          </div>
        </Container>
      </Section>
    </>
  );
}
