import type { Metadata } from "next";
import { LiveCanvas } from "@/components/live/live-canvas";

export const metadata: Metadata = {
  title: "Mibbles LIVE — interactive play for cats",
  description: "A continuously running, real-time interactive world for cats. Broadcast source for the Mibbles TikTok LIVE.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-static";

/**
 * Public broadcast surface. No nav, no footer, no cursor, no scroll.
 * TikTok LIVE Studio captures this page in a full-screen browser window.
 */
export default function LivePage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#101010]">
      <LiveCanvas />
    </div>
  );
}
