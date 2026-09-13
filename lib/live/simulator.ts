/**
 * Mibbles LIVE — TikTok traffic simulator.
 * Generates realistic-ish normalized events so every behaviour can be tested
 * without being live. Runs in the admin tab and publishes through the bus.
 */
import { makeEventId } from "./bus";
import type { MibblesEvent } from "./types";

export type ScenarioId =
  | "none" | "slowLikes" | "rapidLikes" | "commentBurst" | "followBurst"
  | "smallGifts" | "giftStreak" | "largeGift" | "viral" | "stress";

export const SCENARIOS: { id: ScenarioId; label: string; desc: string }[] = [
  { id: "none", label: "No traffic", desc: "Stop all simulated events (autonomous mode only)." },
  { id: "slowLikes", label: "Slow likes", desc: "~1 like every 1.5s — a quiet LIVE." },
  { id: "rapidLikes", label: "Rapid likes", desc: "~30 likes/s in batches — a cat tapping the screen." },
  { id: "commentBurst", label: "Comment burst", desc: "15 comments over 5s." },
  { id: "followBurst", label: "Follow burst", desc: "6 follows over 6s." },
  { id: "smallGifts", label: "Small gifts", desc: "Roses every ~4s." },
  { id: "giftStreak", label: "Gift streak", desc: "One user sends 20 roses in a streak." },
  { id: "largeGift", label: "Large gift", desc: "One high-value gift → Mayhem." },
  { id: "viral", label: "Viral traffic", desc: "Sustained: 200 likes/s, 5 comments/s, follows, gifts — 30s." },
  { id: "stress", label: "Stress test", desc: "5,000 likes + 300 comments + 40 events in ~3s." },
];

const now = () => Date.now();
const ev = (partial: Omit<MibblesEvent, "id" | "ts" | "source">): MibblesEvent =>
  ({ id: makeEventId("sim"), ts: now(), source: "simulator", ...partial });

export class Simulator {
  private timers: ReturnType<typeof setTimeout>[] = [];
  private intervals: ReturnType<typeof setInterval>[] = [];
  current: ScenarioId = "none";

  constructor(private publish: (e: MibblesEvent) => void) {}

  stop() {
    this.timers.forEach(clearTimeout); this.intervals.forEach(clearInterval);
    this.timers = []; this.intervals = []; this.current = "none";
  }

  private every(ms: number, fn: () => void, forMs?: number) {
    const id = setInterval(fn, ms); this.intervals.push(id);
    if (forMs) this.timers.push(setTimeout(() => clearInterval(id), forMs));
  }
  private after(ms: number, fn: () => void) { this.timers.push(setTimeout(fn, ms)); }

  run(id: ScenarioId) {
    this.stop();
    this.current = id;
    const p = this.publish;
    switch (id) {
      case "none": break;
      case "slowLikes": this.every(1500, () => p(ev({ type: "like", n: 1 }))); break;
      case "rapidLikes": this.every(250, () => p(ev({ type: "like", n: 6 + Math.floor(Math.random() * 6) }))); break;
      case "commentBurst":
        for (let i = 0; i < 15; i++) this.after(i * 330, () => p(ev({ type: "comment", text: "omg my cat is staring", user: `viewer${i}` })));
        this.after(5200, () => (this.current = "none"));
        break;
      case "followBurst":
        for (let i = 0; i < 6; i++) this.after(i * 1000, () => p(ev({ type: "follow", user: `newfan${i}` })));
        this.after(6500, () => (this.current = "none"));
        break;
      case "smallGifts": this.every(4000, () => p(ev({ type: "gift", giftName: "Rose", giftValue: 1, count: 1 }))); break;
      case "giftStreak":
        for (let i = 1; i <= 20; i++) this.after(i * 120, () => p(ev({ type: "gift", giftName: "Rose", giftValue: 1, count: 1 })));
        this.after(3000, () => (this.current = "none"));
        break;
      case "largeGift":
        p(ev({ type: "gift", giftName: "Galaxy", giftValue: 1000, count: 1 }));
        this.current = "none";
        break;
      case "viral":
        this.every(100, () => p(ev({ type: "like", n: 20 })), 30000);
        this.every(200, () => p(ev({ type: "comment", text: "🔥" })), 30000);
        this.every(1500, () => p(ev({ type: "follow" })), 30000);
        this.every(2500, () => p(ev({ type: "gift", giftName: "Rose", giftValue: 1, count: 1 + Math.floor(Math.random() * 5) })), 30000);
        this.after(12000, () => p(ev({ type: "gift", giftName: "Lion", giftValue: 2999, count: 1 })));
        this.after(30500, () => (this.current = "none"));
        break;
      case "stress":
        for (let i = 0; i < 100; i++) this.after(i * 30, () => p(ev({ type: "like", n: 50 })));
        for (let i = 0; i < 300; i++) this.after(i * 10, () => p(ev({ type: "comment", text: "x" })));
        for (let i = 0; i < 20; i++) this.after(i * 100, () => p(ev({ type: "follow" })));
        for (let i = 0; i < 20; i++) this.after(i * 120, () => p(ev({ type: "gift", giftName: "Rose", giftValue: 1, count: 3 })));
        this.after(3500, () => (this.current = "none"));
        break;
    }
  }
}
