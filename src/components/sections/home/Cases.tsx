"use client";

import { motion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { CaseStudy } from "@/content/company";

import { Counter } from "./Proof";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Casos de clientes: o número do resultado sobe ao entrar na tela. */
export function Cases({ items }: { items: CaseStudy[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="casos" className="relative py-20 sm:py-28">
      <Container>
        <SectionHeader id="casos" eyebrow="Na prática" title="Trabalho entregue para quem opera rede." />
        <ul className="mt-12 space-y-6">
          {items.map((c) => (
            <motion.li
              key={c.client}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="cta-border relative grid overflow-hidden rounded-[28px] lg:grid-cols-12"
            >
              <div aria-hidden className="bg-blueprint pointer-events-none absolute inset-0 opacity-40" />
              <div className="relative p-7 sm:p-10 lg:col-span-7">
                <p className="label-mono text-data">
                  {c.client} · {c.segment}
                </p>
                <h3 className="mt-4 text-[clamp(1.6rem,2.6vw,2.3rem)] leading-tight font-semibold tracking-tight">{c.title}</h3>
                <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="label-mono text-fg-subtle">Desafio</dt>
                    <dd className="mt-2 leading-relaxed text-fg-muted">{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="label-mono text-fg-subtle">O que fizemos</dt>
                    <dd className="mt-2 leading-relaxed text-fg-muted">{c.work}</dd>
                  </div>
                </dl>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <li key={t} className="label-mono rounded-full border border-line-strong px-3 py-1 !text-[0.65rem] text-fg-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative flex flex-col justify-center border-t border-line p-7 sm:p-10 lg:col-span-5 lg:border-t-0 lg:border-l">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_60%_40%,rgb(0_230_195/0.14),transparent_70%)]"
                />
                <p className="relative bg-gradient-to-br from-white via-[#7FB2FF] to-data bg-clip-text text-[clamp(4.5rem,9vw,7.5rem)] leading-none font-semibold tracking-[-0.05em] text-transparent">
                  <Counter value={c.result.value} />
                </p>
                <p className="relative mt-3 text-lg text-fg-muted">{c.result.label}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
