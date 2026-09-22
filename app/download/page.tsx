import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { StoreButtons } from "@/components/download/store-buttons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Download Mibbles",
  description: "Download Mibbles for interactive cat play and mental stimulation.",
  alternates: { canonical: "/download" },
};

const reviews = [
  {
    quote: "Worth it just for the fish screen. My cat is OBSESSED.",
    author: "Jamie L.",
    detail: "cat parent to Biscuit",
    color: "bg-[#f9d7b0]",
  },
  {
    quote: "Luna went from pacing the apartment to actually watching the bird channel for 20 minutes.",
    author: "Sarah K.",
    detail: "cat parent to Luna",
    color: "bg-[#cdebe2]",
  },
  {
    quote: "My vet recommended more enrichment for our anxious rescue. Mibbles is the easiest piece of the routine to actually keep up with.",
    author: "Priya R.",
    detail: "cat parent to Saffron",
    color: "bg-[#ead8f5]",
  },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#eaf8f1] text-[#111]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_8%_4%,rgba(255,255,255,.96),transparent_28%),radial-gradient(circle_at_90%_15%,rgba(189,236,220,.65),transparent_30%),linear-gradient(180deg,#effbf5_0%,#f9fcfa_58%,#edf8f2_100%)]" />

      <main className="relative mx-auto w-full max-w-[560px] bg-white/45 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] min-[375px]:px-5 sm:px-7 sm:shadow-[0_0_80px_-45px_rgba(16,72,50,.35)]">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Mibbles home">
            <Image src="/images/app-icon.png" alt="" width={44} height={44} priority className="rounded-[14px] shadow-card" />
            <div>
              <span className="block text-[24px] font-black leading-none tracking-[-.04em]">Mibbles</span>
              <span className="mt-1 block text-[13px] font-medium text-black/42">@mibblescat</span>
            </div>
          </Link>
          <a
            href={siteConfig.links.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/10 bg-white/75 px-3.5 py-2 text-xs font-bold shadow-card backdrop-blur"
          >
            TikTok
          </a>
        </header>

        <section className="pt-8 min-[375px]:pt-10">
          <h1 className="max-w-[470px] font-sans text-[44px] font-black leading-[.94] tracking-[-.06em] min-[375px]:text-[50px] sm:text-[56px]">
            Your cat&apos;s new favorite screen.
          </h1>
          <p className="mt-4 max-w-[430px] text-[19px] font-medium leading-[1.3] tracking-[-.02em] text-black/68 min-[375px]:text-[21px]">
            Interactive play and mental stimulation made for cats.
          </p>

          <div className="mt-6">
            <StoreButtons
              appleUrl={siteConfig.appStoreUrl}
              googlePlayUrl={siteConfig.googlePlayUrl}
              location="hero"
            />
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-black/55">
            <PawPrint className="h-4 w-4 fill-[#84b9a7] text-[#84b9a7]" /> Loved by cats &amp; their humans
          </p>
        </section>

        <section className="relative mt-7 aspect-[1.12/1] overflow-hidden rounded-[32px] border border-white/75 bg-[linear-gradient(145deg,#d9f5e9,#f6fff9_58%,#f6e9df)] shadow-[0_25px_60px_-36px_rgba(25,77,56,.48)]" aria-label="Mibbles gameplay preview">
          <div className="absolute -left-10 top-8 h-44 w-44 rounded-full bg-white/65 blur-2xl" />
          <div className="absolute left-[9%] top-[5%] z-10 w-[48%] rotate-[-7deg] rounded-[27px] border-[6px] border-[#1a1a1a] bg-[#111] p-1 shadow-[0_24px_45px_-18px_rgba(0,0,0,.6)]">
            <div className="relative aspect-[9/18.7] overflow-hidden rounded-[18px] bg-white">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Animated Mibbles app preview"
              >
                <source src="/media/onboarding-hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-x-2 top-[38%] grid grid-cols-2 gap-1.5" aria-hidden="true">
                {[
                  ["Classic", "#ec73bc"],
                  ["Chase", "#ff9d48"],
                  ["Pop", "#49cad4"],
                  ["Peek", "#8a65e9"],
                  ["Calm", "#63bbed"],
                  ["Chaos", "#ec67a8"],
                ].map(([label, color]) => (
                  <span key={label} className="flex h-7 items-center justify-center rounded-md text-[6px] font-black text-white shadow-sm" style={{ backgroundColor: color }}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-[2%] -right-[16%] z-20 h-[62%] w-[86%] overflow-hidden [mask-image:radial-gradient(ellipse_at_66%_68%,black_38%,transparent_76%)]">
            <Image
              src="/images/cats/cat-cam.png"
              alt="A curious cat reaching toward Mibbles"
              fill
              sizes="(max-width: 560px) 78vw, 440px"
              className="object-cover object-[58%_54%]"
            />
          </div>
          <p className="absolute bottom-5 left-5 z-30 rotate-[-7deg] text-[12px] font-black uppercase leading-tight tracking-[.12em] text-black/48">
            Tap. Chase.<br />Play. Repeat.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-sans text-[31px] font-black leading-none tracking-[-.05em] min-[375px]:text-[35px]">
            Cats are already obsessed.
          </h2>
          <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 no-scrollbar">
            {reviews.map((review) => (
              <figure
                key={review.author}
                className="w-[82%] shrink-0 snap-start rounded-[25px] border border-black/[.055] bg-white/88 p-5 shadow-[0_16px_35px_-27px_rgba(0,0,0,.5)] backdrop-blur min-[430px]:w-[72%]"
              >
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${review.color}`}>
                  <PawPrint className="h-5 w-5 text-black/55" />
                </div>
                <blockquote className="text-[17px] font-bold leading-[1.28] tracking-[-.025em]">“{review.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-black/48">
                  <span className="font-bold text-black/70">— {review.author}</span><br />
                  {review.detail}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="relative mt-7 overflow-hidden rounded-[32px] border border-white/80 bg-[linear-gradient(135deg,#d7f5e8,#ecfbf4)] px-4 py-7 shadow-card min-[375px]:px-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-24 rotate-[-28deg] rounded-[55%_45%_62%_38%/70%_55%_45%_30%] bg-[#151515]">
            <span className="absolute left-5 top-5 h-2.5 w-2.5 rounded-full bg-white" />
            <span className="absolute left-9 top-6 h-2 w-2 rounded-full bg-white" />
          </div>
          <h2 className="relative font-sans text-[38px] font-black leading-none tracking-[-.055em]">Ready to play?</h2>
          <div className="relative mt-5">
            <StoreButtons
              appleUrl={siteConfig.appStoreUrl}
              googlePlayUrl={siteConfig.googlePlayUrl}
              location="bottom_cta"
              compact
            />
          </div>
          <p className="relative mt-4 text-center text-sm font-medium text-black/48">Same happy cats. More playtime. ♥</p>
        </section>

        <footer className="flex flex-col items-center justify-between gap-3 pb-1 pt-8 text-[11px] font-medium uppercase tracking-[.08em] text-black/38 min-[400px]:flex-row">
          <p>© {new Date().getFullYear()} Mibbles</p>
          <nav className="flex gap-4" aria-label="Legal">
            <Link href="/privacy" className="hover:text-black">Privacy</Link>
            <Link href="/terms" className="hover:text-black">Terms</Link>
            <Link href="/support" className="hover:text-black">Support</Link>
          </nav>
        </footer>
      </main>
    </div>
  );
}
