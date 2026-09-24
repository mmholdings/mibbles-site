import { AppStoreButton } from "@/components/ui/app-store-button";
import { Sparkles } from "lucide-react";

interface Props {
  headline?: string;
  body?: string;
}

export function AppStoreCTACard({
  headline = "Make playtime part of their routine.",
  body = "Download Mibbles on the App Store and start with a 7-day free trial.",
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
