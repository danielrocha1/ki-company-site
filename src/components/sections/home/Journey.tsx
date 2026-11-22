"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/cn";

export type JourneyStep = {
  id: string;
  icon: IconName;
  stage: string;
  title: string;
  text: string;
  product: { name: string; href: string };
};

/**
 * "Do campo ao assinante": a jornada do provedor desenhada na rolagem.
 * A linha de luz desce pela seção e acende cada etapa quando chega nela.
 */
export function Journey({ steps }: { steps: JourneyStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const [reached, setReached] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(Math.min(steps.length - 1, Math.floor(v * steps.length + 0.05)));
  });

  return (
    <section aria-labelledby="jornada" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_30%,rgb(30_91_255/0.12),transparent_70%)]" />
      <Container className="relative">
        <SectionHeader
          id="jornada"
          eyebrow="03 — Do campo ao assinante"
          title="A gente conhece a rotina do provedor de ponta a ponta."
          description="Cada etapa da operação tem um produto da Ki por trás. É esse conhecimento que levamos para os projetos sob medida."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          {/* Trilho e linha de luz */}
          <div aria-hidden className="absolute top-0 bottom-0 left-5 w-px bg-line-strong md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden
            className="absolute top-0 bottom-0 left-5 w-[2px] origin-top bg-gradient-to-b from-signal via-[#1494FF] to-data shadow-[0_0_18px_2px_rgb(0_230_195/0.45)] md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: line }}
          />

          <ol className="space-y-16 md:space-y-24">
            {steps.map((s, i) => {
              const on = i <= reached;
              const right = i % 2 === 1;
              return (
                <li key={s.id} className="relative grid items-center pl-16 md:grid-cols-2 md:gap-20 md:pl-0">
                  {/* Nó */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-6 left-5 grid size-10 -translate-x-1/2 place-items-center rounded-full border transition-all duration-500 md:top-1/2 md:left-1/2 md:-translate-y-1/2",
                      on
                        ? "border-data/60 bg-ink-900 text-data shadow-[0_0_0_6px_rgb(0_230_195/0.08),0_0_30px_rgb(0_230_195/0.45)]"
                        : "border-line-strong bg-ink-950 text-fg-subtle",
                    )}
                  >
                    <Icon name={s.icon} className="size-4.5" />
                  </span>

                  <motion.div
                    className={cn(right ? "md:col-start-2" : "md:col-start-1 md:text-right")}
                    initial={{ opacity: 0, x: right ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className={cn("label-mono transition-colors duration-500", on ? "text-data" : "text-fg-subtle")}>
                      {String(i + 1).padStart(2, "0")} · {s.stage}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-fg-muted">{s.text}</p>
                    <Link
                      href={s.product.href}
                      className={cn(
                        "mt-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                        on ? "border-data/40 bg-data/10 text-fg hover:bg-data/20" : "border-line-strong text-fg-muted hover:text-fg",
                      )}
                    >
                      {s.product.name}
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </Link>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
