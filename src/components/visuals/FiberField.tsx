"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

/**
 * Campo de fibra do hero: pontos à deriva ligados por linhas quando estão
 * próximos, com pulsos de luz correndo pelas conexões. O cursor atrai os
 * pontos e acende as ligações ao redor.
 *
 * Desempenho: um único canvas, densidade proporcional à área, DPR limitado a
 * 1.5, pausa fora da tela e com a aba oculta. Com prefers-reduced-motion,
 * desenha um quadro estático.
 */

type P = { x: number; y: number; vx: number; vy: number; r: number; hue: 0 | 1 };
type Pulse = { a: number; b: number; t: number; speed: number };

const LINK = 132;
const MOUSE_R = 190;
const COLORS = ["47,123,255", "0,230,195"] as const;

export function FiberField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let points: P[] = [];
    let pulses: Pulse[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = true;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(140, Math.round((w * h) / 9500));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.6,
        hue: Math.random() > 0.72 ? 1 : 0,
      }));
      pulses = [];
    };

    const spawnPulse = () => {
      if (points.length < 2 || pulses.length > 14) return;
      const a = Math.floor(Math.random() * points.length);
      let best = -1;
      let bestD = Infinity;
      for (let i = 0; i < points.length; i++) {
        if (i === a) continue;
        const d = Math.hypot(points[i]!.x - points[a]!.x, points[i]!.y - points[a]!.y);
        if (d < LINK && d < bestD) {
          bestD = d;
          best = i;
        }
      }
      if (best >= 0) pulses.push({ a, b: best, t: 0, speed: 0.012 + Math.random() * 0.018 });
    };

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);

      for (const p of points) {
        if (animate) {
          if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d < MOUSE_R && d > 1) {
              const f = (1 - d / MOUSE_R) * 0.035;
              p.vx += (dx / d) * f;
              p.vy += (dy / d) * f;
            }
          }
          p.vx *= 0.985;
          p.vy *= 0.985;
          p.vx += (Math.random() - 0.5) * 0.008;
          p.vy += (Math.random() - 0.5) * 0.008;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;
        }
      }

      // Ligações
      ctx.lineWidth = 0.7;
      for (let i = 0; i < points.length; i++) {
        const a = points[i]!;
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j]!;
          const dx = a.x - b.x;
          if (dx > LINK || dx < -LINK) continue;
          const dy = a.y - b.y;
          if (dy > LINK || dy < -LINK) continue;
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          let alpha = (1 - d / LINK) * 0.22;
          if (mouse.active) {
            const md = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y);
            if (md < MOUSE_R) alpha += (1 - md / MOUSE_R) * 0.45;
          }
          ctx.strokeStyle = `rgba(${COLORS[a.hue]},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Pontos
      for (const p of points) {
        let glow = 0.55;
        if (mouse.active) {
          const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (md < MOUSE_R) glow += (1 - md / MOUSE_R) * 0.45;
        }
        ctx.fillStyle = `rgba(${COLORS[p.hue]},${glow.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulsos de luz nas fibras
      if (animate) {
        if (Math.random() < 0.18) spawnPulse();
        pulses = pulses.filter((q) => {
          q.t += q.speed;
          const a = points[q.a];
          const b = points[q.b];
          if (!a || !b || q.t >= 1 || Math.hypot(a.x - b.x, a.y - b.y) > LINK * 1.2) return false;
          const x = a.x + (b.x - a.x) * q.t;
          const y = a.y + (b.y - a.y) * q.t;
          const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
          g.addColorStop(0, "rgba(160,255,240,0.95)");
          g.addColorStop(1, "rgba(0,230,195,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();
          return true;
        });
      }
    };

    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce) draw(false);
      else if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    seed();
    start();

    const onResize = () => {
      seed();
      start();
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y > -40 && mouse.y < rect.height + 40;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onVisibility = () => start();

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={cn("block h-full w-full", className)} />;
}
