import Link from "next/link";
import { Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/container";
import { AppStoreButton } from "@/components/ui/app-store-button";

const features = [
  "AI Adaptive play",
  "15, 30 & unlimited-length sessions",
  "Every texture and living background",
  "Multiple cat profiles",
  "Personalized enrichment insights",
];

export function PricingTeaser() {
  return (
    <div className="rounded-3xl bg-ink-900 text-cream p-10 md:p-14 lg:p-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,rgba(226,125,95,0.6),transparent_60%)]" />
      <div className="relative grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow className="text-terracotta-300">Mibbles Premium</Eyebrow>
          <h2 className="font-serif text-display-lg mt-4 mb-6 text-balance">
            More ways to keep them curious.
          </h2>
          <p className="text-cream/70 text-lg leading-relaxed mb-8 max-w-prose">
            Start with 7 days free. Then choose $2.99 monthly or $29.99 yearly.
            Every core game mode stays free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <AppStoreButton variant="light" size="lg" />
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-cream/20 text-cream hover:bg-cream/10 transition-colors"
            >
              Compare plans
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-cream/80 text-sm uppercase tracking-widest font-medium">
            Premium includes
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
            Cancel anytime through your Apple ID.
          </div>
        </div>
      </div>
    </div>
  );
}
