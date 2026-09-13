"use client";

import * as React from "react";
import { LiveWorld } from "@/lib/live/engine";
import { LiveRenderer } from "@/lib/live/render";
import { LiveBus, makeEventId } from "@/lib/live/bus";
import type { HealthSnapshot } from "@/lib/live/types";

interface Props {
  /** Show safe-area overlay (admin preview only). */
  debug?: boolean;
  showBranding?: boolean;
  /** "viewport" = fixed full-screen broadcast; "parent" = fill the parent element (admin preview). */
  fill?: "viewport" | "parent";
}

/**
 * The broadcast surface. 9:16 stage, requestAnimationFrame loop, zero DOM churn.
 * Subscribes to the bus and feeds the world. Publishes a heartbeat every 2s so
 * the admin panel can see health. Errors never surface publicly.
 */
export function LiveCanvas({ debug = false, showBranding = true, fill = "viewport" }: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const world = new LiveWorld(undefined, {
      onLog: (level, msg) => { if (debug) console[level === "error" ? "error" : "log"](`[live] ${msg}`); },
    });
    const renderer = new LiveRenderer(canvas);
    const bus = new LiveBus({
      role: "live",
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    let transport: HealthSnapshot["transport"] = "local-only";
    bus.onStatus((s) => { transport = s; });
    const offEvent = bus.onEvent((ev) => {
      if (ev.type === "admin" && ev.command?.kind === "requestHealth") { sendHeartbeat(); return; }
      if (ev.type === "admin" && ev.command?.kind === "config" && "reconnect" in (ev.command.patch as any)) { bus.reconnect(); }
      world.ingest(ev);
    });
    bus.start();

    // Sizing
    const measure = () => {
      if (fill === "viewport") return { w: window.innerWidth, h: window.innerHeight };
      const r = canvas.parentElement?.getBoundingClientRect();
      return { w: Math.max(1, r?.width ?? 360), h: Math.max(1, r?.height ?? 640) };
    };
    const resize = () => { const { w, h } = measure(); renderer.resize(w, h, window.devicePixelRatio || 1); };
    resize();
    window.addEventListener("resize", resize);
    const ro = fill === "parent" && canvas.parentElement && "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    ro?.observe(canvas.parentElement!);

    // Loop
    let raf = 0, last = performance.now(), frames = 0, fpsAcc = 0, fps = 0;
    const started = Date.now();
    const loop = (t: number) => {
      const dt = (t - last) / 1000; last = t;
      frames++; fpsAcc += dt; if (fpsAcc >= 1) { fps = Math.round(frames / fpsAcc); frames = 0; fpsAcc = 0; }
      try {
        world.step(dt);
        renderer.draw(world, { showBranding, showSafeAreas: debug });
      } catch (e) {
        world.errors++;
        if (debug) console.error(e);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Heartbeat → admin
    const sendHeartbeat = () => {
      const health = world.health({
        fps, transport, reconnects: bus.reconnects,
        uptimeMs: Date.now() - started,
        viewport: measure(),
      });
      bus.publish({ type: "heartbeat", id: makeEventId("hb"), ts: Date.now(), source: "live", health });
    };
    const hb = setInterval(sendHeartbeat, 2000);

    // Chrome suspends requestAnimationFrame in hidden/background tabs. Keep the
    // world stepping on a timer so it never freezes or "jumps" when it returns.
    let hiddenTimer: ReturnType<typeof setInterval> | null = null;
    const onVis = () => {
      last = performance.now();
      if (document.hidden && !hiddenTimer) {
        hiddenTimer = setInterval(() => { world.step(1 / 30); }, 1000 / 30);
      } else if (!document.hidden && hiddenTimer) {
        clearInterval(hiddenTimer); hiddenTimer = null;
      }
    };
    document.addEventListener("visibilitychange", onVis);
    onVis();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(hb);
      window.removeEventListener("resize", resize);
      ro?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (hiddenTimer) clearInterval(hiddenTimer);
      offEvent();
      bus.stop();
    };
  }, [debug, showBranding, fill]);

  return (
    <canvas
      ref={canvasRef}
      className={fill === "viewport" ? "fixed inset-0 h-full w-full select-none" : "block h-full w-full select-none"}
      style={{ touchAction: "none", cursor: debug ? "default" : "none" }}
      aria-label="Mibbles LIVE — interactive play for cats"
    />
  );
}
