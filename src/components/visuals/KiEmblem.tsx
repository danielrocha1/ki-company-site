"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useId, useRef } from "react";

import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Emblema animado da KI COMPANY (logo principal em círculo).
 * O anel se desenha, as hastes sobem, a faixa em degradê acende e um brilho
 * percorre a faixa em intervalos. O conjunto inclina levemente com o cursor.
 */
export function KiEmblem({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [9, -9]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-11, 11]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set(Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 1.2))));
      my.set(Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 1.2))));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  const bar = (delay: number) => ({
    initial: { scaleY: 0 },
    animate: { scaleY: 1 },
    transition: { duration: 0.9, delay, ease: EASE },
    style: { transformOrigin: "50% 100%", transformBox: "fill-box" as const },
  });

  return (
    <div ref={wrap} className={cn("relative [perspective:1200px]", className)}>
      {/* Halo */}
      <motion.div
        aria-hidden
        className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgb(0_230_240/0.28),rgb(30_91_255/0.16)_55%,transparent)] blur-2xl"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
      />
      <motion.svg
        viewBox="0 0 400 400"
        className="relative h-full w-full overflow-visible"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        role="img"
        aria-label="KI COMPANY"
      >
        <defs>
          <linearGradient id={`ring-${id}`} x1="40" y1="360" x2="360" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E5BFF" />
            <stop offset="0.6" stopColor="#1494FF" />
            <stop offset="1" stopColor="#00E6F0" />
          </linearGradient>
          <linearGradient id={`stripe-${id}`} x1="15" y1="64" x2="71" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E5BFF" />
            <stop offset="0.55" stopColor="#1494FF" />
            <stop offset="1" stopColor="#00E6F0" />
          </linearGradient>
          <linearGradient id={`shine-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`clip-${id}`}>
            <path d="M15 64V38L47 0h24z" />
          </clipPath>
          <filter id={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Anel */}
        <circle cx="200" cy="200" r="176" stroke="rgb(255 255 255 / 0.06)" strokeWidth="1" fill="rgb(10 16 32 / 0.55)" />
        <motion.circle
          cx="200"
          cy="200"
          r="176"
          fill="none"
          stroke={`url(#ring-${id})`}
          strokeWidth="5"
          strokeLinecap="round"
          filter={`url(#glow-${id})`}
          initial={{ pathLength: 0, rotate: -90 }}
          animate={{ pathLength: 1, rotate: -90 }}
          transition={{ duration: 1.8, ease: EASE }}
          style={{ transformOrigin: "200px 200px" }}
        />
        {/* Ponto de luz girando no anel */}
        {!reduce && (
          <motion.g
            style={{ transformOrigin: "200px 200px" }}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: 1 }}
            transition={{ rotate: { duration: 9, repeat: Infinity, ease: "linear", delay: 1.8 }, opacity: { delay: 1.8, duration: 0.6 } }}
          >
            <circle cx="200" cy="24" r="4" fill="#BFFAFF" filter={`url(#glow-${id})`} />
          </motion.g>
        )}

        {/* Símbolo KI (viewBox original 101x64, escalado) */}
        <g transform="translate(97 118) scale(2.04)">
          <motion.rect x="0" y="0" width="15" height="64" fill="#fff" {...bar(0.35)} />
          <motion.g
            initial={{ opacity: 0, x: -10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
          >
            <path d="M15 64V38L47 0h24z" fill={`url(#stripe-${id})`} filter={`url(#glow-${id})`} />
            {!reduce && (
              <g clipPath={`url(#clip-${id})`}>
                <motion.rect
                  y="-10"
                  width="22"
                  height="90"
                  fill={`url(#shine-${id})`}
                  transform="skewX(-28)"
                  initial={{ x: -40 }}
                  animate={{ x: [-40, 110] }}
                  transition={{ duration: 1.4, delay: 2, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
                />
              </g>
            )}
          </motion.g>
          <motion.path
            d="M37.5 47 49 36.5 73 64H51z"
            fill="#fff"
            initial={{ opacity: 0, x: -8, y: -8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          />
          <motion.rect x="86" y="0" width="15" height="64" fill="#fff" {...bar(0.5)} />
        </g>

        <motion.text
          x="205"
          y="290"
          textAnchor="middle"
          fill="#fff"
          fontSize="22"
          fontWeight="500"
          style={{ fontFamily: "var(--font-sans)" }}
          initial={{ opacity: 0, letterSpacing: "2px" }}
          animate={{ opacity: 1, letterSpacing: "11px" }}
          transition={{ duration: 1.4, delay: 1.1, ease: EASE }}
        >
          COMPANY
        </motion.text>
      </motion.svg>
    </div>
  );
}
