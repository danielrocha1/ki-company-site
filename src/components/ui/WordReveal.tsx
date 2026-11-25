"use client";

import { motion } from "motion/react";
import { Fragment } from "react";

import { cn } from "@/lib/cn";

type Line = { text: string; className?: string };

const word = {
  hidden: { y: "110%" },
  show: (d: number) => ({ y: 0, transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] as const } }),
};

/**
 * Título que entra palavra por palavra, subindo de dentro de uma máscara.
 * Com `inView`, anima quando o título entra na tela (o gatilho fica no
 * contêiner, já que as palavras começam escondidas pela máscara).
 */
export function WordReveal({
  lines,
  delay = 0,
  className,
  inView = false,
}: {
  lines: Line[];
  delay?: number;
  className?: string;
  inView?: boolean;
}) {
  let i = 0;
  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      {...(inView ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } } : { animate: "show" })}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.text.split(" ").map((w, wi) => (
            <Fragment key={wi}>
              {wi > 0 && " "}
              <span className="inline-block overflow-hidden pb-[0.12em] align-top">
                <motion.span className={cn("inline-block", line.className)} variants={word} custom={delay + i++ * 0.07}>
                  {w}
                </motion.span>
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
