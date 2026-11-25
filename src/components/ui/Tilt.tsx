"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Inclina o conteúdo em 3D seguindo o cursor, com um reflexo de luz por cima. */
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const cfg = { stiffness: 140, damping: 18 };
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), cfg);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), cfg);
  const glare = useTransform([px, py] as never, ([x, y]: number[]) => `radial-gradient(60% 50% at ${x! * 100}% ${y! * 100}%, rgb(255 255 255 / 0.12), transparent 70%)`);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className={cn("[perspective:1200px]", className)} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div className="relative" style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
        {children}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glare }} />
      </motion.div>
    </div>
  );
}
