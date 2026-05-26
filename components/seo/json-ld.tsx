import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl("/logo-512.png"),
        sameAs: [
          siteConfig.links.twitter,
          siteConfig.links.instagram,
          siteConfig.links.tiktok,
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.author.email,
          contactType: "customer support",
        },
      }}
    />
  );
}

export function SoftwareApplicationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        name: siteConfig.name,
        operatingSystem: "iOS",
        applicationCategory: "LifestyleApplication",
        offers: {
          "@type": "Offer",
          price: siteConfig.pricing.annual.price.replace("$", ""),
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1247",
        },
        downloadUrl: siteConfig.appStoreUrl,
        screenshot: absoluteUrl("/screenshots/cat-mode.png"),
      }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.url),
        })),
      }}
    />
  );
}

interface ArticleProps {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}
export function ArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = siteConfig.author.name,
}: ArticleProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: absoluteUrl(image),
        datePublished,
        dateModified: dateModified ?? datePublished,
        author: { "@type": "Person", name: author },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          logo: { "@type": "ImageObject", url: absoluteUrl("/logo-512.png") },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(url) },
      }}
    />
  );
}

export function FAQSchema({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}
