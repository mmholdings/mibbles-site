import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  src?: string;
  alt?: string;
  className?: string;
  /** Optional fallback content when no screenshot is provided yet */
  children?: React.ReactNode;
}

/**
 * Tasteful iPhone 15 Pro mockup frame. Drop a screenshot into /public/screenshots
 * and pass the path as `src`. If no src is provided, renders a soft placeholder
 * so the layout reads correctly during dev.
 */
export function IPhoneMockup({ src, alt = "Mibbles app screenshot", className, children }: Props) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/19] w-[280px] sm:w-[320px] md:w-[360px]",
        className
      )}
    >
      {/* Outer titanium-style frame */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-ink-700 to-ink-900 p-[10px] shadow-2xl">
        {/* Inner bezel */}
        <div className="relative h-full w-full rounded-[2.5rem] bg-ink-900 overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 h-7 w-28 rounded-full bg-black" />

          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 768px) 360px, 280px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-terracotta-400 via-terracotta-500 to-ink-700 flex items-center justify-center text-cream/80 text-sm">
              {children ?? <span className="font-serif text-xl">Cat Mode</span>}
            </div>
          )}
        </div>
      </div>

      {/* Side buttons (decorative) */}
      <div className="absolute -left-[3px] top-24 h-12 w-[3px] rounded-l bg-ink-700" />
      <div className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r bg-ink-700" />
    </div>
  );
}
