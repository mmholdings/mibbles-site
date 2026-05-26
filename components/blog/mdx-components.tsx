import Link from "next/link";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { AppStoreCTACard } from "@/components/blog/app-store-cta-card";

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="font-serif text-display-lg mt-12 mb-6 text-balance" {...props} />,
  h2: (props) => (
    <h2
      className="font-serif text-3xl md:text-4xl mt-14 mb-4 scroll-mt-24 text-balance"
      {...props}
    />
  ),
  h3: (props) => <h3 className="font-serif text-2xl mt-8 mb-3 scroll-mt-24" {...props} />,
  p: (props) => <p className="text-lg leading-relaxed text-ink-700 my-5" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 my-5 space-y-2 text-lg text-ink-700" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 my-5 space-y-2 text-lg text-ink-700" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-8 border-l-4 border-terracotta-500 pl-6 italic font-serif text-2xl text-ink-900 text-balance"
      {...props}
    />
  ),
  a: ({ href = "", ...props }) => {
    const external = href.startsWith("http");
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-terracotta-700 underline underline-offset-4 hover:text-terracotta-800"
        {...props}
      />
    ) : (
      <Link
        href={href}
        className="text-terracotta-700 underline underline-offset-4 hover:text-terracotta-800"
        {...props}
      />
    );
  },
  hr: () => <hr className="my-12 border-ink-100" />,
  img: ({ src = "", alt = "", ...props }) => (
    <span className="block my-8">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="rounded-2xl w-full h-auto"
        {...(props as any)}
      />
      {alt && <span className="block text-sm text-ink-500 mt-2 text-center">{alt}</span>}
    </span>
  ),
  // Custom callout block — usable in MDX as <Callout type="quick-answer">...</Callout>
  Callout: ({
    type = "info",
    children,
  }: {
    type?: "info" | "quick-answer" | "warning";
    children: React.ReactNode;
  }) => {
    const styles = {
      info: "bg-cream-200 border-ink-200 text-ink-700",
      "quick-answer": "bg-terracotta-50 border-terracotta-200 text-ink-800",
      warning: "bg-amber-50 border-amber-200 text-amber-900",
    } as const;
    const labels = {
      info: "Note",
      "quick-answer": "Quick answer",
      warning: "Important",
    } as const;
    return (
      <aside className={`my-8 rounded-2xl border p-6 ${styles[type]}`}>
        <div className="text-xs font-medium uppercase tracking-widest mb-2 text-terracotta-700">
          {labels[type]}
        </div>
        <div className="prose prose-sm max-w-none">{children}</div>
      </aside>
    );
  },
  AppStoreCTACard,
};
