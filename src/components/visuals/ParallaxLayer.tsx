"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Parallax leve: desloca a camada numa fração da rolagem. Desligado com movimento reduzido. */
export function ParallaxLayer({ children, className, speed = 0.2 }: { children: ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }} aria-hidden>
      {children}
    </motion.div>
  );
}
