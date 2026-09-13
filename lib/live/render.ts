/**
 * Mibbles LIVE — Canvas 2D renderer.
 * Draws the LiveWorld in the poster style: flat light field, thick black
 * worm-Mibbles with two white eyes, glowing cat-visible prey, sketchy motion marks.
 */
import { PALETTE } from "./config";
import { LiveWorld, WORLD_H, WORLD_W, type Mibbles, type Prey } from "./engine";

export interface RenderOpts {
  showBranding: boolean;
  showSafeAreas: boolean; // admin/debug only
}

export class LiveRenderer {
  private ctx: CanvasRenderingContext2D;
  private w = 0; private h = 0; private s = 1; private ox = 0; private oy = 0;
  private dpr = 1;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) throw new Error("2D context unavailable");
    this.ctx = ctx;
  }

  /** Fit a 9:16 stage inside the canvas element (letterboxed if needed). */
  resize(cssW: number, cssH: number, dpr: number) {
    this.dpr = Math.min(dpr, 2);
    this.canvas.width = Math.round(cssW * this.dpr);
    this.canvas.height = Math.round(cssH * this.dpr);
    this.w = this.canvas.width; this.h = this.canvas.height;
    const stageAspect = WORLD_W / WORLD_H;
    let sw = this.w, sh = this.w / stageAspect;
    if (sh > this.h) { sh = this.h; sw = this.h * stageAspect; }
    this.s = sw / WORLD_W;
    this.ox = (this.w - sw) / 2; this.oy = (this.h - sh) / 2;
  }

  private X(x: number) { return this.ox + x * this.s; }
  private Y(y: number) { return this.oy + y * this.s; }
  private S(v: number) { return v * this.s; }

  draw(world: LiveWorld, opts: RenderOpts) {
    const { ctx } = this;
    // Background (flat + gentle vignette)
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.fillStyle = PALETTE.bg;
    ctx.fillRect(this.ox, this.oy, this.S(WORLD_W), this.S(WORLD_H));
    const g = ctx.createRadialGradient(this.X(0.5), this.Y(WORLD_H * 0.45), this.S(0.2), this.X(0.5), this.Y(WORLD_H * 0.5), this.S(1.3));
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,0.07)");
    ctx.fillStyle = g;
    ctx.fillRect(this.ox, this.oy, this.S(WORLD_W), this.S(WORLD_H));

    // Mayhem tint: subtle warm wash, capped, eased — never a flash.
    if (world.mayhemTint > 0.01) {
      ctx.fillStyle = `rgba(255, 216, 74, ${world.mayhemTint * world.config.maxFlashAlpha})`;
      ctx.fillRect(this.ox, this.oy, this.S(WORLD_W), this.S(WORLD_H));
    }

    ctx.save();
    ctx.beginPath(); ctx.rect(this.ox, this.oy, this.S(WORLD_W), this.S(WORLD_H)); ctx.clip();

    // Motion marks (poster-style arcs)
    ctx.lineCap = "round";
    for (const mk of world.marks) {
      ctx.strokeStyle = `rgba(20,20,20,${0.55 * (mk.life / 0.8)})`;
      ctx.lineWidth = this.S(0.006);
      ctx.beginPath();
      ctx.arc(this.X(mk.x), this.Y(mk.y), this.S(mk.size * 0.6), mk.angle - 0.6, mk.angle + 0.6);
      ctx.stroke();
    }

    // Strings go behind everything
    for (const p of world.prey) if (p.kind === "string") this.drawString(p);

    // Prey (non-string), then Mibbles sorted by head y (simple depth)
    for (const p of world.prey) if (p.kind !== "string") this.drawPrey(p, world.time);
    const ms = [...world.mibbles].sort((a, b) => a.spine[0].y - b.spine[0].y);
    for (const m of ms) this.drawMibbles(m);

    // Particles
    for (const pt of world.particles) {
      const a = Math.max(0, pt.life / pt.maxLife);
      ctx.globalAlpha = a;
      ctx.fillStyle = pt.color;
      ctx.strokeStyle = pt.color;
      if (pt.kind === "ring") {
        ctx.lineWidth = this.S(0.004);
        ctx.beginPath(); ctx.arc(this.X(pt.x), this.Y(pt.y), this.S(pt.size * (2 - a) * 3), 0, 6.283); ctx.stroke();
      } else {
        ctx.beginPath(); ctx.arc(this.X(pt.x), this.Y(pt.y), this.S(pt.size * (pt.kind === "spark" ? a : 1)), 0, 6.283); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    if (opts.showSafeAreas) this.drawSafeAreas();
    if (opts.showBranding) this.drawBranding();
    ctx.restore();
  }

  // ─── Mibbles ────────────────────────────────────────────────────────────
  private drawMibbles(m: Mibbles) {
    const { ctx } = this;
    const pts = m.spine;
    ctx.strokeStyle = PALETTE.mibbles;
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    // Body: smooth curve through spine, tapering slightly toward the tail.
    for (let i = 0; i < pts.length - 1; i++) {
      const t = i / (pts.length - 1);
      const w = m.thickness * (1 - t * 0.18);
      ctx.lineWidth = this.S(w);
      ctx.beginPath();
      ctx.moveTo(this.X(pts[i].x), this.Y(pts[i].y));
      const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2;
      ctx.quadraticCurveTo(this.X(pts[i].x), this.Y(pts[i].y), this.X(mx), this.Y(my));
      ctx.lineTo(this.X(pts[i + 1].x), this.Y(pts[i + 1].y));
      ctx.stroke();
    }
    // Head cap
    const h = pts[0];
    ctx.fillStyle = PALETTE.mibbles;
    ctx.beginPath(); ctx.arc(this.X(h.x), this.Y(h.y), this.S(m.thickness / 2), 0, 6.283); ctx.fill();

    // Eyes: two white dots, spaced perpendicular to heading, nudged toward look direction.
    const px = -Math.sin(m.heading), py = Math.cos(m.heading);
    const eyeGap = m.thickness * 0.26;
    const eyeR = m.thickness * 0.11;
    const lookX = m.look.x * m.thickness * 0.08, lookY = m.look.y * m.thickness * 0.08;
    const cx = h.x + Math.cos(m.heading) * m.thickness * 0.05 + lookX;
    const cy = h.y + Math.sin(m.heading) * m.thickness * 0.05 + lookY;
    ctx.fillStyle = PALETTE.eye;
    if (m.blink > 0) {
      ctx.lineWidth = this.S(eyeR * 0.5); ctx.strokeStyle = PALETTE.eye;
      for (const sgn of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(this.X(cx + px * eyeGap * sgn - Math.cos(m.heading) * eyeR), this.Y(cy + py * eyeGap * sgn - Math.sin(m.heading) * eyeR));
        ctx.lineTo(this.X(cx + px * eyeGap * sgn + Math.cos(m.heading) * eyeR), this.Y(cy + py * eyeGap * sgn + Math.sin(m.heading) * eyeR));
        ctx.stroke();
      }
    } else {
      for (const sgn of [-1, 1]) {
        ctx.beginPath(); ctx.arc(this.X(cx + px * eyeGap * sgn), this.Y(cy + py * eyeGap * sgn), this.S(eyeR), 0, 6.283); ctx.fill();
      }
    }
  }

  // ─── Prey ───────────────────────────────────────────────────────────────
  private glow(x: number, y: number, r: number, color: string) {
    const { ctx } = this;
    const g = ctx.createRadialGradient(this.X(x), this.Y(y), 0, this.X(x), this.Y(y), this.S(r));
    g.addColorStop(0, color); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(this.X(x), this.Y(y), this.S(r), 0, 6.283); ctx.fill();
  }

  private drawPrey(p: Prey, t: number) {
    const { ctx } = this;
    switch (p.kind) {
      case "bug": {
        const r = 0.02 * p.size;
        this.glow(p.x, p.y, r * 2.6, PALETTE.bugGlow);
        ctx.save(); ctx.translate(this.X(p.x), this.Y(p.y)); ctx.rotate(p.heading);
        ctx.fillStyle = PALETTE.bug;
        // fuzzy body: main blob + a few spiky bumps
        ctx.beginPath(); ctx.ellipse(0, 0, this.S(r * 1.15), this.S(r), 0, 0, 6.283); ctx.fill();
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * 6.283 + t * 3;
          ctx.beginPath(); ctx.arc(Math.cos(a) * this.S(r * 0.9), Math.sin(a) * this.S(r * 0.9), this.S(r * 0.35), 0, 6.283); ctx.fill();
        }
        ctx.fillStyle = PALETTE.ink;
        ctx.beginPath(); ctx.arc(this.S(r * 0.45), this.S(-r * 0.25), this.S(r * 0.14), 0, 6.283); ctx.fill();
        ctx.beginPath(); ctx.arc(this.S(r * 0.45), this.S(r * 0.25), this.S(r * 0.14), 0, 6.283); ctx.fill();
        ctx.restore();
        break;
      }
      case "butterfly": {
        const r = 0.032 * p.size;
        this.glow(p.x, p.y, r * 2.2, PALETTE.butterflyGlow);
        ctx.save(); ctx.translate(this.X(p.x), this.Y(p.y)); ctx.rotate(p.heading + Math.PI / 2);
        const flap = 0.55 + Math.abs(Math.sin(t * 14 + p.phase)) * 0.45;
        ctx.fillStyle = PALETTE.butterfly;
        for (const sgn of [-1, 1]) {
          ctx.beginPath(); ctx.ellipse(this.S(sgn * r * 0.55 * flap), this.S(-r * 0.15), this.S(r * 0.6 * flap), this.S(r * 0.5), sgn * 0.5, 0, 6.283); ctx.fill();
          ctx.beginPath(); ctx.ellipse(this.S(sgn * r * 0.45 * flap), this.S(r * 0.35), this.S(r * 0.42 * flap), this.S(r * 0.35), -sgn * 0.6, 0, 6.283); ctx.fill();
        }
        ctx.fillStyle = PALETTE.ink;
        ctx.beginPath(); ctx.ellipse(0, 0, this.S(r * 0.09), this.S(r * 0.55), 0, 0, 6.283); ctx.fill();
        ctx.restore();
        break;
      }
      case "green": {
        const r = 0.022 * p.size;
        this.glow(p.x, p.y, r * 2.2, PALETTE.greenGlow);
        ctx.save(); ctx.translate(this.X(p.x), this.Y(p.y)); ctx.rotate(p.heading);
        ctx.fillStyle = PALETTE.green;
        ctx.beginPath(); ctx.ellipse(0, 0, this.S(r * 1.5), this.S(r * 0.75), 0, 0, 6.283); ctx.fill();
        ctx.strokeStyle = "rgba(20,60,20,0.6)"; ctx.lineWidth = this.S(0.003);
        ctx.beginPath(); ctx.moveTo(this.S(-r * 1.3), 0); ctx.lineTo(this.S(r * 1.3), 0); ctx.stroke();
        // legs when hopping
        if (p.state === 1) {
          ctx.beginPath(); ctx.moveTo(0, this.S(r * 0.4)); ctx.lineTo(this.S(-r), this.S(r * 1.2)); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(this.S(r * 0.4), this.S(r * 0.4)); ctx.lineTo(this.S(-r * 0.4), this.S(r * 1.3)); ctx.stroke();
        }
        ctx.restore();
        break;
      }
      case "mouse": {
        const r = 0.03 * p.size;
        // tail from trail
        if (p.trail && p.trail.length > 2) {
          ctx.strokeStyle = PALETTE.mouseTail; ctx.lineWidth = this.S(0.006); ctx.lineCap = "round";
          ctx.beginPath();
          const tr = p.trail;
          ctx.moveTo(this.X(tr[0].x), this.Y(tr[0].y));
          for (let i = 1; i < tr.length; i++) ctx.lineTo(this.X(tr[i].x), this.Y(tr[i].y));
          ctx.stroke();
        }
        ctx.save(); ctx.translate(this.X(p.x), this.Y(p.y)); ctx.rotate(p.heading);
        ctx.fillStyle = PALETTE.mouse;
        ctx.beginPath(); ctx.ellipse(0, 0, this.S(r * 1.35), this.S(r * 0.85), 0, 0, 6.283); ctx.fill();
        ctx.fillStyle = PALETTE.mouseEar;
        ctx.beginPath(); ctx.arc(this.S(r * 0.35), this.S(-r * 0.75), this.S(r * 0.32), 0, 6.283); ctx.fill();
        ctx.beginPath(); ctx.arc(this.S(r * 0.35), this.S(r * 0.75), this.S(r * 0.32), 0, 6.283); ctx.fill();
        ctx.fillStyle = PALETTE.ink;
        ctx.beginPath(); ctx.arc(this.S(r * 1.35), 0, this.S(r * 0.14), 0, 6.283); ctx.fill(); // nose
        ctx.beginPath(); ctx.arc(this.S(r * 0.8), this.S(-r * 0.3), this.S(r * 0.1), 0, 6.283); ctx.fill();
        ctx.restore();
        break;
      }
      case "laser": {
        if (!p.visible) break;
        const r = 0.014;
        this.glow(p.x, p.y, r * 3.2, PALETTE.laserGlow);
        ctx.fillStyle = PALETTE.laser;
        ctx.beginPath(); ctx.arc(this.X(p.x), this.Y(p.y), this.S(r), 0, 6.283); ctx.fill();
        ctx.fillStyle = "#FFE1E1";
        ctx.beginPath(); ctx.arc(this.X(p.x), this.Y(p.y), this.S(r * 0.45), 0, 6.283); ctx.fill();
        break;
      }
      default: break;
    }
  }

  private drawString(p: Prey) {
    const { ctx } = this;
    const a = p.anchor!;
    ctx.strokeStyle = PALETTE.string; ctx.lineWidth = this.S(0.006); ctx.lineCap = "round";
    ctx.setLineDash([this.S(0.03), this.S(0.018)]);
    ctx.beginPath();
    ctx.moveTo(this.X(a.x), this.Y(a.y));
    // gentle curve: control point pulled sideways
    ctx.quadraticCurveTo(this.X((a.x + p.x) / 2 + Math.sin(p.phase * 1.9) * 0.12), this.Y((a.y + p.y) / 2), this.X(p.x), this.Y(p.y));
    ctx.stroke();
    ctx.setLineDash([]);
    // tuft at tip
    ctx.fillStyle = PALETTE.string;
    for (let i = 0; i < 5; i++) {
      const ang = (i / 5) * 6.283 + p.phase;
      ctx.beginPath(); ctx.ellipse(this.X(p.x + Math.cos(ang) * 0.012), this.Y(p.y + Math.sin(ang) * 0.012), this.S(0.012), this.S(0.005), ang, 0, 6.283); ctx.fill();
    }
  }

  private drawBranding() {
    const { ctx } = this;
    // Right side, just under TikTok's top overlay, above the hearts rail.
    const x = this.X(0.94), y = this.Y(WORLD_H * 0.165);
    ctx.textAlign = "right"; ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "rgba(17,17,17,0.9)";
    ctx.font = `700 ${this.S(0.036)}px "Fraunces", "Inter", system-ui, sans-serif`;
    ctx.fillText("MIBBLES LIVE", x, y);
    ctx.fillStyle = "rgba(17,17,17,0.55)";
    ctx.font = `500 ${this.S(0.016)}px "Inter", system-ui, sans-serif`;
    ctx.fillText("interactive play for cats", x, y + this.S(0.026));
  }

  private drawSafeAreas() {
    const { ctx } = this;
    ctx.fillStyle = "rgba(255,0,0,0.08)"; ctx.strokeStyle = "rgba(255,0,0,0.35)"; ctx.lineWidth = 1;
    const areas = [
      [0, 0, 0.62, 0.12], [0, 0.62, 0.72, 0.26], [0, 0.88, 1, 0.12], [0.85, 0.35, 0.15, 0.53],
    ];
    for (const [x, y, w, h] of areas) {
      ctx.fillRect(this.X(x), this.Y(y * WORLD_H), this.S(w), this.S(h * WORLD_H));
      ctx.strokeRect(this.X(x), this.Y(y * WORLD_H), this.S(w), this.S(h * WORLD_H));
    }
  }
}
