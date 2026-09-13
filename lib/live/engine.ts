/**
 * Mibbles LIVE — world engine.
 *
 * Pure simulation: no DOM, no canvas, no network. `LiveWorld.step(dt)` advances
 * the world; `LiveWorld.ingest(event)` feeds normalized events. The renderer
 * reads the public entity arrays.
 *
 * Coordinates are normalized: x ∈ [0,1], y ∈ [0,H] where H = 16/9 (vertical frame).
 * Speeds are in world units per second.
 */
import { DEFAULT_CONFIG, SAFE_AREAS } from "./config";
import type {
  AdminCommand,
  HealthSnapshot,
  Intensity,
  LiveConfig,
  MibblesEvent,
  PreyKind,
} from "./types";

export const WORLD_W = 1;
export const WORLD_H = 16 / 9;

// ─── RNG helpers ────────────────────────────────────────────────────────────
const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
const randInt = (a: number, b: number) => Math.floor(rand(a, b + 1));
const chance = (p: number) => Math.random() < p;
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Exponential-ish random delay around a mean (never < 25% of mean). */
const expDelay = (meanSec: number) => Math.max(meanSec * 0.25, -Math.log(1 - Math.random()) * meanSec);
const dist = (ax: number, ay: number, bx: number, by: number) => Math.hypot(ax - bx, ay - by);
const angleTo = (ax: number, ay: number, bx: number, by: number) => Math.atan2(by - ay, bx - ax);
const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

function inSafeArea(x: number, y: number) {
  const fy = y / WORLD_H;
  return SAFE_AREAS.some((r) => x >= r.x && x <= r.x + r.w && fy >= r.y && fy <= r.y + r.h);
}
/** Random point in the frame, biased away from TikTok overlay zones. */
function safePoint(margin = 0.08): { x: number; y: number } {
  for (let i = 0; i < 12; i++) {
    const x = rand(margin, WORLD_W - margin);
    const y = rand(margin, WORLD_H - margin);
    if (!inSafeArea(x, y)) return { x, y };
  }
  return { x: rand(0.2, 0.8), y: rand(0.25, 0.9) };
}
/** Random point just outside the frame on a random edge. */
function edgePoint(pad = 0.18): { x: number; y: number; edge: 0 | 1 | 2 | 3 } {
  const edge = randInt(0, 3) as 0 | 1 | 2 | 3;
  switch (edge) {
    case 0: return { x: rand(0.1, 0.9), y: -pad, edge };            // top
    case 1: return { x: WORLD_W + pad, y: rand(0.15, WORLD_H * 0.8), edge }; // right
    case 2: return { x: rand(0.1, 0.9), y: WORLD_H + pad, edge };   // bottom
    default: return { x: -pad, y: rand(0.15, WORLD_H * 0.8), edge }; // left
  }
}

// ─── Entities ───────────────────────────────────────────────────────────────
export type MibblesState = "enter" | "wander" | "watch" | "chase" | "recoil" | "hide" | "peek" | "exit" | "excited";

export interface Mibbles {
  id: number;
  /** spine[0] is the head. */
  spine: { x: number; y: number }[];
  segLen: number;
  thickness: number;
  heading: number;
  speed: number;
  targetSpeed: number;
  turnRate: number;
  state: MibblesState;
  stateT: number;      // seconds remaining in state
  targetPrey: number | null;
  goal: { x: number; y: number } | null;
  /** -1..1 eye look offset in look direction */
  look: { x: number; y: number };
  blink: number;       // >0 while blinking
  blinkT: number;      // countdown to next blink
  wiggle: number;      // phase
  wigglePower: number;
  chaseSkill: number;  // 0.4..1 — personality
  curiosity: number;   // 0.3..1 — personality
  persistent: boolean; // core cast member: won't be culled
  hideAt: { x: number; y: number } | null;
  born: number;
}

export interface Prey {
  id: number;
  kind: PreyKind;
  x: number; y: number;
  vx: number; vy: number;
  heading: number;
  phase: number;
  ttl: number;           // seconds left
  age: number;
  size: number;
  state: number;         // per-kind sub-state
  stateT: number;
  visible: boolean;      // laser blink
  caught: boolean;
  /** string: anchor and control points are derived from x,y (tip) */
  anchor?: { x: number; y: number };
  /** mouse: trail of recent positions */
  trail?: { x: number; y: number }[];
}

export interface Particle {
  x: number; y: number; vx: number; vy: number; life: number; maxLife: number;
  size: number; color: string; kind: "puff" | "spark" | "ring";
}

export interface MotionMark {
  x: number; y: number; angle: number; life: number; size: number;
}

// ─── World ──────────────────────────────────────────────────────────────────
export interface WorldListeners {
  onLog?: (level: "info" | "warn" | "error", msg: string) => void;
}

export class LiveWorld {
  config: LiveConfig;
  mibbles: Mibbles[] = [];
  prey: Prey[] = [];
  particles: Particle[] = [];
  marks: MotionMark[] = [];

  /** 0..1 continuous energy of the world. */
  intensityValue = 0.08;
  likeMeter = 0;
  mayhemUntil = 0;         // world-time seconds
  mayhemCooldownUntil = 0;
  mayhemTint = 0;          // 0..1 eased
  mode: "calm" | "normal" | "high" = "normal";
  autonomous = true;
  eventsPaused = false;

  time = 0;                // world seconds
  private nextAutoSpawn = 3;
  private nextPopulationCheck = 4;
  private nextMicroEvent = 6;
  private idCounter = 1;

  // rate limiting / queues
  private lastCommentSpawn = -1e9;
  private lastFollowReact = -1e9;
  private lastGift = -1e9;
  private giftQueue: { value: number; count: number; at: number }[] = [];
  private followsPending = 0;
  private seenIds = new Map<string, number>();

  // stats
  eventsReceived = 0;
  eventsDropped = 0;
  lastEventTs: number | null = null;
  errors = 0;

  private listeners: WorldListeners;

  constructor(config?: Partial<LiveConfig>, listeners: WorldListeners = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.listeners = listeners;
    this.autonomous = this.config.autonomousEnabled;
    this.reset();
  }

  private log(level: "info" | "warn" | "error", msg: string) {
    this.listeners.onLog?.(level, msg);
  }

  // ─── Lifecycle ──────────────────────────────────────────────────────────
  reset() {
    this.mibbles = [];
    this.prey = [];
    this.particles = [];
    this.marks = [];
    this.likeMeter = 0;
    this.intensityValue = 0.08;
    this.mayhemUntil = 0;
    this.mayhemTint = 0;
    this.giftQueue = [];
    this.followsPending = 0;
    // Core cast: one persistent Mibbles plus a second that comes and goes.
    this.spawnMibbles({ persistent: true, fromEdge: true });
    if (chance(0.7)) this.spawnMibbles({ persistent: false, fromEdge: true, delay: rand(2, 6) });
    this.nextAutoSpawn = this.time + rand(2, 5);
  }

  clearObjects() {
    this.prey = [];
    this.particles = [];
    for (const m of this.mibbles) if (m.state === "chase" || m.state === "excited") this.setState(m, "wander");
  }

  get intensity(): Intensity {
    if (this.time < this.mayhemUntil) return "mayhem";
    const v = this.intensityValue;
    if (v < 0.15) return "calm";
    if (v < 0.35) return "curious";
    if (v < 0.6) return "active";
    if (v < 0.85) return "excited";
    return "mayhem";
  }
  get mayhemActive() { return this.time < this.mayhemUntil; }

  /** Effective speed multiplier from intensity, mode, config. */
  private speedMul() {
    const modeMul = this.mode === "calm" ? 0.7 : this.mode === "high" ? 1.35 : 1;
    const iv = this.mayhemActive ? 1 : this.intensityValue;
    return this.config.movementIntensity * modeMul * (0.75 + iv * 0.9);
  }

  // ─── Events ─────────────────────────────────────────────────────────────
  ingest(ev: MibblesEvent) {
    try {
      if (!ev || typeof ev !== "object" || !ev.type) { this.eventsDropped++; return; }
      // de-dup (keep a bounded map)
      if (ev.id) {
        if (this.seenIds.has(ev.id)) { this.eventsDropped++; return; }
        this.seenIds.set(ev.id, this.time);
        if (this.seenIds.size > 4000) {
          const cutoff = this.time - 120;
          for (const [k, t] of this.seenIds) if (t < cutoff) this.seenIds.delete(k);
        }
      }
      if (ev.type === "admin") { this.handleAdmin(ev.command); return; }
      if (ev.type === "heartbeat") return;
      if (this.eventsPaused) { this.eventsDropped++; return; }

      this.eventsReceived++;
      this.lastEventTs = ev.ts ?? Date.now();
      const c = this.config;

      switch (ev.type) {
        case "like": {
          const n = clamp(Number(ev.n ?? 1) || 1, 1, 5000);
          this.likeMeter = Math.min(c.likeMeterMax, this.likeMeter + n);
          this.bumpIntensity(c.intensityPerLike * n);
          break;
        }
        case "comment": {
          this.bumpIntensity(c.intensityPerComment);
          if (this.time - this.lastCommentSpawn > c.commentCooldownMs / 1000 && chance(c.commentSpawnChance)) {
            this.lastCommentSpawn = this.time;
            this.spawnPrey(chance(0.8) ? "butterfly" : pick(["bug", "green"] as const));
          } else {
            this.microReaction();
          }
          break;
        }
        case "follow": {
          this.bumpIntensity(c.intensityPerFollow);
          this.followsPending = Math.min(this.followsPending + 1, 6);
          break;
        }
        case "share": {
          this.bumpIntensity(c.intensityPerFollow);
          this.spawnPrey(pick(["butterfly", "green"] as const));
          this.burst(safePoint(), 10, "spark");
          break;
        }
        case "join": {
          this.bumpIntensity(0.005);
          break;
        }
        case "gift": {
          const value = Math.max(1, Number(ev.giftValue ?? 1) || 1);
          const count = Math.max(1, Number(ev.count ?? 1) || 1);
          this.bumpIntensity(c.intensityPerGift * Math.min(count, 10));
          // Merge streaks of the same gift into one queued entry.
          const last = this.giftQueue[this.giftQueue.length - 1];
          if (last && last.value === value && this.time - last.at < 2) {
            last.count += count; last.at = this.time;
          } else {
            if (this.giftQueue.length < 12) this.giftQueue.push({ value, count, at: this.time });
            else this.eventsDropped++;
          }
          break;
        }
      }
    } catch (e) {
      this.errors++;
      this.log("error", `ingest failed: ${(e as Error).message}`);
    }
  }

  private handleAdmin(cmd?: AdminCommand) {
    if (!cmd) return;
    switch (cmd.kind) {
      case "spawn": this.spawnPrey(cmd.prey, true); break;
      case "addMibbles": this.spawnMibbles({ persistent: false, fromEdge: true, force: true }); break;
      case "mayhem": this.startMayhem(true); break;
      case "mode": this.mode = cmd.mode; break;
      case "pauseEvents": this.eventsPaused = cmd.paused; break;
      case "autonomous": this.autonomous = cmd.enabled; break;
      case "clear": this.clearObjects(); break;
      case "reset": this.reset(); break;
      case "config": this.config = { ...this.config, ...cmd.patch }; break;
      case "requestHealth": break;
    }
  }

  private bumpIntensity(d: number) {
    this.intensityValue = clamp(this.intensityValue + d, 0, 1);
  }

  private microReaction() {
    const m = pick(this.mibbles.filter((x) => x.state === "wander" || x.state === "watch"));
    if (!m) return;
    if (chance(0.5)) this.setState(m, "watch", rand(0.8, 1.6));
    else { m.wigglePower = 1.2; }
  }

  // ─── Mayhem ─────────────────────────────────────────────────────────────
  startMayhem(force = false) {
    if (!force && this.time < this.mayhemCooldownUntil) {
      // Too soon: convert to a strong mini-burst instead.
      this.bumpIntensity(0.25);
      for (let i = 0; i < 3; i++) this.spawnPrey(pick(["bug", "butterfly", "green"] as const));
      return;
    }
    const dur = this.config.mayhemDurationMs / 1000;
    this.mayhemUntil = this.time + dur;
    this.mayhemCooldownUntil = this.mayhemUntil + this.config.mayhemCooldownMs / 1000;
    this.intensityValue = 1;
    // Extra cast
    const want = Math.min(this.config.maxMibbles, this.mibbles.length + randInt(1, 2));
    while (this.mibbles.length < want) this.spawnMibbles({ persistent: false, fromEdge: true, delay: rand(0, 1.5) });
    // Prey burst (staggered)
    const kinds: PreyKind[] = ["mouse", "bug", "butterfly", "green", "laser", "bug", "butterfly"];
    kinds.forEach((k, i) => setTimeout(() => this.spawnPrey(k), i * 350));
    this.burst({ x: 0.5, y: WORLD_H * 0.45 }, 24, "ring");
    this.log("info", "Mibbles Mayhem started");
  }

  // ─── Spawning ───────────────────────────────────────────────────────────
  spawnMibbles(opts: { persistent?: boolean; fromEdge?: boolean; delay?: number; force?: boolean } = {}) {
    if (!opts.force && this.mibbles.length >= this.config.maxMibbles) return null;
    if (opts.force && this.mibbles.length >= this.config.maxMibbles + 2) return null;
    const size = rand(0.75, 1.3);
    const segLen = 0.026 * size;
    const nSeg = randInt(11, 15);
    const start = opts.fromEdge !== false ? edgePoint(0.15) : safePoint();
    const spine = Array.from({ length: nSeg }, (_, i) => ({ x: start.x, y: start.y }));
    const m: Mibbles = {
      id: this.idCounter++,
      spine, segLen,
      thickness: 0.075 * size,
      heading: angleTo(start.x, start.y, 0.5, WORLD_H * 0.5) + rand(-0.6, 0.6),
      speed: 0, targetSpeed: 0.12,
      turnRate: rand(2.2, 3.6),
      state: "enter", stateT: rand(2, 4),
      targetPrey: null, goal: null,
      look: { x: 0, y: 0 }, blink: 0, blinkT: rand(2, 6),
      wiggle: rand(0, Math.PI * 2), wigglePower: 0.6,
      chaseSkill: rand(0.45, 1), curiosity: rand(0.35, 1),
      persistent: !!opts.persistent, hideAt: null, born: this.time,
    };
    // Lay the spine out behind the head, pointing away from the frame.
    for (let i = 1; i < nSeg; i++) {
      spine[i].x = spine[i - 1].x - Math.cos(m.heading) * segLen;
      spine[i].y = spine[i - 1].y - Math.sin(m.heading) * segLen;
    }
    if (opts.delay) { m.state = "hide"; m.stateT = opts.delay; }
    this.mibbles.push(m);
    return m;
  }

  spawnPrey(kind: PreyKind, force = false): Prey | null {
    if (this.prey.length >= this.config.maxPrey + (force ? 2 : 0)) {
      // Over capacity: convert into intensity rather than clutter.
      this.bumpIntensity(0.03);
      this.eventsDropped++;
      return null;
    }
    // Laser and string are singletons.
    if ((kind === "laser" || kind === "string") && this.prey.some((p) => p.kind === kind)) return null;

    const p: Prey = {
      id: this.idCounter++, kind, x: 0, y: 0, vx: 0, vy: 0, heading: 0, phase: rand(0, 6.28),
      ttl: 0, age: 0, size: 1, state: 0, stateT: 0, visible: true, caught: false,
    };
    switch (kind) {
      case "bug": {
        const e = edgePoint(0.06); p.x = e.x; p.y = e.y;
        p.ttl = rand(14, 26); p.size = rand(0.85, 1.15);
        const bg = safePoint(); p.heading = angleTo(p.x, p.y, bg.x, bg.y);
        p.state = 0; p.stateT = rand(0.6, 1.8);
        break;
      }
      case "butterfly": {
        const e = edgePoint(0.08); p.x = e.x; p.y = e.y;
        p.ttl = rand(16, 30); p.size = rand(0.9, 1.25);
        const g = safePoint(); p.heading = angleTo(p.x, p.y, g.x, g.y);
        break;
      }
      case "green": {
        const e = edgePoint(0.06); p.x = e.x; p.y = e.y;
        p.ttl = rand(12, 22); p.size = rand(0.9, 1.2);
        const g = safePoint(); p.heading = angleTo(p.x, p.y, g.x, g.y);
        p.state = 0; p.stateT = rand(0.4, 1);
        break;
      }
      case "mouse": {
        // Mice run horizontally-ish; enter left or right, random lane.
        const fromLeft = chance(0.5);
        p.x = fromLeft ? -0.15 : WORLD_W + 0.15;
        p.y = rand(0.3, WORLD_H * 0.78);
        p.heading = fromLeft ? rand(-0.35, 0.35) : Math.PI + rand(-0.35, 0.35);
        p.ttl = rand(6, 12); p.size = rand(0.9, 1.2); p.trail = [];
        p.state = 0; p.stateT = rand(0.8, 2.2);
        break;
      }
      case "laser": {
        const s = safePoint(); p.x = s.x; p.y = s.y;
        p.ttl = rand(10, 20); p.size = 1;
        p.heading = rand(0, 6.28); p.stateT = rand(0.3, 1);
        break;
      }
      case "string": {
        const fromLeft = chance(0.5);
        p.anchor = { x: fromLeft ? -0.1 : WORLD_W + 0.1, y: -0.05 };
        p.x = p.anchor.x; p.y = 0.5;
        p.ttl = rand(10, 18); p.heading = fromLeft ? 0 : Math.PI;
        p.phase = rand(0, 6.28);
        break;
      }
    }
    this.prey.push(p);
    return p;
  }

  private burst(at: { x: number; y: number }, n: number, kind: Particle["kind"], color = "rgba(20,20,20,0.35)") {
    const room = this.config.maxParticles - this.particles.length;
    n = Math.min(n, Math.max(0, room));
    for (let i = 0; i < n; i++) {
      const a = rand(0, 6.28), s = rand(0.05, 0.25);
      this.particles.push({
        x: at.x, y: at.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        life: rand(0.4, 0.9), maxLife: 0.9, size: rand(0.004, 0.012), color, kind,
      });
    }
  }

  // ─── Step ───────────────────────────────────────────────────────────────
  step(dtRaw: number) {
    const dt = clamp(dtRaw, 0, 0.05); // never simulate huge jumps (tab throttling)
    this.time += dt;
    const c = this.config;

    // Decay
    this.likeMeter = Math.max(0, this.likeMeter - c.likeDecayPerSec * dt);
    if (!this.mayhemActive) {
      const floor = this.mode === "high" ? 0.45 : this.mode === "calm" ? 0.02 : 0.08;
      this.intensityValue = Math.max(floor, this.intensityValue - c.intensityDecayPerSec * dt);
    }
    // Mayhem tint eases in/out (no strobe)
    const tintTarget = this.mayhemActive ? 1 : 0;
    this.mayhemTint = lerp(this.mayhemTint, tintTarget, 1 - Math.exp(-dt * 1.6));

    // Like thresholds → spawns
    while (this.likeMeter >= c.likeThreshold) {
      this.likeMeter -= c.likeThreshold;
      const spawned = this.spawnPrey(this.intensityValue > 0.5 ? pick(["bug", "green", "butterfly"] as const) : "bug");
      if (!spawned) break;
    }

    // Follows → Mibbles peeks / enters (rate limited)
    if (this.followsPending > 0 && this.time - this.lastFollowReact > c.followCooldownMs / 1000) {
      this.lastFollowReact = this.time;
      this.followsPending--;
      const m = this.mibbles.length < c.maxMibbles
        ? this.spawnMibbles({ persistent: false, fromEdge: true })
        : null;
      if (m) { m.state = "peek"; m.stateT = rand(3, 6); }
      else { const any = pick(this.mibbles); if (any) { any.wigglePower = 1.4; this.setState(any, "watch", 1.2); } }
      this.burst(safePoint(), 6, "spark");
    }

    // Gift queue (spaced by cooldown; large gifts → Mayhem)
    if (this.giftQueue.length && this.time - this.lastGift > c.giftCooldownMs / 1000) {
      const g = this.giftQueue.shift()!;
      this.lastGift = this.time;
      const total = g.value * g.count;
      if (total >= c.largeGiftValue) this.startMayhem();
      else {
        const roll = Math.random();
        if (roll < 0.5) this.spawnPrey("mouse");
        else if (roll < 0.75) { this.spawnPrey("bug"); this.spawnPrey("bug"); this.spawnPrey("green"); }
        else if (roll < 0.9) this.spawnPrey("laser");
        else this.spawnPrey("string");
        for (const m of this.mibbles) m.wigglePower = Math.max(m.wigglePower, 1.3);
        this.burst(safePoint(), 12, "spark");
      }
    }

    // Autonomous director
    if (this.autonomous) this.director(dt);

    // Entities
    const sm = this.speedMul();
    for (const p of this.prey) this.stepPrey(p, dt, sm);
    for (const m of this.mibbles) this.stepMibbles(m, dt, sm);

    // Catch / miss resolution
    this.resolveInteractions();

    // Cleanup (bounded arrays, no accumulation)
    this.prey = this.prey.filter((p) => !p.caught && p.ttl > 0 && !this.farOut(p.x, p.y));
    this.mibbles = this.mibbles.filter((m) => !(m.state === "exit" && m.stateT <= 0));
    for (const pt of this.particles) { pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.vx *= 0.92; pt.vy *= 0.92; pt.life -= dt; }
    this.particles = this.particles.filter((pt) => pt.life > 0);
    for (const mk of this.marks) mk.life -= dt;
    this.marks = this.marks.filter((mk) => mk.life > 0);
    if (this.marks.length > 60) this.marks.splice(0, this.marks.length - 60);
  }

  private farOut(x: number, y: number) {
    return x < -0.4 || x > WORLD_W + 0.4 || y < -0.4 || y > WORLD_H + 0.4;
  }

  private director(dt: number) {
    const iv = this.mayhemActive ? 1 : this.intensityValue;
    // Prey spawns: mean interval shrinks with intensity
    if (this.time >= this.nextAutoSpawn) {
      const mean = this.config.autoSpawnMeanSec * (this.mode === "calm" ? 1.6 : 1) / (0.6 + iv * 2.2);
      this.nextAutoSpawn = this.time + expDelay(mean);
      const weights: [PreyKind, number][] = [
        ["bug", 30], ["butterfly", 24], ["green", 14],
        ["mouse", 6 + iv * 10], ["laser", 6 + iv * 6], ["string", 4],
      ];
      const total = weights.reduce((a, [, w]) => a + w, 0);
      let r = Math.random() * total;
      let kind: PreyKind = "bug";
      for (const [k, w] of weights) { r -= w; if (r <= 0) { kind = k; break; } }
      if (this.prey.length < Math.max(2, Math.round(this.config.maxPrey * (0.35 + iv * 0.65)))) this.spawnPrey(kind);
    }
    // Population: target Mibbles count scales with intensity
    if (this.time >= this.nextPopulationCheck) {
      this.nextPopulationCheck = this.time + rand(5, 11);
      const target = clamp(Math.round(this.config.minMibbles + iv * (this.config.maxMibbles - this.config.minMibbles) * 0.8 + rand(-0.4, 0.6)), this.config.minMibbles, this.config.maxMibbles);
      const active = this.mibbles.filter((m) => m.state !== "exit");
      if (active.length < target) this.spawnMibbles({ persistent: false, fromEdge: true });
      else if (active.length > target && active.length > this.config.minMibbles) {
        const victim = pick(active.filter((m) => !m.persistent && m.state !== "chase"));
        if (victim) this.setState(victim, "exit", 6);
      }
    }
    // Micro events: keep the world twitchy even when calm
    if (this.time >= this.nextMicroEvent) {
      this.nextMicroEvent = this.time + expDelay(7 / (0.5 + iv));
      const m = pick(this.mibbles.filter((x) => x.state === "wander" || x.state === "watch"));
      if (m) {
        const roll = Math.random();
        if (roll < 0.3) this.setState(m, "recoil", 0.5);
        else if (roll < 0.55) this.setState(m, "hide", rand(2, 5));
        else if (roll < 0.8) this.setState(m, "watch", rand(1, 3));
        else m.wigglePower = 1.5;
      }
    }
  }

  // ─── Mibbles behaviour ──────────────────────────────────────────────────
  setState(m: Mibbles, s: MibblesState, t?: number) {
    m.state = s;
    m.stateT = t ?? rand(1.5, 4);
    if (s !== "chase") m.targetPrey = null;
    if (s === "wander") m.goal = safePoint(0.12);
    if (s === "hide") m.hideAt = edgePoint(0.16);
    if (s === "exit") m.hideAt = edgePoint(0.25);
    if (s === "recoil") { m.heading = wrapAngle(m.heading + Math.PI + rand(-0.6, 0.6)); m.speed = 0.55; }
    if (s === "excited") m.wigglePower = 1.8;
  }

  private nearestPrey(m: Mibbles, radius: number): Prey | null {
    const h = m.spine[0];
    let best: Prey | null = null, bd = radius;
    for (const p of this.prey) {
      if (p.caught || (p.kind === "laser" && !p.visible)) continue;
      const d = dist(h.x, h.y, p.x, p.y);
      if (d < bd) { bd = d; best = p; }
    }
    return best;
  }

  private stepMibbles(m: Mibbles, dt: number, sm: number) {
    const head = m.spine[0];
    m.stateT -= dt;
    m.blinkT -= dt;
    if (m.blink > 0) m.blink -= dt;
    else if (m.blinkT <= 0) { m.blink = 0.12; m.blinkT = rand(2, 7); }
    m.wiggle += dt * (4 + m.speed * 12);
    m.wigglePower = lerp(m.wigglePower, 0.6, 1 - Math.exp(-dt * 0.8));

    const iv = this.mayhemActive ? 1 : this.intensityValue;
    const noticeRadius = 0.28 + iv * 0.35 + m.curiosity * 0.15;
    let desired = m.heading;
    let want = 0.12;

    switch (m.state) {
      case "enter": {
        if (!m.goal) m.goal = safePoint(0.15);
        desired = angleTo(head.x, head.y, m.goal.x, m.goal.y);
        want = 0.16;
        if (dist(head.x, head.y, m.goal.x, m.goal.y) < 0.05 || m.stateT <= 0) this.setState(m, "wander");
        break;
      }
      case "wander": {
        if (!m.goal || dist(head.x, head.y, m.goal.x, m.goal.y) < 0.06) m.goal = safePoint(0.12);
        desired = angleTo(head.x, head.y, m.goal.x, m.goal.y) + Math.sin(this.time * 0.9 + m.id) * 0.5;
        want = 0.09 + iv * 0.08;
        const target = this.nearestPrey(m, noticeRadius);
        if (target && chance(dt * (0.6 + m.curiosity * 1.6))) {
          m.targetPrey = target.id;
          this.setState(m, chance(0.3) ? "watch" : "chase", rand(3, 7));
          m.targetPrey = target.id;
        } else if (m.stateT <= 0) {
          this.setState(m, chance(0.25) ? "watch" : "wander");
        }
        break;
      }
      case "watch": {
        want = 0.005;
        const t = m.targetPrey != null ? this.prey.find((p) => p.id === m.targetPrey) : this.nearestPrey(m, noticeRadius);
        if (t) {
          desired = angleTo(head.x, head.y, t.x, t.y);
          m.look.x = Math.cos(desired); m.look.y = Math.sin(desired);
          if (m.stateT <= 0 && chance(0.6 * m.curiosity + 0.2)) { m.targetPrey = t.id; this.setState(m, "chase", rand(3, 7)); m.targetPrey = t.id; }
          else if (m.stateT <= 0) this.setState(m, "wander");
        } else if (m.stateT <= 0) this.setState(m, "wander");
        break;
      }
      case "chase": {
        const t = this.prey.find((p) => p.id === m.targetPrey);
        if (!t || t.caught) { this.setState(m, chance(0.4) ? "watch" : "wander", 1); break; }
        // Lead the target a little based on skill.
        const lead = 0.25 * m.chaseSkill;
        desired = angleTo(head.x, head.y, t.x + t.vx * lead, t.y + t.vy * lead);
        want = 0.24 + iv * 0.18 + m.chaseSkill * 0.1;
        m.look.x = Math.cos(desired); m.look.y = Math.sin(desired);
        m.wigglePower = Math.max(m.wigglePower, 1.1);
        if (m.stateT <= 0) { this.setState(m, "wander"); }
        break;
      }
      case "recoil": {
        want = m.stateT > 0.25 ? 0.5 : 0.02;
        desired = m.heading;
        if (m.stateT <= 0) this.setState(m, "watch", rand(0.8, 1.5));
        break;
      }
      case "hide":
      case "exit": {
        if (!m.hideAt) m.hideAt = edgePoint(0.16);
        desired = angleTo(head.x, head.y, m.hideAt.x, m.hideAt.y);
        want = 0.18;
        const outside = this.farOut(head.x, head.y) || dist(head.x, head.y, m.hideAt.x, m.hideAt.y) < 0.04;
        if (outside) {
          want = 0;
          if (m.state === "hide" && m.stateT <= 0) {
            // Re-enter from somewhere else.
            const e = edgePoint(0.15);
            for (const s of m.spine) { s.x = e.x; s.y = e.y; }
            m.heading = angleTo(e.x, e.y, 0.5, WORLD_H * 0.5) + rand(-0.5, 0.5);
            this.setState(m, chance(0.35) ? "peek" : "enter", rand(2, 4));
          }
          if (m.state === "exit") m.stateT = Math.min(m.stateT, 0); // removable now
        }
        break;
      }
      case "peek": {
        // Slide head slightly into frame, hover, then decide.
        const cx = clamp(head.x, 0.05, 0.95), cy = clamp(head.y, 0.1, WORLD_H - 0.15);
        desired = angleTo(head.x, head.y, cx, cy);
        const inside = head.x > 0.02 && head.x < 0.98 && head.y > 0.03 && head.y < WORLD_H - 0.03;
        want = inside ? 0.01 : 0.14;
        const t = this.nearestPrey(m, 0.5);
        if (t) { const a = angleTo(head.x, head.y, t.x, t.y); m.look.x = Math.cos(a); m.look.y = Math.sin(a); }
        if (m.stateT <= 0) this.setState(m, chance(0.65) ? "enter" : "hide", rand(2, 4));
        break;
      }
      case "excited": {
        want = 0.12;
        desired = m.heading + Math.sin(this.time * 9) * 0.9;
        if (m.stateT <= 0) this.setState(m, "wander");
        break;
      }
    }

    // Steering
    const turn = clamp(wrapAngle(desired - m.heading), -m.turnRate * dt, m.turnRate * dt);
    m.heading = wrapAngle(m.heading + turn + Math.sin(m.wiggle) * 0.35 * m.wigglePower * dt);
    m.targetSpeed = want * sm;
    m.speed = lerp(m.speed, m.targetSpeed, 1 - Math.exp(-dt * 3));
    if (m.state !== "watch" && m.state !== "peek") {
      m.look.x = lerp(m.look.x, Math.cos(m.heading) * 0.6, 1 - Math.exp(-dt * 3));
      m.look.y = lerp(m.look.y, Math.sin(m.heading) * 0.6, 1 - Math.exp(-dt * 3));
    }

    // Move head, drag spine (IK chain)
    head.x += Math.cos(m.heading) * m.speed * dt;
    head.y += Math.sin(m.heading) * m.speed * dt;
    for (let i = 1; i < m.spine.length; i++) {
      const a = m.spine[i - 1], b = m.spine[i];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 1e-6;
      const k = m.segLen / d;
      // slight lateral wiggle along the body
      const wob = Math.sin(m.wiggle - i * 0.55) * 0.0025 * m.wigglePower;
      b.x = a.x + dx * k + (-dy / d) * wob;
      b.y = a.y + dy * k + (dx / d) * wob;
    }
    // Keep persistent core member inside the frame while wandering
    if (m.persistent && m.state === "wander") {
      head.x = clamp(head.x, -0.05, WORLD_W + 0.05);
      head.y = clamp(head.y, -0.05, WORLD_H + 0.05);
    }
    // Motion marks (little poster-style arcs) when moving fast
    if (m.speed > 0.2 && chance(dt * 6) && this.marks.length < 60) {
      const tail = m.spine[m.spine.length - 1];
      this.marks.push({ x: tail.x + rand(-0.03, 0.03), y: tail.y + rand(-0.03, 0.03), angle: m.heading + Math.PI + rand(-0.5, 0.5), life: rand(0.4, 0.8), size: m.thickness * rand(0.6, 1.1) });
    }
  }

  // ─── Prey behaviour ─────────────────────────────────────────────────────
  private stepPrey(p: Prey, dt: number, sm: number) {
    p.age += dt; p.ttl -= dt; p.stateT -= dt; p.phase += dt;
    const nearMibbles = this.mibbles.reduce<{ d: number; m: Mibbles | null }>((acc, m) => {
      const d = dist(p.x, p.y, m.spine[0].x, m.spine[0].y);
      return d < acc.d ? { d, m } : acc;
    }, { d: 9, m: null });

    switch (p.kind) {
      case "bug": {
        // states: 0 crawl, 1 stop, 2 zigzag dash, 3 escape
        if (p.stateT <= 0) {
          const r = Math.random();
          p.state = p.ttl < 4 ? 3 : r < 0.45 ? 0 : r < 0.7 ? 1 : 2;
          p.stateT = p.state === 1 ? rand(0.3, 1.2) : rand(0.6, 2);
          if (p.state === 0) p.heading += rand(-1.2, 1.2);
          if (p.state === 3) { const e = edgePoint(0.2); p.heading = angleTo(p.x, p.y, e.x, e.y); }
        }
        // Flee if a Mibbles head is close
        if (nearMibbles.d < 0.16 && chance(dt * 3)) { p.heading = angleTo(nearMibbles.m!.spine[0].x, nearMibbles.m!.spine[0].y, p.x, p.y) + rand(-0.6, 0.6); p.state = 2; p.stateT = rand(0.5, 1); }
        const spd = p.state === 1 ? 0 : p.state === 2 ? 0.55 : p.state === 3 ? 0.4 : 0.14;
        if (p.state === 2) p.heading += Math.sin(p.phase * 18) * 0.9 * dt * 10;
        this.moveTo(p, spd * sm, dt, true);
        break;
      }
      case "butterfly": {
        // states: 0 flutter, 1 pause, 2 dart, 3 circle Mibbles
        if (p.stateT <= 0) {
          const r = Math.random();
          p.state = r < 0.5 ? 0 : r < 0.65 ? 1 : r < 0.85 ? 2 : (nearMibbles.m ? 3 : 0);
          p.stateT = p.state === 1 ? rand(0.4, 1.4) : rand(1, 3);
          if (p.state === 0) { const g = safePoint(); p.heading = lerp(p.heading, angleTo(p.x, p.y, g.x, g.y), 0.6); }
          if (p.state === 2) p.heading = rand(0, 6.28);
        }
        if (p.state === 3 && nearMibbles.m) {
          const h = nearMibbles.m.spine[0];
          const a = angleTo(h.x, h.y, p.x, p.y) + 1.4;
          p.heading = lerp(p.heading, a, 0.2);
        }
        const flutter = Math.sin(p.phase * 7) * 0.9;
        const spd = p.state === 1 ? 0.02 : p.state === 2 ? 0.45 : 0.16;
        p.vx = Math.cos(p.heading + flutter * 0.4) * spd * sm;
        p.vy = (Math.sin(p.heading + flutter * 0.4) * spd + Math.sin(p.phase * 2.3) * 0.05) * sm;
        p.x += p.vx * dt; p.y += p.vy * dt;
        this.bounce(p, 0.06);
        if (p.ttl < 3) { const e = edgePoint(0.2); p.heading = lerp(p.heading, angleTo(p.x, p.y, e.x, e.y), 0.1); }
        break;
      }
      case "green": {
        // Grasshopper-like: hop (parabolic), then sit.
        if (p.stateT <= 0) {
          if (p.state === 0) { p.state = 1; p.stateT = rand(0.35, 0.55); p.heading += rand(-0.9, 0.9); p.vy = -0.5; }
          else { p.state = 0; p.stateT = rand(0.5, 1.8); }
          if (p.ttl < 3) { const e = edgePoint(0.2); p.heading = angleTo(p.x, p.y, e.x, e.y); }
        }
        if (nearMibbles.d < 0.14 && p.state === 0 && chance(dt * 4)) { p.state = 1; p.stateT = 0.45; p.vy = -0.55; p.heading = angleTo(nearMibbles.m!.spine[0].x, nearMibbles.m!.spine[0].y, p.x, p.y); }
        if (p.state === 1) {
          p.vy += 2.4 * dt;
          p.vx = Math.cos(p.heading) * 0.32 * sm;
          p.x += p.vx * dt; p.y += (p.vy + Math.sin(p.heading) * 0.32) * dt * sm;
        } else { p.vx = 0; p.vy = 0; }
        this.bounce(p, 0.05);
        break;
      }
      case "mouse": {
        // states: 0 run, 1 stop & look, 2 turn
        if (p.stateT <= 0) {
          const r = Math.random();
          p.state = r < 0.6 ? 0 : r < 0.85 ? 1 : 2;
          p.stateT = p.state === 1 ? rand(0.5, 1.4) : rand(0.8, 2.5);
          if (p.state === 2) p.heading = wrapAngle(p.heading + Math.PI + rand(-0.8, 0.8));
          if (p.state === 0) p.heading += rand(-0.3, 0.3);
        }
        if (nearMibbles.d < 0.2 && chance(dt * 5)) { p.state = 0; p.stateT = rand(1, 2); p.heading = angleTo(nearMibbles.m!.spine[0].x, nearMibbles.m!.spine[0].y, p.x, p.y) + rand(-0.4, 0.4); }
        const spd = p.state === 1 ? 0 : 0.62 + (this.mayhemActive ? 0.25 : 0);
        this.moveTo(p, spd * sm, dt, false);
        if (p.trail) { p.trail.push({ x: p.x, y: p.y }); if (p.trail.length > 14) p.trail.shift(); }
        if (p.ttl < 2.5 && !this.farOut(p.x, p.y)) { p.ttl = 2.5; } // keep alive until it leaves
        break;
      }
      case "laser": {
        // dart / stop / sharp turns / blink; teases nearest Mibbles
        if (p.stateT <= 0) {
          const r = Math.random();
          p.state = r < 0.45 ? 0 : r < 0.7 ? 1 : r < 0.9 ? 2 : 3;
          p.stateT = p.state === 1 ? rand(0.3, 1) : p.state === 3 ? rand(0.15, 0.5) : rand(0.4, 1.4);
          if (p.state === 0 || p.state === 2) {
            // pick a spot near (but not on) the closest Mibbles head
            const h = nearMibbles.m?.spine[0];
            const g = h && chance(0.6) ? { x: clamp(h.x + rand(-0.3, 0.3), 0.05, 0.95), y: clamp(h.y + rand(-0.3, 0.3), 0.1, WORLD_H - 0.1) } : safePoint();
            p.heading = angleTo(p.x, p.y, g.x, g.y);
          }
          p.visible = p.state !== 3;
        }
        const spd = p.state === 1 ? 0 : p.state === 2 ? 1.1 : 0.5;
        if (p.state === 2 && chance(dt * 4)) p.heading += pick([-1, 1]) * rand(1.2, 2.4);
        this.moveTo(p, spd * sm, dt, true);
        this.bounce(p, 0.04);
        break;
      }
      case "string": {
        // Tip sweeps across on a swinging arc from the anchor; anchor drifts across the top.
        const a = p.anchor!;
        const dir = Math.cos(p.heading) >= 0 ? 1 : -1;
        a.x += dir * 0.09 * sm * dt;
        const len = 0.55 + Math.sin(p.phase * 0.7) * 0.15;
        const swing = Math.sin(p.phase * 1.9) * 0.9;
        const nx = a.x + Math.sin(swing) * len;
        const ny = a.y + Math.cos(swing) * len + Math.sin(p.phase * 5) * 0.02;
        p.vx = (nx - p.x) / dt; p.vy = (ny - p.y) / dt;
        p.x = nx; p.y = ny;
        if (a.x < -0.35 || a.x > WORLD_W + 0.35) p.ttl = 0;
        break;
      }
    }
  }

  private moveTo(p: Prey, spd: number, dt: number, keepInside: boolean) {
    p.vx = Math.cos(p.heading) * spd; p.vy = Math.sin(p.heading) * spd;
    p.x += p.vx * dt; p.y += p.vy * dt;
    if (keepInside) this.bounce(p, 0.04);
  }
  private bounce(p: Prey, pad: number) {
    if (p.ttl < 3) return; // allowed to leave when expiring
    if (p.x < pad) { p.x = pad; p.heading = Math.PI - p.heading; }
    if (p.x > WORLD_W - pad) { p.x = WORLD_W - pad; p.heading = Math.PI - p.heading; }
    if (p.y < pad) { p.y = pad; p.heading = -p.heading; }
    if (p.y > WORLD_H - pad) { p.y = WORLD_H - pad; p.heading = -p.heading; }
  }

  private resolveInteractions() {
    for (const m of this.mibbles) {
      if (m.state !== "chase") continue;
      const t = this.prey.find((p) => p.id === m.targetPrey);
      if (!t || t.caught) continue;
      const h = m.spine[0];
      const d = dist(h.x, h.y, t.x, t.y);
      if (d < m.thickness * 0.55 + 0.02) {
        if (t.kind === "laser" || t.kind === "string") {
          // Un-catchable: Mibbles "misses" and recoils.
          this.setState(m, chance(0.5) ? "recoil" : "watch", 0.6);
          if (t.kind === "laser") { t.state = 2; t.stateT = 0.6; t.heading = rand(0, 6.28); }
          continue;
        }
        if (chance(0.55 * m.chaseSkill + 0.15)) {
          t.caught = true;
          this.burst({ x: t.x, y: t.y }, 8, "puff", t.kind === "bug" ? "rgba(255,216,74,0.6)" : t.kind === "butterfly" ? "rgba(60,140,255,0.6)" : t.kind === "green" ? "rgba(76,187,76,0.6)" : "rgba(80,80,80,0.5)");
          this.setState(m, "excited", rand(0.8, 1.6));
        } else {
          // Miss: prey darts, Mibbles overshoots.
          t.heading = angleTo(h.x, h.y, t.x, t.y) + rand(-0.7, 0.7);
          t.state = t.kind === "mouse" ? 0 : 2; t.stateT = rand(0.5, 1.2);
          this.setState(m, "recoil", 0.45);
        }
      }
    }
  }

  // ─── Health ─────────────────────────────────────────────────────────────
  health(extra: Partial<HealthSnapshot>): HealthSnapshot {
    return {
      uptimeMs: Math.round(this.time * 1000),
      fps: 0,
      intensity: this.intensity,
      intensityValue: Number(this.intensityValue.toFixed(3)),
      likeMeter: Math.round(this.likeMeter),
      mibbles: this.mibbles.length,
      prey: this.prey.length,
      eventsReceived: this.eventsReceived,
      eventsDropped: this.eventsDropped,
      lastEventTs: this.lastEventTs,
      transport: "local-only",
      reconnects: 0,
      errors: this.errors,
      autonomous: this.autonomous,
      eventsPaused: this.eventsPaused,
      mayhemActive: this.mayhemActive,
      viewport: { w: 0, h: 0 },
      ...extra,
    };
  }
}
