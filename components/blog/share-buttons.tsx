"use client";

import { Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import * as React from "react";

interface Props {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = React.useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on X"
        className="p-2 rounded-full border border-ink-100 hover:border-terracotta-300 hover:text-terracotta-600"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on LinkedIn"
        className="p-2 rounded-full border border-ink-100 hover:border-terracotta-300 hover:text-terracotta-600"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <button
        onClick={copy}
        aria-label="Copy link"
        className="p-2 rounded-full border border-ink-100 hover:border-terracotta-300 hover:text-terracotta-600"
      >
        {copied ? <Check className="h-4 w-4 text-terracotta-600" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}
