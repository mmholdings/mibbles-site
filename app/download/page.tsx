import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Apple, Heart, Instagram, Play, Star } from "lucide-react";
import { Newsletter } from "@/components/marketing/newsletter";

export const metadata: Metadata = {
  title: "Get Mibbles",
  description:
    "Get Mibbles for iPhone, join the Android list, and meet the cats who love to play.",
  alternates: { canonical: "/download" },
};

const reviews = [
  {
    quote: "Worth it just for the fish screen. My cat is obsessed.",
    byline: "Jamie L. · cat parent to Biscuit",
  },
  {
    quote: "Luna finally has something that holds her attention indoors.",
    byline: "Sarah K. · cat parent to Luna",
  },
  {
    quote: "The easiest enrichment habit we have actually kept up with.",
    byline: "Priya R. · cat parent to Saffron",
  },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#fffaf7] text-[#17141d]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(255,178,198,.38),transparent_28%),radial-gradient(circle_at_92%_28%,rgba(99,220,222,.24),transparent_30%),radial-gradient(circle_at_15%_88%,rgba(255,184,91,.2),transparent_30%)]" />

      <main className="relative mx-auto w-full max-w-[520px] px-5 pb-12 pt-7 sm:px-7">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Mibbles home">
            <Image src="/images/app-icon.png" alt="" width={42} height={42} className="rounded-[13px] shadow-card" />
            <span className="font-serif text-2xl font-semibold tracking-tight">Mibbles</span>
          </Link>
          <a
            href="https://tiktok.com/@mibblesapp"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold backdrop-blur"
          >
            @mibblesapp
          </a>
        </header>

        <section className="pt-12 text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 text-xs font-bold text-black/60 shadow-card backdrop-blur">
            <Heart className="h-3.5 w-3.5 fill-[#ef73aa] text-[#ef73aa]" /> Made for happier indoor cats
          </div>
          <h1 className="font-sans text-[43px] font-black leading-[.98] tracking-[-.055em] sm:text-5xl">
            Your cat&apos;s new
            <span className="block bg-gradient-to-r from-[#ee6ba9] via-[#ff8a48] to-[#32aebd] bg-clip-text text-transparent">
              favorite screen.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[390px] text-[15px] leading-relaxed text-black/58">
            Six playful modes, Cat Cam replays, and a simple daily wellness routine—all in one app.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href="/#waitlist"
              className="flex min-h-16 items-center rounded-[22px] bg-black px-5 text-left text-white shadow-[0_18px_40px_-18px_rgba(0,0,0,.55)] transition-transform hover:-translate-y-0.5"
            >
              <Apple className="mr-4 h-7 w-7 fill-white" strokeWidth={1.5} />
              <span className="flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-[.16em] text-white/55">iPhone &amp; iPad</span>
                <span className="block text-lg font-black">Get notified for iOS</span>
              </span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="/#waitlist"
              className="flex min-h-16 items-center rounded-[22px] border border-black/10 bg-white/85 px-5 text-left shadow-card backdrop-blur transition-transform hover:-translate-y-0.5"
            >
              <Play className="mr-4 h-7 w-7 fill-[#67cfc8] text-[#67cfc8]" strokeWidth={1.5} />
              <span className="flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-[.16em] text-black/40">Android</span>
                <span className="block text-lg font-black">Join the Android list</span>
              </span>
              <ArrowRight className="h-5 w-5 text-black/35" />
            </a>
          </div>
          <p className="mt-3 text-[11px] font-medium text-black/38">Launching first on iOS · Android updates by email</p>
        </section>

        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#dc5e94]">Early cat parents</p>
              <h2 className="mt-1 font-sans text-2xl font-black tracking-[-.035em]">The reviews are in.</h2>
            </div>
            <div className="flex gap-0.5 pb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#ffab45] text-[#ffab45]" />
              ))}
            </div>
          </div>
          <div className="flex snap-x gap-3 overflow-x-auto pb-3 no-scrollbar">
            {reviews.map((review) => (
              <figure key={review.byline} className="w-[82%] shrink-0 snap-start rounded-[24px] border border-black/[.06] bg-white/82 p-5 shadow-card backdrop-blur">
                <blockquote className="text-[17px] font-bold leading-snug tracking-[-.02em]">“{review.quote}”</blockquote>
                <figcaption className="mt-4 text-[11px] font-medium text-black/42">{review.byline}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#32aebd]">Mibbles moments</p>
          <h2 className="mt-1 font-sans text-2xl font-black tracking-[-.035em]">Made for the camera roll.</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[28px] bg-[#f1b5a1] shadow-card">
              <Image src="/images/cats/cat-cam.png" alt="A curious orange cat captured by Cat Cam" fill sizes="(max-width: 520px) 90vw, 500px" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5 pt-14 text-left text-white">
                <p className="text-xs font-black uppercase tracking-[.16em]">Cat Cam preview</p>
                <p className="mt-1 text-sm text-white/75">Every reaction deserves a replay.</p>
              </div>
            </div>
            <a href="mailto:hello@mibbles.app?subject=My%20Mibbles%20cat" className="group flex aspect-square flex-col justify-between rounded-[26px] bg-gradient-to-br from-[#ffc1db] to-[#f279ac] p-5 text-left text-white shadow-card">
              <Instagram className="h-6 w-6" />
              <div>
                <p className="text-lg font-black leading-tight">Share your cat</p>
                <p className="mt-1 text-xs text-white/75">Send us a Mibbles moment</p>
              </div>
            </a>
            <div className="flex aspect-square flex-col justify-between rounded-[26px] bg-gradient-to-br from-[#6ce1d5] to-[#429cd6] p-5 text-left text-white shadow-card">
              <span className="text-2xl">🐾</span>
              <div>
                <p className="text-lg font-black leading-tight">Your cat here</p>
                <p className="mt-1 text-xs text-white/75">Community gallery opening soon</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-[30px] bg-[#17141d] px-6 py-8 text-white shadow-[0_25px_65px_-30px_rgba(0,0,0,.75)]">
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#ef8ab8]">Our mission</p>
          <h2 className="mt-3 font-serif text-[32px] leading-[1.04] tracking-[-.035em] text-white">
            Better indoor days. Longer, happier lives.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            We&apos;re building Mibbles to make daily enrichment easy, joyful, and accessible—so every indoor cat gets more chances to play, hunt, move, and connect.
          </p>
          <div className="mt-7 border-t border-white/10 pt-6">
            <p className="mb-3 text-xs font-bold text-white/70">Be first to know when Mibbles is ready.</p>
            <Newsletter source="download-page" variant="inline" />
          </div>
        </section>

        <footer className="pb-2 pt-10 text-center text-[11px] text-black/38">
          <p>© {new Date().getFullYear()} Mibbles · Made with care for cats everywhere.</p>
          <div className="mt-3 flex justify-center gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/support">Support</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
