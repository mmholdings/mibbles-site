import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Newsletter } from "@/components/marketing/newsletter";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-cream mt-24">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 max-w-md">
            <Image
              src="/images/mibbles-wordmark.png"
              alt="Mibbles"
              width={1987}
              height={607}
              className="mb-5 h-12 w-auto"
            />
            <p className="text-ink-600 leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <Newsletter source="footer" />
          </div>

          {siteConfig.footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-sans text-xs uppercase tracking-[0.15em] text-ink-500 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-ink-700 hover:text-terracotta-700 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-ink-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-ink-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Made with care for cats everywhere.</p>
          <div className="flex items-center gap-5">
            <a href={siteConfig.links.tiktok} target="_blank" rel="noopener" className="hover:text-ink-900">TikTok</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
