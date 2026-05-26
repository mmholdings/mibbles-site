import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  asChild?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-ink-900 text-cream hover:bg-ink-700 shadow-soft",
  secondary:
    "bg-terracotta-500 text-cream hover:bg-terracotta-600 shadow-soft",
  outline:
    "border border-ink-200 bg-transparent text-ink-900 hover:bg-ink-100",
  ghost:
    "bg-transparent text-ink-900 hover:bg-ink-100",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", href, external, children, ...props },
    ref
  ) => {
    const classes = cn(base, variantStyles[variant], sizeStyles[size], className);
    if (href) {
      if (external || href.startsWith("http")) {
        return (
          <a className={classes} href={href} rel="noopener noreferrer" target="_blank">
            {children}
          </a>
        );
      }
      return (
        <Link className={classes} href={href}>
          {children}
        </Link>
      );
    }
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
