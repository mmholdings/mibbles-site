import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Globe2, Link2, LockKeyhole, MoreHorizontal } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Get Mibbles from TikTok",
  description: "Open this page in your browser to download Mibbles from the App Store.",
  robots: { index: false, follow: false },
};

export default function TikTokDownloadPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#fffdf7] px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(.75rem,env(safe-area-inset-top))] text-[#10131a]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#fff0c8_0%,rgba(255,253,247,0)_48%),linear-gradient(180deg,#fffdf7,#fffdf8)]" />
      <div className="relative mx-auto w-full max-w-[460px] sm:rounded-[46px] sm:border-[8px] sm:border-[#171719] sm:bg-[#fffdf7] sm:px-2 sm:pb-7 sm:shadow-[0_35px_80px_-35px_rgba(0,0,0,.45)]">
        <header className="relative z-10 flex items-center justify-center gap-2 pt-1">
          <Image src="/images/mibbles-wordmark.png" alt="Mibbles" width={1987} height={607} priority className="h-[27px] w-auto" />
          <span className="mt-1 text-[12px] font-semibold text-[#56544f]">@mibblescat</span>
        </header>

        <section className="relative mx-auto mt-1 aspect-[1.05] max-w-[420px] overflow-hidden rounded-t-[28px] text-center" aria-label="Mibbles TikTok download guide">
          <Image src="/images/tiktok-kitten-guide.png" alt="A curious tabby cat peeking over the download guide" fill priority sizes="(max-width: 460px) 100vw, 420px" className="object-cover object-top" />
          <div className="absolute inset-x-3 top-[49%]">
            <h1 className="text-[34px] font-black leading-[.98] tracking-[-.06em] min-[390px]:text-[42px]">You&apos;re in TikTok!</h1>
            <p className="mx-auto mt-3 max-w-[350px] text-[16px] font-medium leading-[1.28] tracking-[-.025em] text-[#141720] min-[390px]:text-[17px]">
              TikTok doesn&apos;t allow direct<br className="hidden min-[390px]:block" /> App Store downloads.
              <span className="mt-1 block text-[#626571]">But you can still get Mibbles<br className="hidden min-[390px]:block" /> in just a few taps!</span>
            </p>
          </div>
        </section>

        <section className="mx-auto -mt-1 max-w-[420px] overflow-hidden rounded-[26px] border border-[#ece9f3] bg-[#f7f6fc] px-4 pb-4 pt-4 shadow-[0_16px_42px_-36px_rgba(42,31,79,.4)] min-[390px]:px-5" aria-label="How to open Mibbles in your browser">
          <div className="flex gap-3">
            <StepNumber>1</StepNumber>
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-[16px] font-bold leading-tight min-[390px]:text-[18px]">Tap the ··· menu</p>
              <p className="mt-1 text-[14px] leading-tight text-[#686b75]">in the top right corner</p>
              <div className="relative mt-3 h-[94px] overflow-hidden rounded-t-[20px] bg-[linear-gradient(180deg,#f6f4fc,#f0eff8)]">
                <div className="absolute left-[12%] top-4 h-[135px] w-[105%] rotate-[-4deg] rounded-t-[48px] border-[8px] border-[#272729] bg-white shadow-[0_6px_20px_rgba(0,0,0,.15)]">
                  <span className="absolute left-5 top-4 text-[11px] font-semibold text-[#b3b4ba]">9:41</span>
                  <span className="absolute right-[76px] top-4 text-[11px] font-bold text-[#34353a]">▂▄▆ 5G</span>
                  <span className="absolute right-5 top-0 flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-[#f16b83] bg-white text-[#15161a] shadow-sm"><MoreHorizontal size={25} strokeWidth={3} /></span>
                </div>
                <ArrowDownRight className="absolute right-[63px] top-0 z-10 rotate-[-9deg] text-[#f16b83]" size={47} strokeWidth={3.5} />
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <StepNumber>2</StepNumber>
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-[16px] font-bold leading-tight min-[390px]:text-[18px]">Select “Open in browser”</p>
              <div className="mt-3 overflow-hidden rounded-[20px] bg-white shadow-[0_12px_28px_-20px_rgba(18,20,30,.45)]">
                <div className="flex items-center gap-3 px-4 py-3.5 text-[15px] font-semibold">
                  <Globe2 className="h-5 w-5 shrink-0 text-[#21232a]" />
                  <span className="flex-1">Open in browser</span>
                  <ArrowUpRight className="h-4 w-4 text-[#737782]" />
                </div>
                <div className="mx-4 h-px bg-[#efeff2]" />
                <div className="flex items-center gap-3 px-4 py-3 text-[14px] text-[#676a74]">
                  <Link2 className="h-4 w-4 shrink-0" /> Copy link
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <StepNumber>3</StepNumber>
            <div className="pt-1">
              <p className="text-[16px] font-bold leading-tight min-[390px]:text-[18px]">Then tap the button below</p>
              <p className="mt-1 text-[14px] leading-tight text-[#686b75]">to download Mibbles on the App Store.</p>
            </div>
          </div>
        </section>

        <a
          href={siteConfig.appStoreUrl}
          className="mx-auto mt-4 flex min-h-[74px] max-w-[420px] items-center justify-center gap-3 rounded-full bg-black px-6 text-white shadow-[0_15px_28px_-14px_rgba(0,0,0,.48)] transition-transform active:scale-[.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#2787ff]"
          aria-label="Download Mibbles on the App Store"
          data-analytics="app_store_cta"
          data-location="tiktok_download"
        >
          <AppleMark />
          <span className="text-left leading-none">
            <span className="block text-[13px] font-medium text-white/85">Download on the</span>
            <span className="mt-1 block text-[25px] font-bold tracking-[-.03em]">App Store</span>
          </span>
          <span className="ml-3 text-[34px] font-light leading-none" aria-hidden="true">›</span>
        </a>

        <p className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full bg-[#e3f5e7] px-4 py-2 text-[12px] font-semibold text-[#355b43]">
          <LockKeyhole className="h-4 w-4 fill-current" /> Safe &amp; secure <span className="text-[#93b8a0]">·</span> Official App Store link
        </p>

        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-7 flex rotate-[-14deg] gap-2 opacity-55">
          <span className="h-24 w-5 rounded-[100%] bg-[#b9e2ae]" /><span className="h-32 w-5 rounded-[100%] bg-[#c8edc0]" /><span className="h-20 w-5 rounded-[100%] bg-[#afdca8]" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-7 flex rotate-[14deg] gap-2 opacity-55">
          <span className="h-20 w-5 rounded-[100%] bg-[#afdca8]" /><span className="h-32 w-5 rounded-[100%] bg-[#c8edc0]" /><span className="h-24 w-5 rounded-[100%] bg-[#b9e2ae]" />
        </div>
      </div>
    </main>
  );
}

function StepNumber({ children }: { children: React.ReactNode }) {
  return <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#11131b] text-[16px] font-black text-white">{children}</span>;
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 shrink-0 fill-current" aria-hidden="true">
      <path d="M16.37 12.65c.02 2.16 1.9 2.88 1.92 2.89-.02.05-.3 1.03-.99 2.04-.6.87-1.23 1.74-2.22 1.76-.97.02-1.29-.57-2.41-.57s-1.47.55-2.39.59c-.96.04-1.68-.94-2.29-1.81-1.25-1.8-2.2-5.08-.92-7.3.63-1.1 1.76-1.8 2.98-1.82.93-.02 1.81.63 2.39.63.57 0 1.65-.78 2.78-.66.47.02 1.8.19 2.65 1.44-.07.04-1.58.92-1.56 2.81ZM14.55 6.92c.5-.61.84-1.46.75-2.31-.73.03-1.61.49-2.13 1.1-.47.54-.89 1.4-.78 2.22.82.06 1.66-.41 2.16-1.01Z" />
    </svg>
  );
}
