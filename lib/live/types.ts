/**
 * Mibbles LIVE — shared types.
 *
 * The game consumes *normalized* MibblesEvents. Whatever feeds those events
 * (TikTok connector, admin panel, simulator) is replaceable. Nothing in the
 * engine knows about TikTok.
 */

export type MibblesEventType =
  | "like"        // n = number of likes in this batch
  | "comment"     // text optional (never rendered publicly by default)
  | "follow"
  | "share"
  | "join"
  | "gift"        // giftValue = coin value of one gift, count = repeat count
  | "admin"       // admin-only commands (see AdminCommand)
  | "heartbeat";  // live page → admin health ping

export interface MibblesEvent {
  type: MibblesEventType;
  /** Unix ms. Used for de-dup and staleness. */
  ts: number;
  /** Stable id for de-dup across reconnects. */
  id: string;
  /** Source adapter name: "tiktok" | "simulator" | "admin" | ... */
  source: string;
  n?: number;              // like batch size
  text?: string;           // comment text (kept private)
  user?: string;           // display name (kept private)
  giftName?: string;
  giftValue?: number;      // coin value of a single gift
  count?: number;          // repeat/streak count
  command?: AdminCommand;
  health?: HealthSnapshot;
}

export type PreyKind = "bug" | "butterfly" | "green" | "mouse" | "laser" | "string";

export type AdminCommand =
  | { kind: "spawn"; prey: PreyKind }
  | { kind: "addMibbles" }
  | { kind: "mayhem" }
  | { kind: "mode"; mode: "calm" | "normal" | "high" }
  | { kind: "pauseEvents"; paused: boolean }
  | { kind: "autonomous"; enabled: boolean }
  | { kind: "clear" }
  | { kind: "reset" }
  | { kind: "config"; patch: Partial<LiveConfig> }
  | { kind: "requestHealth" };

export type Intensity = "calm" | "curious" | "active" | "excited" | "mayhem";

export interface HealthSnapshot {
  uptimeMs: number;
  fps: number;
  intensity: Intensity;
  intensityValue: number;
  likeMeter: number;
  mibbles: number;
  prey: number;
  eventsReceived: number;
  eventsDropped: number;
  lastEventTs: number | null;
  transport: "connected" | "disconnected" | "local-only";
  reconnects: number;
  errors: number;
  autonomous: boolean;
  eventsPaused: boolean;
  mayhemActive: boolean;
  viewport: { w: number; h: number };
}

export interface LiveConfig {
  // ── Likes ───────────────────────────────────────────────
  /** Likes accumulated (meter units) before a small prey spawns. */
  likeThreshold: number;
  /** Meter units lost per second when idle. */
  likeDecayPerSec: number;
  /** Max meter value; keeps viral bursts bounded. */
  likeMeterMax: number;

  // ── Comments / follows ─────────────────────────────────
  /** Probability [0..1] a comment spawns a butterfly (after rate limit). */
  commentSpawnChance: number;
  /** Min ms between comment-triggered spawns. */
  commentCooldownMs: number;
  /** Min ms between follow reactions. */
  followCooldownMs: number;

  // ── Gifts ──────────────────────────────────────────────
  /** Total coin value (value × count) at/above which a gift is "large". */
  largeGiftValue: number;
  giftCooldownMs: number;
  mayhemDurationMs: number;
  mayhemCooldownMs: number;

  // ── Population ─────────────────────────────────────────
  maxMibbles: number;
  minMibbles: number;
  maxPrey: number;
  maxParticles: number;

  // ── Autonomy ───────────────────────────────────────────
  autonomousEnabled: boolean;
  /** Mean seconds between autonomous prey spawns at calm intensity. */
  autoSpawnMeanSec: number;
  /** Global movement multiplier. 1 = default. */
  movementIntensity: number;

  // ── Intensity dynamics ─────────────────────────────────
  /** Intensity units (0..1 scale) gained per like. */
  intensityPerLike: number;
  intensityPerComment: number;
  intensityPerFollow: number;
  intensityPerGift: number;
  /** Intensity lost per second. */
  intensityDecayPerSec: number;

  // ── Visual safety ──────────────────────────────────────
  /** Hard cap on how strong a full-screen tint may get (0..1). */
  maxFlashAlpha: number;

  audioEnabled: boolean;
}
