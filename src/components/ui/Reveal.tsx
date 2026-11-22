"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Entrada ao rolar. Com prefers-reduced-motion, o MotionConfig global
 * (reducedMotion="user") remove o deslocamento e mantém apenas a opacidade.
 */
export function Reveal({ children, className, delay = 0, y = 14, as = "div" }: Props) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
