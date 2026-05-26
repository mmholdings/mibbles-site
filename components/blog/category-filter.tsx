"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  categories: readonly string[];
}

export function CategoryFilter({ categories }: Props) {
  const params = useSearchParams();
  const active = params?.get("category") ?? null;

  const items = [{ label: "All", value: null }, ...categories.map((c) => ({ label: c, value: c }))];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => {
        const isActive = item.value === active;
        const href = item.value ? `/blog?category=${encodeURIComponent(item.value)}` : "/blog";
        return (
          <Link
            key={item.label}
            href={href}
            className={cn(
              "inline-flex items-center rounded-full border px-4 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-ink-900 text-cream border-ink-900"
                : "bg-cream-50 text-ink-700 border-ink-200 hover:border-ink-300"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
