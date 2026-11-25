"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";

type Stat = { value: number; label: string; suffix?: string };

export function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {reduce ? value : n}
      {suffix}
    </span>
  );
}

function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`mask-fade-x relative overflow-hidden ${className ?? ""}`}>
      <ul className="animate-marquee flex w-max gap-14 pr-14 hover:[animation-play-state:paused]">
        {[...row, ...row].map((item, i) => (
          <li key={i} aria-hidden={i >= items.length} className="whitespace-nowrap">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Prova social com números verdadeiros, clientes autorizados e tecnologias usadas nos produtos. */
export function Proof({ stats, clients, stack }: { stats: Stat[]; clients: string[]; stack: string[] }) {
  return (
    <section aria-label="A Ki em números" className="relative border-y border-line bg-ink-900/40 py-14">
      <Container>
        <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-l border-line-strong pl-5">
              <dd className="text-gradient text-5xl font-semibold tracking-tight sm:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 text-sm text-fg-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
      <div className="mt-14 space-y-6">
        <div className="flex items-center gap-6">
          <p className="label-mono hidden shrink-0 pl-[max(1rem,calc((100vw-80rem)/2+2rem))] text-fg-subtle md:block">Clientes</p>
          <Marquee items={clients} className="flex-1 text-3xl font-semibold tracking-tight text-fg/80 sm:text-4xl" />
        </div>
        <Marquee items={stack} className="label-mono text-fg-subtle [&_ul]:[animation-direction:reverse] [&_ul]:[animation-duration:60s]" />
      </div>
    </section>
  );
}
