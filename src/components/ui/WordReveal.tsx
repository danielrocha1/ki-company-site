"use client";

import { motion } from "motion/react";
import { Fragment } from "react";

import { cn } from "@/lib/cn";

type Line = { text: string; className?: string };

/** Título que entra palavra por palavra, subindo de dentro de uma máscara. */
export function WordReveal({ lines, delay = 0, className }: { lines: Line[]; delay?: number; className?: string }) {
  let i = 0;
  return (
    <span className={className}>
      {lines.map((line, li) => (
        <Fragment key={li}>
          <span className="block">
            {line.text.split(" ").map((word, wi) => {
              const d = delay + i++ * 0.07;
              return (
                <span key={wi} className="inline-block overflow-hidden pb-[0.12em] align-top">
                  <motion.span
                    className={cn("inline-block", line.className)}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                  {" "}
                </span>
              );
            })}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
