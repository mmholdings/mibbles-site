import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Heart, Sparkles } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start a 7-day Mibbles Premium trial. Choose $2.99 monthly or $29.99 yearly and cancel anytime.",
  openGraph: {
    title: "Mibbles Premium Pricing",
    description: "$2.99 monthly or $29.99 yearly, with a 7-day free trial.",
    images: ["/api/og?title=Mibbles%20Premium&eyebrow=7-day%20free%20trial"],
  },
};

const faqs = [
  {
    question: "What can I use for free?",
    answer:
      "Every standard game mode is available for free, along with 5- and 10-minute sessions, core backgrounds, reaction ratings, and favorite-game tracking.",
  },
  {
    question: "What does Mibbles Premium unlock?",
    answer:
      "Premium adds AI Adaptive play, 15- and 30-minute sessions, unlimited sessions, every background texture, multiple cat profiles, and deeper enrichment insights.",
  },
  {
    question: "How does the 7-day free trial work?",
    answer:
      "Choose Monthly or Yearly in the app and try every Premium feature for seven days. After the trial, your selected plan begins unless you cancel beforehand.",
  },
  {
    question: "Can I switch plans or cancel?",
    answer:
      "Yes. Your subscription is managed through your Apple ID, so you can switch plans or cancel anytime from Apple Subscriptions in Settings.",
  },
  {
    question: "Does one subscription work on iPhone and iPad?",
    answer:
      "Yes. Use the same Apple ID on your supported devices to access your Mibbles Premium subscription.",
  },
];

const outcomes = [
  {
    stat: "1,591",
    label: "cat guardians",
    body: "took part in a global study connecting play with feline quality of life.",
  },
  {
    stat: "Higher",
    label: "quality of life",
    body: "was associated with greater playfulness and a wider variety of games.",
  },
  {
    stat: "Stronger",
    label: "human-cat bonds",
    body: "were associated with longer daily play and more games shared together.",
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

      <Section className="relative overflow-hidden pb-20 pt-16 md:min-h-[780px] md:pb-28 md:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(155deg,#f1fff7_0%,#fffaf1_48%,#ffe8db_100%)]" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-[430px] w-[700px] rounded-[50%] bg-terracotta-100/55 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-16 -z-10 h-72 w-72 rounded-full bg-[#c9f4dd]/70 blur-3xl" />

        <Container size="lg">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>Mibbles Premium</Eyebrow>
            <h1 className="mx-auto mt-5 max-w-3xl font-serif text-display-2xl text-balance">
              Start seven days of happier play.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-600 md:text-xl">
              Give your cat more variety, longer sessions, and play that learns
              what keeps them curious.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
            <article className="relative rounded-2xl border-2 border-ink-900 bg-cream p-6 text-left shadow-card md:p-7">
              <span className="absolute -top-4 right-5 rounded-full bg-terracotta-500 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-soft">
                7-day free trial
              </span>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="font-sans text-xl font-bold">Yearly</h2>
                  <p className="mt-2 font-semibold text-ink-700">$29.99/year</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-ink-900">$2.50/mo.</p>
                  <p className="mt-1 text-sm font-medium text-terracotta-700">Save 16%</p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border-2 border-ink-200 bg-cream p-6 text-left shadow-card md:p-7">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <h2 className="font-sans text-xl font-bold">Monthly</h2>
                  <p className="mt-2 text-sm text-ink-500">Flexible month to month</p>
                </div>
                <p className="text-2xl font-bold text-ink-900">$2.99/mo.</p>
              </div>
            </article>
          </div>

          <div className="mx-auto mt-8 max-w-4xl text-center">
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-ink-500">
              After your free trial, your selected subscription renews automatically
              until canceled. Prices shown in USD.{" "}
              <Link href="/terms" className="underline underline-offset-4 hover:text-ink-900">Terms</Link>
              {" · "}
              <Link href="/support" className="underline underline-offset-4 hover:text-ink-900">Cancel anytime</Link>
            </p>
            <Link
              href="/download"
              className="mt-7 inline-flex h-16 w-full items-center justify-center gap-3 rounded-full bg-ink-900 px-8 text-lg font-semibold text-cream shadow-soft transition hover:bg-ink-700"
            >
              Download Mibbles <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-4 text-sm text-ink-500">
              Every standard game mode remains free to play.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="overflow-hidden bg-ink-900 text-cream">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-terracotta-300">Why owners choose Premium</Eyebrow>
            <h2 className="mt-5 font-serif text-display-xl text-cream text-balance">
              Happier cats start with richer days.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-cream/65">
              Premium is not about collecting features. It helps owners build a
              more varied play routine, learn what their cat loves, and make
              enrichment easier to repeat every day.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            <div className="group relative min-h-[520px] overflow-hidden rounded-[2rem] bg-cream lg:col-span-7">
              <Image
                src="/images/benefits/cat-playing.png"
                alt="A cat engaging with Mibbles on a tablet"
                fill
                className="object-cover object-center transition duration-700 group-hover:scale-[1.02]"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 to-transparent p-8 pt-24">
                <Heart className="mb-3 h-6 w-6 fill-terracotta-400 text-terracotta-400" />
                <p className="font-serif text-3xl text-cream">More moments of real curiosity.</p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <div className="relative min-h-64 overflow-hidden rounded-[2rem] bg-[#eafbf2]">
                <Image
                  src="/screenshots/current/progress.png"
                  alt="Mibbles cat profile showing engagement progress"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 42vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/80 to-transparent p-6 pt-20">
                  <p className="font-serif text-2xl text-cream">See what gets them moving.</p>
                </div>
              </div>
              <div className="relative min-h-64 overflow-hidden rounded-[2rem] bg-[#fff2e9]">
                <Image
                  src="/images/benefits/cat-reaction.png"
                  alt="A happy cat reacting during play"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 42vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/80 to-transparent p-6 pt-20">
                  <p className="font-serif text-2xl text-cream">Save the moments you love.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-cream/15 md:grid-cols-3">
            {outcomes.map((outcome) => (
              <div key={outcome.label} className="bg-ink-900 p-7 md:p-9">
                <p className="font-serif text-4xl text-terracotta-300">{outcome.stat}</p>
                <p className="mt-1 font-semibold text-cream">{outcome.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-cream/55">{outcome.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-cream/40">
            Associations reported in a 2023 international guardian survey; they do
            not establish that Mibbles causes health outcomes. Source:{" "}
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/38487456/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-cream"
            >
              Animal Welfare, “Cats just want to have fun.”
            </a>
          </p>
        </Container>
      </Section>

      <Section className="bg-terracotta-50/50">
        <Container size="md">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-5 font-serif text-display-lg">Common questions.</h2>
              <div className="mt-6 flex items-center gap-2 text-sm text-ink-600">
                <Sparkles className="h-4 w-4 text-terracotta-600" />
                Simple plans. No ads.
              </div>
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
