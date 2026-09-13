import type { LiveConfig } from "./types";

/**
 * Default tuning. Every value here can be changed live from /live/admin
 * (config patch command) without a redeploy. Observe real traffic, then tune.
 */
export const DEFAULT_CONFIG: LiveConfig = {
  likeThreshold: 25,
  likeDecayPerSec: 2.5,
  likeMeterMax: 400,

  commentSpawnChance: 0.6,
  commentCooldownMs: 2500,
  followCooldownMs: 4000,

  largeGiftValue: 99,
  giftCooldownMs: 3000,
  mayhemDurationMs: 22000,
  mayhemCooldownMs: 45000,

  maxMibbles: 5,
  minMibbles: 1,
  maxPrey: 7,
  maxParticles: 120,

  autonomousEnabled: true,
  autoSpawnMeanSec: 9,
  movementIntensity: 1,

  intensityPerLike: 0.004,
  intensityPerComment: 0.03,
  intensityPerFollow: 0.06,
  intensityPerGift: 0.12,
  intensityDecayPerSec: 0.02,

  maxFlashAlpha: 0.12,

  audioEnabled: false,
};

/** Palette pulled from the existing Mibbles poster / TikTok identity. */
export const PALETTE = {
  bg: "#E9E9E7",
  bgVignette: "#DCDCDA",
  mibbles: "#111111",
  eye: "#FFFFFF",
  bug: "#FFD84A",
  bugGlow: "rgba(255, 216, 74, 0.55)",
  butterfly: "#3C8CFF",
  butterflyGlow: "rgba(60, 140, 255, 0.5)",
  green: "#4CBB4C",
  greenGlow: "rgba(76, 187, 76, 0.45)",
  mouse: "#4A4A4A",
  mouseTail: "#F08AA0",
  mouseEar: "#F5B7C4",
  laser: "#FF3B3B",
  laserGlow: "rgba(255, 59, 59, 0.55)",
  string: "#F2A0B0",
  ink: "#151515",
  sketch: "rgba(20,20,20,0.55)",
};

/**
 * TikTok overlay safe areas as fractions of the 9:16 frame.
 * Prey may still travel through them; spawns, ambush spots and branding avoid them.
 */
export const SAFE_AREAS = [
  { x: 0, y: 0, w: 0.62, h: 0.12 },       // top-left: LIVE badge, profile, viewer count
  { x: 0, y: 0.62, w: 0.72, h: 0.26 },    // bottom-left: comment feed
  { x: 0, y: 0.88, w: 1, h: 0.12 },       // bottom: controls + comment input
  { x: 0.85, y: 0.35, w: 0.15, h: 0.53 }, // right rail: hearts / gift icons
];
