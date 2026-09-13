#!/usr/bin/env tsx
/**
 * Mibbles LIVE — TikTok connector (runs on the broadcast PC, or anywhere).
 *
 * Bridges a TikTok LIVE event source → Supabase broadcast channel → /live page.
 *
 *   TIKTOK_USERNAME=mibbles \
 *   NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
 *   tsx scripts/tiktok-connector.ts
 *
 * PROVIDER POLICY
 * ───────────────
 * The core game only consumes normalized events (lib/live/tiktok-adapter.ts).
 * This file is the *only* place a TikTok library is referenced, and it is
 * loaded dynamically by name from TIKTOK_PROVIDER so it can be swapped or
 * removed without touching the game. Use only a provider that is permitted for
 * your account/environment at deploy time. If no compliant provider is
 * available, run without one: the world stays fully autonomous and the admin
 * panel + simulator keep working.
 *
 * Providers ship as small modules under scripts/providers/<name>.ts exporting
 * `default: TikTokSource`. None are bundled here on purpose.
 */
import { createClient } from "@supabase/supabase-js";
import { CHANNEL_NAME } from "../lib/live/bus";
import type { TikTokSource } from "../lib/live/tiktok-adapter";
import type { MibblesEvent } from "../lib/live/types";

const username = process.env.TIKTOK_USERNAME;
const providerName = process.env.TIKTOK_PROVIDER; // e.g. "example-provider"
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) { console.error("Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"); process.exit(1); }
if (!username) { console.error("Set TIKTOK_USERNAME"); process.exit(1); }

const supa = createClient(url, key, { auth: { persistSession: false } });
const channel = supa.channel(CHANNEL_NAME, { config: { broadcast: { self: false } } });

let sent = 0;
const publish = (ev: MibblesEvent) => {
  channel.send({ type: "broadcast", event: "mibbles", payload: ev });
  if (++sent % 50 === 0) console.log(`[connector] ${sent} events forwarded`);
};

async function main() {
  await new Promise<void>((resolve) => channel.subscribe((s) => { if (s === "SUBSCRIBED") resolve(); }));
  console.log(`[connector] connected to Supabase channel "${CHANNEL_NAME}"`);

  if (!providerName) {
    console.log("[connector] TIKTOK_PROVIDER not set — idle. The live page runs autonomously; use /live/admin to test.");
    setInterval(() => {}, 1 << 30);
    return;
  }

  let source: TikTokSource;
  try {
    const mod = await import(`./providers/${providerName}.ts`);
    source = mod.default as TikTokSource;
  } catch (e) {
    console.error(`[connector] provider "${providerName}" not found under scripts/providers/. ${(e as Error).message}`);
    process.exit(1);
  }

  const connectWithRetry = async (attempt = 0) => {
    try {
      await source.connect(username!, publish, (s) => console.log(`[${source.name}] ${s}`));
      console.log(`[connector] ${source.name} connected to @${username}`);
    } catch (e) {
      const wait = Math.min(60000, 2000 * 2 ** attempt);
      console.warn(`[connector] connect failed (${(e as Error).message}); retrying in ${wait / 1000}s`);
      setTimeout(() => connectWithRetry(attempt + 1), wait);
    }
  };
  connectWithRetry();

  process.on("SIGINT", async () => { await source.disconnect().catch(() => {}); process.exit(0); });
}

main().catch((e) => { console.error(e); process.exit(1); });
