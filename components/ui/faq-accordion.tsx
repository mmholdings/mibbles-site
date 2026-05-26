"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

export function FAQAccordion({ items, className }: { items: FAQItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-ink-100 border-y border-ink-100", className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-terracotta-700"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="font-serif text-xl md:text-2xl text-ink-900 text-balance">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-ink-500 transition-transform duration-300",
                  isOpen && "rotate-180 text-terracotta-600"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="max-w-prose text-ink-600 leading-relaxed">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
