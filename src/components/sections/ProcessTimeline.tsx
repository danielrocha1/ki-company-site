"use client";

import { motion } from "motion/react";

import type { ProcessStep } from "@/content/company";

/** Linha do processo: a conexão entre as etapas é desenhada conforme a rolagem. */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="relative grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <motion.li
          key={step.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative pl-14"
        >
          <span aria-hidden className="absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-line-strong bg-ink-900 font-mono text-xs text-data">
            {step.id}
          </span>
          {i < steps.length - 1 && (
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 + (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-12 bottom-[-2.25rem] left-5 w-px origin-top bg-gradient-to-b from-signal/60 to-transparent md:hidden"
            />
          )}
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <p className="mt-2 leading-relaxed text-fg-muted">{step.text}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {step.outputs.map((o) => (
              <li key={o} className="label-mono rounded-md border border-line bg-white/[0.02] px-2 py-1 !text-[0.62rem] text-fg-subtle">
                {o}
              </li>
            ))}
          </ul>
        </motion.li>
      ))}
    </ol>
  );
}
