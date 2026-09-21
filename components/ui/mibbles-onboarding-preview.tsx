"use client";

import * as React from "react";
import {
  ArrowRight,
  EyeOff,
  MoonStar,
  Rabbit,
  Sparkles,
  Tornado,
  Waves,
} from "lucide-react";
import { cn } from "@/lib/utils";

const modes = [
  { label: "Classic", Icon: Waves, gradient: "from-[#ff8bd0] to-[#df4fc0]" },
  { label: "Chase", Icon: Rabbit, gradient: "from-[#ffc766] to-[#ff8736]" },
  { label: "Pop", Icon: Sparkles, gradient: "from-[#65e6d5] to-[#39aada]" },
  { label: "Hide & Peek", Icon: EyeOff, gradient: "from-[#9f82ff] to-[#6943dd]" },
  { label: "Calm", Icon: MoonStar, gradient: "from-[#77d4ff] to-[#568cef]" },
  { label: "Chaos", Icon: Tornado, gradient: "from-[#ff8d9b] to-[#dc4fbd]" },
];

export function MibblesOnboardingPreview({ className }: { className?: string }) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % modes.length),
      1200
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/19] w-[280px] sm:w-[320px] md:w-[360px]",
        className
      )}
    >
      <div className="absolute -inset-10 -z-10 rounded-[5rem] bg-[radial-gradient(circle_at_20%_20%,rgba(255,158,74,.42),transparent_34%),radial-gradient(circle_at_80%_75%,rgba(87,126,255,.38),transparent_36%)] blur-2xl" />

      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-[#303035] to-black p-[10px] shadow-[0_30px_90px_-28px_rgba(0,0,0,.55)]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-white">
          <video
            className="absolute inset-x-0 top-0 h-[36%] w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/media/onboarding-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white" />

          <div className="absolute left-1/2 top-3 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black" />

          <div className="relative z-10 flex h-full flex-col px-5 pb-5 pt-[31%]">
            <div className="grid grid-cols-3 gap-2.5">
              {modes.map(({ label, Icon, gradient }, index) => (
                <div
                  key={label}
                  className={cn(
                    "flex aspect-[1.18/1] flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br text-white shadow-[0_9px_24px_-12px_rgba(56,20,70,.5)] transition-all duration-500",
                    gradient,
                    index === active
                      ? "-translate-y-1 scale-[1.045] ring-2 ring-white ring-offset-2 ring-offset-white/30"
                      : "scale-100 opacity-90"
                  )}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.8} />
                  <span className="whitespace-nowrap text-[9px] font-black sm:text-[10px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto text-center">
              <h3 className="font-sans text-[24px] font-black leading-[1.05] tracking-[-0.035em] text-[#14131c] sm:text-[28px]">
                Meet Mibbles.
                <br />
                Your cat&apos;s new best friend!
              </h3>
              <p className="mx-auto mt-3 max-w-[260px] text-[11px] font-medium leading-snug text-black/50 sm:text-xs">
                Six playful modes — from slow calm crawls to wild rainbow chaos.
                Tap any mode to feel its vibe.
              </p>

              <div className="mt-5 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-5 rounded-full bg-[#ef73aa]" />
                <span className="h-1.5 w-1.5 rounded-full bg-black/10" />
                <span className="h-1.5 w-1.5 rounded-full bg-black/10" />
                <span className="h-1.5 w-1.5 rounded-full bg-black/10" />
              </div>

              <div className="mt-4 flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#ef73aa] text-sm font-black text-white shadow-[0_16px_28px_-14px_rgba(239,115,170,.85)] sm:h-14 sm:text-base">
                Continue <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-[3px] top-24 h-12 w-[3px] rounded-l bg-[#28282d]" />
      <div className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r bg-[#28282d]" />
    </div>
  );
}
