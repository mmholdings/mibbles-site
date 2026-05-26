import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { allPosts } from "contentlayer/generated";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Badge } from "@/components/ui/card";
import { Newsletter } from "@/components/marketing/newsletter";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareButtons } from "@/components/blog/share-buttons";
import { PostCard } from "@/components/blog/post-card";
import { ExitIntentModal } from "@/components/blog/exit-intent-modal";
import { AppStoreCTACard } from "@/components/blog/app-store-cta-card";
import { mdxComponents } from "@/components/blog/mdx-components";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQSchema,
} from "@/components/seo/json-ld";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  return allPosts.filter((p) => !p.draft).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  const ogImage =
    post.ogImage ??
    `/api/og?title=${encodeURIComponent(post.title)}&eyebrow=Mibbles&category=${encodeURIComponent(post.category)}`;

  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.description,
    openGraph: {
      type: "article",
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.description,
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate ?? post.publishDate,
      authors: [post.author ?? siteConfig.author.name],
      url: absoluteUrl(post.url),
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.description,
      images: [ogImage],
    },
    alternates: { canonical: absoluteUrl(post.url) },
  };
}

export default function PostPage({ params }: Params) {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post || post.draft) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  const related = allPosts
    .filter((p) => p.slug !== post.slug && !p.draft && p.category === post.category)
    .slice(0, 3);

  const heroImage =
    post.heroImage ??
    `/api/og?title=${encodeURIComponent(post.title)}&eyebrow=Mibbles&category=${encodeURIComponent(post.category)}`;

  const faqItems = (post.faq ?? []) as { question: string; answer: string }[];

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.description}
        url={post.url}
        image={heroImage}
        datePublished={post.publishDate}
        dateModified={post.updatedDate}
        author={post.author}
      />
      {faqItems.length > 0 && <FAQSchema items={faqItems} />}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: post.url },
        ]}
      />

      {/* HERO */}
      <header className="pt-12 md:pt-16">
        <Container>
          <nav className="text-sm text-ink-500 mb-8">
            <Link href="/" className="hover:text-ink-900">Home</Link>
            <span className="mx-2">·</span>
            <Link href="/blog" className="hover:text-ink-900">Blog</Link>
            <span className="mx-2">·</span>
            <span className="text-ink-700">{post.category}</span>
          </nav>
          <div className="max-w-3xl">
            <Badge>{post.category}</Badge>
            <h1 className="font-serif text-display-xl mt-5 mb-6 text-balance">
              {post.title}
            </h1>
            <p className="text-xl text-ink-600 leading-snug mb-6 max-w-prose">
              {post.description}
            </p>
            <div className="flex items-center justify-between gap-4 text-sm text-ink-500">
              <div>
                <span className="font-medium text-ink-700">{post.author}</span>
                <span className="mx-2">·</span>
                {formatDate(post.publishDate)}
                <span className="mx-2">·</span>
                {Math.ceil((post.readingTime as any).minutes)} min read
              </div>
              <ShareButtons url={absoluteUrl(post.url)} title={post.title} />
            </div>
          </div>
        </Container>
      </header>

      <Container className="mt-12 md:mt-16">
        <div
          className="aspect-[16/9] md:aspect-[21/9] rounded-3xl bg-cover bg-center bg-cream-200"
          style={{ backgroundImage: `url(${heroImage})` }}
          aria-label={post.heroImageAlt ?? post.title}
          role="img"
        />
      </Container>

      {/* BODY */}
      <Section className="pt-16 md:pt-20">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <aside className="hidden lg:block lg:col-span-3">
              <TableOfContents headings={post.headings as any} />
            </aside>

            <article className="lg:col-span-9 max-w-prose lg:max-w-none">
              <div className="prose prose-lg max-w-prose">
                <MDXContent components={mdxComponents as any} />
              </div>

              {/* In-content CTA */}
              <AppStoreCTACard />

              {/* FAQ block */}
              {faqItems.length > 0 && (
                <section className="mt-16 max-w-prose">
                  <Eyebrow>Frequently asked</Eyebrow>
                  <h2 className="font-serif text-3xl mt-4 mb-8">{`More about ${post.primaryKeyword}`}</h2>
                  <dl className="space-y-8">
                    {faqItems.map((f, i) => (
                      <div key={i}>
                        <dt className="font-serif text-xl text-ink-900 mb-2">{f.question}</dt>
                        <dd className="text-ink-700 leading-relaxed">{f.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {/* Author bio */}
              <aside className="mt-16 rounded-2xl bg-cream-200 border border-ink-100 p-8 flex items-start gap-6 max-w-prose">
                <div className="h-16 w-16 rounded-full bg-ink-200 shrink-0" />
                <div>
                  <div className="text-sm uppercase tracking-widest text-ink-500 mb-1">Written by</div>
                  <div className="font-serif text-xl mb-2">{post.author}</div>
                  <p className="text-ink-700 text-[15px] leading-relaxed">
                    The Mibbles editorial team is a small group of cat people
                    who consult certified feline behaviorists and the
                    peer-reviewed literature before publishing anything.
                  </p>
                </div>
              </aside>
            </article>
          </div>
        </Container>
      </Section>

      {/* Newsletter inline */}
      <Section className="bg-cream-200">
        <Container size="md" className="text-center">
          <Eyebrow>The Mibbles weekly</Eyebrow>
          <h2 className="font-serif text-display-lg mt-4 mb-4 text-balance">
            Liked this? Get one in your inbox every Sunday.
          </h2>
          <Newsletter source={`post:${post.slug}`} className="max-w-md mx-auto" />
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section>
          <Container>
            <Eyebrow>Keep reading</Eyebrow>
            <h2 className="font-serif text-display-lg mt-4 mb-10">More on {post.category.toLowerCase()}.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <ExitIntentModal />
    </>
  );
}
