/**
 * Mibbles LIVE — TikTok event adapter contract.
 *
 * The world never talks to TikTok. A connector implements `TikTokSource`,
 * normalizes whatever the provider emits into MibblesEvents, and publishes them
 * onto the bus (Supabase broadcast channel `mibbles-live`).
 *
 * Swap providers by writing another `TikTokSource`. Nothing else changes.
 */
import type { MibblesEvent } from "./types";

export interface TikTokSource {
  name: string;
  connect(username: string, onEvent: (ev: MibblesEvent) => void, onStatus: (s: string) => void): Promise<void>;
  disconnect(): Promise<void>;
}

/** Map a raw provider payload → normalized event. Keep this pure and defensive. */
export function normalizeTikTokEvent(kind: string, raw: any): MibblesEvent | null {
  const ts = Date.now();
  const id = `tt-${kind}-${raw?.msgId ?? raw?.id ?? ts}-${Math.random().toString(36).slice(2, 7)}`;
  const base = { ts, id, source: "tiktok" as const };
  switch (kind) {
    case "like": return { ...base, type: "like", n: clampInt(raw?.likeCount ?? raw?.count ?? 1, 1, 5000), user: raw?.uniqueId };
    case "chat": case "comment": return { ...base, type: "comment", text: String(raw?.comment ?? raw?.text ?? "").slice(0, 200), user: raw?.uniqueId };
    case "follow": return { ...base, type: "follow", user: raw?.uniqueId };
    case "share": return { ...base, type: "share", user: raw?.uniqueId };
    case "member": case "join": return { ...base, type: "join", user: raw?.uniqueId };
    case "gift": {
      // Providers usually emit repeat updates during a streak; only forward the final one.
      if (raw?.repeatEnd === false && raw?.giftType === 1) return null;
      return {
        ...base, type: "gift",
        giftName: String(raw?.giftName ?? raw?.gift?.name ?? "gift"),
        giftValue: clampInt(raw?.diamondCount ?? raw?.gift?.diamond_count ?? 1, 1, 100000),
        count: clampInt(raw?.repeatCount ?? 1, 1, 10000),
        user: raw?.uniqueId,
      };
    }
    default: return null;
  }
}

function clampInt(v: unknown, a: number, b: number) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.max(a, Math.min(b, n)) : a;
}
