import { Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  variant?: "dark" | "light";
  size?: "md" | "lg";
}

export function AppStoreButton({ className, variant = "dark", size = "md" }: Props) {
  const dimensions = size === "lg" ? "h-14 px-7" : "h-12 px-6";
  const colors =
    variant === "dark"
      ? "bg-ink-900 text-cream hover:bg-ink-700"
      : "bg-cream text-ink-900 border border-ink-200 hover:bg-cream-200";

  return (
    <a
      href={siteConfig.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-3 rounded-full transition-colors shadow-soft",
        dimensions,
        colors,
        className
      )}
      data-analytics="app-store-cta"
      aria-label="Download Mibbles on the App Store"
    >
      <Download className="h-5 w-5" strokeWidth={1.7} />
      <span className="text-left leading-tight">
        <span className="block text-[10px] opacity-70">Download on the</span>
        <span className="block text-base font-semibold tracking-tight">App Store</span>
      </span>
    </a>
  );
}
