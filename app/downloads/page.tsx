import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Get Mibbles from TikTok",
  description: "Open this page in your browser to download Mibbles from the App Store.",
  robots: { index: false, follow: false },
};

const steps = [
  {
    number: "1",
    title: "Tap the ··· menu",
    detail: "in the top right corner",
  },
  {
    number: "2",
    title: "Select “Open in browser”",
    detail: "This opens the page in Safari, where the App Store link works.",
  },
  {
    number: "3",
    title: "Tap the button below",
    detail: "to get Mibbles from the App Store.",
  },
];

export default function TikTokDownloadPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#fffdf7] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] text-[#11131b]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-[radial-gradient(ellipse_at_50%_0%,#fff0bf_0%,rgba(255,253,247,0)_72%)]" />
      <div className="relative mx-auto w-full max-w-[460px]">
        <header className="flex justify-center">
          <Image src="/images/mibbles-wordmark.png" alt="Mibbles" width={1987} height={607} priority className="h-8 w-auto" />
        </header>

        <section className="mx-auto mt-7 max-w-[390px] text-center">
          <h1 className="text-[34px] font-black leading-[1.02] tracking-[-.055em] min-[390px]:text-[39px]">
            You&apos;re in TikTok!
          </h1>
          <p className="mx-auto mt-3 max-w-[350px] text-[17px] leading-[1.4] text-[#5d626d]">
            TikTok may block direct App Store links. Open this page in your browser and you can get Mibbles in a few taps.
          </p>
        </section>

        <ol className="mx-auto mt-6 max-w-[390px] space-y-3 rounded-[26px] border border-[#eeeaf5] bg-[#f8f7fc] p-4 min-[390px]:p-5">
          {steps.map((step) => (
            <li key={step.number} className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#11131b] text-sm font-black text-white">{step.number}</span>
              <div className="pt-0.5">
                <p className="text-[15px] font-bold leading-tight">{step.title}</p>
                <p className="mt-1 text-[13px] leading-snug text-[#686c77]">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <a
          href={siteConfig.appStoreUrl}
          className="mx-auto mt-5 flex min-h-[68px] max-w-[390px] items-center justify-center gap-3 rounded-full bg-black px-6 text-white shadow-[0_14px_30px_-16px_rgba(0,0,0,.65)] transition-transform active:scale-[.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#2c8cff]"
          aria-label="Download Mibbles on the App Store"
          data-analytics="app_store_cta"
          data-location="tiktok_download"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0 fill-current" aria-hidden="true">
            <path d="M16.37 12.65c.02 2.16 1.9 2.88 1.92 2.89-.02.05-.3 1.03-.99 2.04-.6.87-1.23 1.74-2.22 1.76-.97.02-1.29-.57-2.41-.57s-1.47.55-2.39.59c-.96.04-1.68-.94-2.29-1.81-1.25-1.8-2.2-5.08-.92-7.3.63-1.1 1.76-1.8 2.98-1.82.93-.02 1.81.63 2.39.63.57 0 1.65-.78 2.78-.66.47.02 1.8.19 2.65 1.44-.07.04-1.58.92-1.56 2.81ZM14.55 6.92c.5-.61.84-1.46.75-2.31-.73.03-1.61.49-2.13 1.1-.47.54-.89 1.4-.78 2.22.82.06 1.66-.41 2.16-1.01Z" />
          </svg>
          <span className="text-left leading-none">
            <span className="block text-[12px] font-medium text-white/75">Download on the</span>
            <span className="mt-1 block text-[23px] font-bold tracking-[-.03em]">App Store</span>
          </span>
          <span className="ml-1 text-3xl leading-none" aria-hidden="true">›</span>
        </a>

        <p className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-[#e4f5e7] px-4 py-2 text-[12px] font-semibold text-[#355b43]">
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M5.5 8V6a4.5 4.5 0 0 1 9 0v2h.75A1.75 1.75 0 0 1 17 9.75v7.5A1.75 1.75 0 0 1 15.25 19h-10A1.75 1.75 0 0 1 3.5 17.25v-7.5A1.75 1.75 0 0 1 5.25 8h.25Zm2 0h5V6a2.5 2.5 0 0 0-5 0v2Z" /></svg>
          Safe &amp; secure · Official App Store link
        </p>
      </div>
    </main>
  );
}
