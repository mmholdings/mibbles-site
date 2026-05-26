import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-cream-50 border border-ink-100 shadow-card p-8",
        className
      )}
      {...props}
    />
  );
}

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-terracotta-50 px-3 py-1 text-xs font-medium text-terracotta-700",
        className
      )}
    >
      {children}
    </span>
  );
}
