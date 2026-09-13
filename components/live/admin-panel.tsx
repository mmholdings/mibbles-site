"use client";

import * as React from "react";
import { LiveBus, makeEventId } from "@/lib/live/bus";
import { DEFAULT_CONFIG } from "@/lib/live/config";
import { SCENARIOS, Simulator, type ScenarioId } from "@/lib/live/simulator";
import type { AdminCommand, HealthSnapshot, LiveConfig, MibblesEvent, PreyKind } from "@/lib/live/types";
import { LiveCanvas } from "./live-canvas";

const PREY: { kind: PreyKind; label: string; color: string }[] = [
  { kind: "bug", label: "Yellow bug", color: "#FFD84A" },
  { kind: "butterfly", label: "Blue butterfly", color: "#3C8CFF" },
  { kind: "green", label: "Green prey", color: "#4CBB4C" },
  { kind: "mouse", label: "Mouse", color: "#4A4A4A" },
  { kind: "laser", label: "Laser dot", color: "#FF3B3B" },
  { kind: "string", label: "String", color: "#F2A0B0" },
];

type Tunable = { key: keyof LiveConfig; label: string; min: number; max: number; step: number; unit?: string };
const TUNABLES: Tunable[] = [
  { key: "likeThreshold", label: "Like threshold (likes per spawn)", min: 5, max: 200, step: 5 },
  { key: "likeDecayPerSec", label: "Like decay / sec", min: 0, max: 20, step: 0.5 },
  { key: "commentSpawnChance", label: "Comment → butterfly chance", min: 0, max: 1, step: 0.05 },
  { key: "commentCooldownMs", label: "Comment cooldown", min: 0, max: 10000, step: 250, unit: "ms" },
  { key: "followCooldownMs", label: "Follow cooldown", min: 0, max: 15000, step: 250, unit: "ms" },
  { key: "largeGiftValue", label: "Large gift threshold", min: 5, max: 1000, step: 5, unit: "coins" },
  { key: "giftCooldownMs", label: "Gift cooldown", min: 0, max: 10000, step: 250, unit: "ms" },
  { key: "mayhemDurationMs", label: "Mayhem duration", min: 5000, max: 45000, step: 1000, unit: "ms" },
  { key: "maxMibbles", label: "Max Mibbles", min: 1, max: 8, step: 1 },
  { key: "maxPrey", label: "Max prey", min: 1, max: 14, step: 1 },
  { key: "autoSpawnMeanSec", label: "Autonomous spawn mean", min: 2, max: 30, step: 1, unit: "s" },
  { key: "movementIntensity", label: "Movement intensity", min: 0.4, max: 2, step: 0.05 },
];

export function AdminPanel() {
  const busRef = React.useRef<LiveBus | null>(null);
  const simRef = React.useRef<Simulator | null>(null);
  const [status, setStatus] = React.useState<string>("starting…");
  const [health, setHealth] = React.useState<HealthSnapshot | null>(null);
  const [lastHb, setLastHb] = React.useState<number | null>(null);
  const [config, setConfig] = React.useState<LiveConfig>(DEFAULT_CONFIG);
  const [scenario, setScenario] = React.useState<ScenarioId>("none");
  const [log, setLog] = React.useState<string[]>([]);
  const [showPreview, setShowPreview] = React.useState(true);
  const [, tick] = React.useReducer((x: number) => x + 1, 0);

  const addLog = React.useCallback((s: string) => {
    setLog((l) => [`${new Date().toLocaleTimeString()}  ${s}`, ...l].slice(0, 40));
  }, []);

  React.useEffect(() => {
    const bus = new LiveBus({
      role: "admin",
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });
    busRef.current = bus;
    bus.onStatus((s, d) => { setStatus(s + (d ? ` — ${d}` : "")); addLog(`transport: ${s}${d ? ` (${d})` : ""}`); });
    bus.onEvent((ev) => {
      if (ev.type === "heartbeat" && ev.health) { setHealth(ev.health); setLastHb(Date.now()); }
    });
    bus.start();
    simRef.current = new Simulator((e) => bus.publish(e));
    const t = setInterval(() => tick(), 1000);
    return () => { simRef.current?.stop(); bus.stop(); clearInterval(t); };
  }, [addLog]);

  const publish = (partial: Omit<MibblesEvent, "id" | "ts" | "source">) => {
    busRef.current?.publish({ id: makeEventId("adm"), ts: Date.now(), source: "admin", ...partial });
  };
  const cmd = (command: AdminCommand, label?: string) => { publish({ type: "admin", command }); addLog(label ?? command.kind); };

  const setTunable = (key: keyof LiveConfig, value: number | boolean) => {
    const next = { ...config, [key]: value };
    setConfig(next);
    cmd({ kind: "config", patch: { [key]: value } as Partial<LiveConfig> }, `config ${key} = ${value}`);
  };

  const runScenario = (id: ScenarioId) => {
    setScenario(id); simRef.current?.run(id); addLog(`simulator: ${id}`);
  };

  const hbAge = lastHb ? Math.round((Date.now() - lastHb) / 1000) : null;
  const liveOnline = hbAge !== null && hbAge < 8;

  return (
    <div className="min-h-screen bg-[#141414] text-[#EDEDEA] font-sans">
      <div className="mx-auto max-w-[1400px] px-5 py-6">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#E27D5F]">Mibbles LIVE</div>
            <h1 className="font-serif text-3xl">Control panel</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Pill ok={liveOnline} label={liveOnline ? `Live page online · ${hbAge}s ago` : "Live page not heard from"} />
            <Pill ok={status.startsWith("connected")} warn={status.startsWith("local")} label={`Transport: ${status}`} />
            <a href="/live" target="_blank" rel="noopener" className="rounded-full border border-white/15 px-4 py-1.5 hover:bg-white/10">Open /live ↗</a>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Preview */}
          <div>
            <Section title="Preview" right={
              <button onClick={() => setShowPreview((v) => !v)} className="text-xs text-white/60 hover:text-white">{showPreview ? "hide" : "show"}</button>
            }>
              {showPreview ? (
                <div className="mx-auto w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-2xl">
                  <LiveCanvas fill="parent" debug />
                </div>
              ) : <p className="text-sm text-white/50">Preview hidden.</p>}
              <p className="mt-3 text-xs text-white/45 leading-relaxed">
                Red zones = TikTok overlay areas. This preview runs its own world instance and receives the same events
                as the real broadcast page (same browser via BroadcastChannel; across machines via Supabase).
              </p>
            </Section>

            <Section title="Health">
              {health ? (
                <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  <Row k="Intensity" v={`${health.intensity} (${health.intensityValue})`} />
                  <Row k="Like meter" v={String(health.likeMeter)} />
                  <Row k="Mibbles / prey" v={`${health.mibbles} / ${health.prey}`} />
                  <Row k="FPS" v={String(health.fps)} />
                  <Row k="Uptime" v={fmtDur(health.uptimeMs)} />
                  <Row k="Events rx / dropped" v={`${health.eventsReceived} / ${health.eventsDropped}`} />
                  <Row k="Last event" v={health.lastEventTs ? `${Math.round((Date.now() - health.lastEventTs) / 1000)}s ago` : "—"} />
                  <Row k="Transport (live)" v={`${health.transport} · ${health.reconnects} reconnects`} />
                  <Row k="Errors" v={String(health.errors)} />
                  <Row k="Autonomous" v={health.autonomous ? "on" : "off"} />
                  <Row k="Events" v={health.eventsPaused ? "PAUSED" : "flowing"} />
                  <Row k="Mayhem" v={health.mayhemActive ? "ACTIVE" : "—"} />
                  <Row k="Viewport" v={`${health.viewport.w}×${health.viewport.h}`} />
                </dl>
              ) : <p className="text-sm text-white/50">Waiting for a heartbeat from a live page…</p>}
              <button onClick={() => cmd({ kind: "requestHealth" }, "request health")} className="mt-3 text-xs text-white/60 hover:text-white">Request now</button>
            </Section>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <Section title="Manual events">
              <div className="flex flex-wrap gap-2">
                {PREY.map((p) => (
                  <Btn key={p.kind} onClick={() => cmd({ kind: "spawn", prey: p.kind }, `spawn ${p.kind}`)}>
                    <span className="inline-block h-2.5 w-2.5 rounded-full mr-2" style={{ background: p.color }} />{p.label}
                  </Btn>
                ))}
                <Btn onClick={() => cmd({ kind: "addMibbles" }, "add Mibbles")}>+ Mibbles</Btn>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Btn onClick={() => { publish({ type: "follow", user: "admin-test" }); addLog("follow"); }}>Follow</Btn>
                <Btn onClick={() => { publish({ type: "comment", text: "test" }); addLog("comment"); }}>Comment</Btn>
                <Btn onClick={() => { publish({ type: "like", n: 25 }); addLog("25 likes"); }}>+25 likes</Btn>
                <Btn onClick={() => { publish({ type: "gift", giftName: "Rose", giftValue: 1, count: 1 }); addLog("small gift"); }}>Small gift</Btn>
                <Btn onClick={() => { publish({ type: "gift", giftName: "Rose", giftValue: 1, count: 10 }); addLog("gift streak ×10"); }}>Gift streak ×10</Btn>
                <Btn onClick={() => { publish({ type: "gift", giftName: "Galaxy", giftValue: 1000, count: 1 }); addLog("large gift"); }}>Large gift</Btn>
                <Btn accent onClick={() => cmd({ kind: "mayhem" }, "MAYHEM")}>⚡ Mibbles Mayhem</Btn>
              </div>
            </Section>

            <Section title="World controls">
              <div className="flex flex-wrap gap-2">
                <Btn onClick={() => cmd({ kind: "mode", mode: "calm" })}>Calm</Btn>
                <Btn onClick={() => cmd({ kind: "mode", mode: "normal" })}>Normal</Btn>
                <Btn onClick={() => cmd({ kind: "mode", mode: "high" })}>High activity</Btn>
                <Btn onClick={() => cmd({ kind: "pauseEvents", paused: true }, "pause events")}>Pause LIVE events</Btn>
                <Btn onClick={() => cmd({ kind: "pauseEvents", paused: false }, "resume events")}>Resume</Btn>
                <Btn onClick={() => cmd({ kind: "autonomous", enabled: !(health?.autonomous ?? true) }, "toggle autonomous")}>Toggle autonomous</Btn>
                <Btn onClick={() => setTunable("audioEnabled", !config.audioEnabled)}>Audio: {config.audioEnabled ? "on" : "off"}</Btn>
                <Btn onClick={() => cmd({ kind: "config", patch: { reconnect: Date.now() } as any }, "force reconnect")}>Force reconnect</Btn>
                <Btn onClick={() => cmd({ kind: "clear" })}>Clear objects</Btn>
                <Btn danger onClick={() => cmd({ kind: "reset" })}>Reset world</Btn>
              </div>
            </Section>

            <Section title="Simulator (test without TikTok)">
              <div className="grid gap-2 sm:grid-cols-2">
                {SCENARIOS.map((s) => (
                  <button key={s.id} onClick={() => runScenario(s.id)}
                    className={`text-left rounded-xl border px-4 py-3 transition ${scenario === s.id ? "border-[#E27D5F] bg-[#E27D5F]/10" : "border-white/10 hover:border-white/25"}`}>
                    <div className="font-medium text-sm">{s.label}</div>
                    <div className="text-xs text-white/50 mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </Section>

            <Section title="Tuning (applies live, no redeploy)">
              <div className="grid gap-4 sm:grid-cols-2">
                {TUNABLES.map((t) => (
                  <label key={t.key} className="block text-sm">
                    <div className="flex justify-between text-white/70 mb-1">
                      <span>{t.label}</span>
                      <span className="tabular-nums text-white">{String(config[t.key])}{t.unit ? ` ${t.unit}` : ""}</span>
                    </div>
                    <input type="range" min={t.min} max={t.max} step={t.step} value={Number(config[t.key])}
                      onChange={(e) => setTunable(t.key, Number(e.target.value))}
                      className="w-full accent-[#E27D5F]" />
                  </label>
                ))}
              </div>
              <button onClick={() => { setConfig(DEFAULT_CONFIG); cmd({ kind: "config", patch: DEFAULT_CONFIG }, "config reset to defaults"); }}
                className="mt-4 text-xs text-white/60 hover:text-white">Reset tuning to defaults</button>
            </Section>

            <Section title="Log">
              <pre className="max-h-56 overflow-auto text-xs text-white/60 leading-relaxed">{log.join("\n") || "—"}</pre>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 mb-6 last:mb-0">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-[0.18em] text-white/50">{title}</h2>{right}
      </div>
      {children}
    </section>
  );
}
function Btn({ children, onClick, accent, danger }: { children: React.ReactNode; onClick: () => void; accent?: boolean; danger?: boolean }) {
  return (
    <button onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm border transition ${accent ? "border-[#FFD84A] bg-[#FFD84A]/15 hover:bg-[#FFD84A]/25" : danger ? "border-red-400/40 hover:bg-red-400/10" : "border-white/15 hover:bg-white/10"}`}>
      {children}
    </button>
  );
}
function Pill({ ok, warn, label }: { ok: boolean; warn?: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
      <span className={`h-2 w-2 rounded-full ${ok ? "bg-green-400" : warn ? "bg-yellow-400" : "bg-red-400"}`} />{label}
    </span>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (<><dt className="text-white/50">{k}</dt><dd className="tabular-nums">{v}</dd></>);
}
function fmtDur(ms: number) {
  const s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  return h ? `${h}h ${m}m` : m ? `${m}m ${s % 60}s` : `${s}s`;
}
