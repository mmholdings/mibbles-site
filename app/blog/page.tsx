import type { Metadata } from "next";
import { Suspense } from "react";
import { allPosts } from "contentlayer/generated";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { PostCard } from "@/components/blog/post-card";
import { CategoryFilter } from "@/components/blog/category-filter";
import { Newsletter } from "@/components/marketing/newsletter";
import { siteConfig } from "@/lib/site-config";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Cat Wellness Blog — Behavior, Enrichment, Health",
  description:
    "Evidence-led guides to indoor cat behavior, enrichment, and wellbeing — written with feline behaviorists. Updated weekly.",
  openGraph: {
    title: "Cat Wellness Blog — Mibbles",
    description:
      "Evidence-led guides to indoor cat behavior, enrichment, and wellbeing.",
    images: ["/api/og?title=Cat+wellness+blog&eyebrow=Mibbles"],
  },
};

interface SearchParams {
  category?: string;
}

export default function BlogIndex({ searchParams }: { searchParams: SearchParams }) {
  const published = allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate));

  const activeCategory = searchParams.category;
  const filtered = activeCategory
    ? published.filter((p) => p.category === activeCategory)
    : published;

  const [featured, ...rest] = filtered;

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]} />

      <Section className="pt-16 md:pt-24 pb-10">
        <Container>
          <Eyebrow>The Mibbles Journal</Eyebrow>
          <h1 className="font-serif text-display-2xl mt-5 mb-6 text-balance max-w-3xl">
            Cat wellness, decoded.
          </h1>
          <p className="text-xl text-ink-600 max-w-prose leading-snug">
            Evidence-led guides to indoor cat behavior, enrichment, and
            wellbeing — written by cat people, reviewed against the research.
          </p>
        </Container>
      </Section>

      <Section className="py-0">
        <Container>
          <Suspense fallback={<div className="h-10" />}>
            <CategoryFilter categories={siteConfig.blogCategories} />
          </Suspense>
        </Container>
      </Section>

      {featured && (
        <Section className="pt-12 md:pt-16">
          <Container>
            <PostCard post={featured} featured />
          </Container>
        </Section>
      )}

      {rest.length > 0 && (
        <Section className="py-12 md:py-16">
          <Container>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {filtered.length === 0 && (
        <Section>
          <Container>
            <p className="text-center text-ink-500">No posts in this category yet.</p>
          </Container>
        </Section>
      )}

      <Section className="bg-cream-200">
        <Container size="md">
          <div className="text-center">
            <h2 className="font-serif text-display-lg mb-4 text-balance">
              Get one thoughtful cat-wellness read each Sunday.
            </h2>
            <p className="text-ink-600 max-w-prose mx-auto mb-8">
              Behavior, enrichment, science. Written by cat people, read in
              three minutes.
            </p>
            <Newsletter source="blog-index" className="max-w-md mx-auto" />
          </div>
        </Container>
      </Section>
    </>
  );
}
