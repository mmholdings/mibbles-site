import { AppStoreButton } from "@/components/ui/app-store-button";
import { Sparkles } from "lucide-react";

interface Props {
  headline?: string;
  body?: string;
}

/**
 * In-blog-post CTA card.
 * App is pre-launch — points at the waitlist via AppStoreButton.
 */
export function AppStoreCTACard({
  headline = "Mibbles is coming to iOS soon.",
  body = "Be the first to try it. We'll email you the day it lands on the App Store — no spam, just the launch.",
}: Props) {
  return (
    <aside className="my-10 rounded-2xl bg-ink-900 text-cream p-8 md:p-10">
      <Sparkles className="h-6 w-6 text-terracotta-300 mb-3" strokeWidth={1.5} />
      <h3 className="font-serif text-2xl text-cream mb-3 text-balance">{headline}</h3>
      <p className="text-cream/70 mb-6 max-w-prose">{body}</p>
      <AppStoreButton variant="light" size="md" />
    </aside>
  );
}
