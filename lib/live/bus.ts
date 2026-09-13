/**
 * Mibbles LIVE — event bus.
 *
 * Transports:
 *   • BroadcastChannel  — same browser (admin tab ↔ live tab on the broadcast PC).
 *   • Supabase Realtime — cross-machine (admin on your laptop → live page on the
 *     Windows mini PC; TikTok connector → live page). Uses *broadcast* channels
 *     only: no tables, no RLS, publishable key is safe in the browser.
 *
 * Both transports carry the same normalized MibblesEvent. The live page
 * subscribes to both; publishers can use either. Reconnects automatically.
 */
import type { MibblesEvent } from "./types";

export const CHANNEL_NAME = "mibbles-live";
const BC_NAME = "mibbles-live-bus";

export type BusStatus = "connected" | "disconnected" | "local-only";

type Listener = (ev: MibblesEvent) => void;
type StatusListener = (s: BusStatus, detail?: string) => void;

export interface BusOptions {
  supabaseUrl?: string;
  supabaseKey?: string;
  /** Identifies this client in logs. */
  role: "live" | "admin" | "connector";
}

export function makeEventId(prefix = "ev") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export class LiveBus {
  private listeners = new Set<Listener>();
  private statusListeners = new Set<StatusListener>();
  private bc: BroadcastChannel | null = null;
  private supa: any = null;          // SupabaseClient (lazy import keeps bundle small)
  private channel: any = null;       // RealtimeChannel
  private status: BusStatus = "local-only";
  private stopped = false;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  reconnects = 0;
  private backoffMs = 1500;

  constructor(private opts: BusOptions) {}

  async start() {
    this.stopped = false;
    if (typeof BroadcastChannel !== "undefined") {
      this.bc = new BroadcastChannel(BC_NAME);
      this.bc.onmessage = (m) => { if (m?.data?.type) this.emit(m.data as MibblesEvent); };
    }
    if (this.opts.supabaseUrl && this.opts.supabaseKey) {
      await this.connectSupabase();
    } else {
      this.setStatus("local-only", "no supabase env; BroadcastChannel only");
    }
  }

  stop() {
    this.stopped = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.bc?.close(); this.bc = null;
    try { this.channel?.unsubscribe?.(); } catch {}
    this.channel = null;
  }

  private async connectSupabase() {
    try {
      if (!this.supa) {
        const { createClient } = await import("@supabase/supabase-js");
        this.supa = createClient(this.opts.supabaseUrl!, this.opts.supabaseKey!, {
          auth: { persistSession: false, autoRefreshToken: false },
          realtime: { params: { eventsPerSecond: 50 } },
        });
      }
      try { this.channel?.unsubscribe?.(); } catch {}
      this.channel = this.supa.channel(CHANNEL_NAME, { config: { broadcast: { self: false, ack: false } } });
      this.channel
        .on("broadcast", { event: "mibbles" }, (msg: any) => {
          const ev = msg?.payload as MibblesEvent | undefined;
          if (ev?.type) this.emit(ev);
        })
        .subscribe((state: string, err?: Error) => {
          if (state === "SUBSCRIBED") { this.backoffMs = 1500; this.setStatus("connected"); }
          else if (state === "CHANNEL_ERROR" || state === "TIMED_OUT" || state === "CLOSED") {
            this.setStatus("disconnected", err?.message ?? state);
            this.scheduleReconnect();
          }
        });
    } catch (e) {
      this.setStatus("disconnected", (e as Error).message);
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.stopped || this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.reconnects++;
      this.backoffMs = Math.min(this.backoffMs * 1.7, 30000);
      this.connectSupabase();
    }, this.backoffMs);
  }

  /** Force a reconnect (admin control). */
  reconnect() {
    if (!this.opts.supabaseUrl) return;
    this.reconnects++;
    this.connectSupabase();
  }

  getStatus() { return this.status; }
  private setStatus(s: BusStatus, detail?: string) {
    this.status = s;
    for (const l of this.statusListeners) l(s, detail);
  }

  onEvent(l: Listener) { this.listeners.add(l); return () => this.listeners.delete(l); }
  onStatus(l: StatusListener) { this.statusListeners.add(l); l(this.status); return () => this.statusListeners.delete(l); }

  private emit(ev: MibblesEvent) { for (const l of this.listeners) { try { l(ev); } catch {} } }

  /** Publish to every available transport. Local listeners also receive it. */
  publish(ev: MibblesEvent) {
    this.emit(ev);
    try { this.bc?.postMessage(ev); } catch {}
    if (this.channel && this.status === "connected") {
      try { this.channel.send({ type: "broadcast", event: "mibbles", payload: ev }); } catch {}
    }
  }
}
