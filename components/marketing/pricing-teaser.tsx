import Link from "next/link";
import { Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/container";
import { AppStoreButton } from "@/components/ui/app-store-button";

const features = [
  "Cat TV — bird, fish, prey & calm channels",
  "Cat Cam — monitor from anywhere",
  "Wellness tracking & enrichment insights",
  "Unlimited cat profiles",
  "Early access to every new feature we ship",
];

/**
 * Pre-launch "join the waitlist" panel.
 * Once the app is live, swap this back for the real pricing card
 * (see git history for the trial/$4.99/yr version).
 */
export function PricingTeaser() {
  return (
    <div className="rounded-3xl bg-ink-900 text-cream p-10 md:p-14 lg:p-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,rgba(226,125,95,0.6),transparent_60%)]" />
      <div className="relative grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow className="text-terracotta-300">Coming to iOS</Eyebrow>
          <h2 className="font-serif text-display-lg mt-4 mb-6 text-balance">
            Be the first to use Mibbles.
          </h2>
          <p className="text-cream/70 text-lg leading-relaxed mb-8 max-w-prose">
            We&apos;re weeks away from launch. Join the waitlist and we&apos;ll
            email you the day Mibbles lands on the App Store — plus the early
            cat-wellness reads we send our community each Sunday.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <AppStoreButton variant="light" size="lg" />
            <Link
              href="/about"
              className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-cream/20 text-cream hover:bg-cream/10 transition-colors"
            >
              Read the story
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-cream/80 text-sm uppercase tracking-widest font-medium">
            What you&apos;ll get
          </div>
          <ul className="space-y-3 pt-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Check className="h-5 w-5 shrink-0 text-terracotta-300 mt-0.5" />
                <span className="text-cream/90">{f}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2 text-cream/50 text-sm">
            Launch pricing announced when we ship.
          </div>
        </div>
      </div>
    </div>
  );
}
