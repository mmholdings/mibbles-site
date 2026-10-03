import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, PawPrint } from "lucide-react";
import { isLocale, messages, type Locale } from "@/lib/i18n/site";
import { siteConfig } from "@/lib/site-config";

const featureImages = [
  "/images/features/new-hunt.webp",
  "/images/features/ai-adaptive.webp",
  "/images/features/progress.webp",
  "/images/features/reactions.webp",
];

export function LocalizedPage({ locale, page }: { locale: string; page: "home" | "features" | "pricing" | "about" | "download" | "downloads" }) {
  if (!isLocale(locale)) return null;
  const copy = messages[locale];
  const prefix = `/${locale}`;
  const button = (text: string) => (
    <Link href={`${prefix}/download`} className="mt-7 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-ink-900 px-7 text-base font-semibold text-white shadow-soft transition hover:bg-ink-700">
      {text}<ArrowRight className="h-4 w-4" />
    </Link>
  );

  if (page === "download" || page === "downloads") {
    return <div className="min-h-[70vh] bg-[#fffdf7] px-5 py-12 text-[#11131a]">
      <div className="mx-auto max-w-2xl text-center">
        <PawPrint className="mx-auto mb-5 h-10 w-10 text-terracotta-600" />
        <p className="text-sm font-bold uppercase tracking-[.16em] text-terracotta-700">{copy.download.eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-6xl">{page === "downloads" ? copy.download.tiktok : copy.download.title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-600">{page === "downloads" ? copy.download.explain : copy.download.body}</p>
        {page === "downloads" && <div className="mx-auto mt-8 max-w-xl rounded-3xl bg-[#f7f6fc] p-6 text-left">
          {[copy.download.step1, copy.download.step2, copy.download.step3].map((step, i) => <div key={step} className="flex gap-4 py-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-900 font-bold text-white">{i + 1}</span><p className="pt-1 font-semibold">{step}</p></div>)}
        </div>}
        {button(copy.download.cta)}
        <p className="mt-4 text-sm text-ink-500">{copy.download.loved} · {copy.download.secure}</p>
      </div>
    </div>;
  }

  if (page === "features") return <div className="bg-white">
    <section className="bg-[radial-gradient(circle_at_85%_15%,#e0f8eb,transparent_35%),linear-gradient(135deg,#fffaf0,#fff)] px-5 py-16 md:py-24"><div className="mx-auto max-w-6xl"><p className="text-sm font-bold uppercase tracking-[.16em] text-terracotta-700">{copy.features.eyebrow}</p><h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">{copy.features.title}</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{copy.features.body}</p>{button(copy.common.learn)}</div></section>
    {copy.features.items.map(([title, body], i) => <section key={title} className={`px-5 py-14 md:py-20 ${i % 2 ? "bg-cream-100" : "bg-white"}`}><div className={`mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}><div><p className="text-sm font-semibold text-terracotta-700">0{i + 1} · Mibbles</p><h2 className="mt-4 font-serif text-3xl md:text-4xl">{title}</h2><p className="mt-5 text-lg leading-relaxed text-ink-600">{body}</p><ul className="mt-6 space-y-3 text-ink-700">{[copy.home.available, copy.pricing.free].map((item) => <li key={item} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-terracotta-600" />{item}</li>)}</ul></div><div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-cream-200"><Image src={featureImages[i]} alt={title} fill sizes="(max-width: 768px) 90vw, 400px" className="object-cover" /></div></div></section>)}
    <section className="px-5 py-16 text-center"><h2 className="font-serif text-3xl md:text-4xl">{copy.home.endTitle}</h2>{button(copy.pricing.download)}</section>
  </div>;

  if (page === "pricing") return <div className="bg-[linear-gradient(155deg,#f1fff7,#fffaf1_48%,#ffe8db)] px-5 py-16 md:py-24"><div className="mx-auto max-w-5xl text-center"><p className="text-sm font-bold uppercase tracking-[.16em] text-terracotta-700">{copy.pricing.eyebrow}</p><h1 className="mt-5 font-serif text-4xl md:text-6xl">{copy.pricing.title}</h1><p className="mx-auto mt-5 max-w-2xl text-lg text-ink-600">{copy.pricing.body}</p><div className="mt-10 grid gap-5 text-left md:grid-cols-2"><article className="relative rounded-3xl border-2 border-ink-900 bg-white p-7"><span className="rounded-full bg-terracotta-600 px-3 py-1 text-xs font-bold text-white">{copy.pricing.trial}</span><h2 className="mt-5 text-xl font-bold">{copy.pricing.annual}</h2><p className="mt-2 text-3xl font-bold">{copy.pricing.annualPrice}</p><p className="mt-1 text-terracotta-700">{copy.pricing.savings}</p></article><article className="rounded-3xl border border-ink-200 bg-white p-7"><h2 className="text-xl font-bold">{copy.pricing.monthly}</h2><p className="mt-5 text-3xl font-bold">{copy.pricing.monthlyPrice}</p></article></div><p className="mx-auto mt-7 max-w-3xl text-sm text-ink-500">{copy.pricing.details}</p>{button(copy.pricing.download)}<p className="mt-4 text-sm text-ink-500">{copy.pricing.free}</p></div></div>;

  if (page === "about") return <div className="bg-white">
    <section className="px-5 py-16 md:py-24"><div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.1fr_.9fr]"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-terracotta-700">{copy.about.eyebrow}</p><h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">{copy.about.title}</h1><p className="mt-6 text-lg leading-relaxed text-ink-600">{copy.about.intro}</p></div><div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-cream-200"><Image src="/images/suki-origin.webp" alt="Suki relaxing in a sunny window" fill sizes="(max-width: 768px) 95vw, 560px" className="object-cover" /></div></div></section>
    <section className="bg-cream-100 px-5 py-16"><div className="mx-auto max-w-3xl"><p className="text-sm font-bold uppercase tracking-[.16em] text-terracotta-700">{copy.about.mission}</p><p className="mt-5 text-xl leading-relaxed text-ink-700">{copy.about.missionBody}</p><h2 className="mt-12 font-serif text-3xl">{copy.about.teamTitle}</h2><p className="mt-4 text-lg leading-relaxed text-ink-600">{copy.about.teamBody}</p><a href={`mailto:${siteConfig.author.email}`} className="mt-4 inline-block text-terracotta-700 underline">{copy.about.contact}: {siteConfig.author.email}</a></div></section>
    <section className="px-5 py-16 text-center"><h2 className="font-serif text-3xl md:text-4xl">{copy.about.end}</h2>{button(copy.pricing.download)}</section>
  </div>;

  return <div className="bg-white">
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_85%_30%,#d5f5e8,transparent_35%),linear-gradient(135deg,#fffaf0,#fff)] px-5 py-16 md:py-24"><div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-terracotta-700">{copy.home.eyebrow}</p><h1 className="mt-5 font-serif text-5xl leading-[1.05] md:text-7xl">{copy.home.title}</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{copy.home.body}</p><div className="mt-5 flex flex-wrap items-center gap-4">{button(copy.download.cta)}<Link href={`${prefix}/features`} className="inline-flex items-center gap-2 px-3 font-semibold text-ink-800">{copy.home.link}<ArrowRight className="h-4 w-4" /></Link></div><p className="mt-5 text-sm text-ink-500">{copy.home.available}</p></div><div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] shadow-soft"><Image src="/images/features/hero.webp" alt={copy.home.title} fill priority sizes="(max-width: 768px) 90vw, 420px" className="object-cover" /></div></div></section>
    <section className="px-5 py-16 md:py-20"><div className="mx-auto max-w-6xl"><p className="text-sm font-bold uppercase tracking-[.16em] text-terracotta-700">{copy.home.why}</p><h2 className="mt-4 max-w-3xl font-serif text-3xl md:text-5xl">{copy.home.whyTitle}</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{copy.home.cards.map(([title, body]) => <article key={title} className="rounded-3xl border border-ink-100 bg-cream-50 p-6"><h3 className="font-serif text-2xl">{title}</h3><p className="mt-3 leading-relaxed text-ink-600">{body}</p></article>)}</div></div></section>
    <section className="bg-ink-900 px-5 py-16 text-center text-white"><h2 className="font-serif text-3xl md:text-5xl">{copy.home.endTitle}</h2><p className="mx-auto mt-4 max-w-xl text-white/75">{copy.home.endBody}</p>{button(copy.pricing.download)}</section>
  </div>;
}
