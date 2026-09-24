import type { Metadata } from "next";
import { Check, Crown, Infinity, Sparkles } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Mibbles Premium is $2.99 monthly or $29.99 yearly. Start with a 7-day free trial and cancel anytime.",
  openGraph: {
    title: "Mibbles Premium Pricing",
    description: "$2.99 monthly or $29.99 yearly, with a 7-day free trial.",
    images: ["/api/og?title=Mibbles%20Premium&eyebrow=Simple%20pricing"],
  },
};

const premiumFeatures = [
  "AI Adaptive play that learns what holds your cat's attention",
  "15, 30, and unlimited-length play sessions",
  "Every texture and living background",
  "Multiple cat profiles with individual enrichment history",
  "Personalized engagement and wellness insights",
  "All future Premium updates",
];

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
      "Choose Monthly or Yearly and you can try every Premium feature for seven days. After the trial, your selected plan begins unless you cancel beforehand.",
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
  {
    question: "Do you support shelters and rescues?",
    answer:
      "We do. Email hello@mibbles.app from your organization address and our team will help you get set up.",
  },
];

const plans = [
  {
    name: "Monthly",
    price: "$2.99",
    cadence: "per month",
    note: "Flexible month-to-month access",
    featured: false,
  },
  {
    name: "Yearly",
    price: "$29.99",
    cadence: "per year",
    note: "$2.50/month · Save 16%",
    featured: true,
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

      <Section className="relative overflow-hidden pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_25%_25%,rgba(194,242,215,0.65),transparent_42%),radial-gradient(circle_at_78%_20%,rgba(250,204,170,0.55),transparent_38%)]" />
        <Container size="lg">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Mibbles Premium</Eyebrow>
            <h1 className="mt-5 font-serif text-display-2xl text-balance">
              More ways to keep them curious.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-snug text-ink-600">
              Every core game mode is free. Premium adds adaptive play, longer
              sessions, richer environments, and a profile for every cat.
            </p>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-ink-100 bg-cream/80 px-4 py-2 text-sm font-medium text-ink-700 shadow-soft backdrop-blur">
              <Sparkles className="h-4 w-4 text-terracotta-600" />
              Start with a 7-day free trial
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={
                  plan.featured
                    ? "relative rounded-[2rem] bg-ink-900 p-8 text-cream shadow-card md:p-10"
                    : "relative rounded-[2rem] border border-ink-100 bg-cream/90 p-8 shadow-soft backdrop-blur md:p-10"
                }
              >
                {plan.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-terracotta-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Best value
                  </span>
                )}
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-terracotta-100 text-ink-900">
                  {plan.featured ? <Crown className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                </div>
                <h2 className={plan.featured ? "mt-7 text-lg font-semibold text-cream" : "mt-7 text-lg font-semibold"}>{plan.name}</h2>
                <div className="mt-3 flex items-end gap-2">
                  <span className="font-serif text-5xl">{plan.price}</span>
                  <span className={plan.featured ? "pb-1 text-cream/60" : "pb-1 text-ink-500"}>
                    {plan.cadence}
                  </span>
                </div>
                <p className={plan.featured ? "mt-3 text-cream/65" : "mt-3 text-ink-500"}>
                  {plan.note}
                </p>
                <div className={plan.featured ? "mt-7 border-t border-cream/15 pt-6" : "mt-7 border-t border-ink-100 pt-6"}>
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <Check className="h-4 w-4 text-terracotta-400" />
                    7 days free, then {plan.price}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center gap-3 text-center">
            <AppStoreButton size="lg" />
            <p className="text-xs text-ink-500">
              Prices shown in USD. Subscription renews automatically unless canceled.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-terracotta-50/55">
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Eyebrow>Included with Premium</Eyebrow>
              <h2 className="mt-5 font-serif text-display-lg text-balance">
                Built around your cat, not a feature checklist.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ink-600">
                Premium gives Mibbles more time and more ways to learn what keeps
                each cat engaged—without taking free play away.
              </p>
              <div className="mt-7 flex items-center gap-3 rounded-2xl bg-cream/80 p-4 text-sm text-ink-700 shadow-soft">
                <Infinity className="h-6 w-6 shrink-0 text-terracotta-600" />
                Unlimited sessions are included with either paid plan.
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex min-h-28 items-start gap-3 rounded-2xl bg-cream p-5 shadow-soft">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-terracotta-100">
                    <Check className="h-4 w-4 text-ink-900" />
                  </span>
                  <span className="font-medium leading-snug text-ink-800">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-5 font-serif text-display-lg">Common questions.</h2>
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
