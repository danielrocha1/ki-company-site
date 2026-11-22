import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { WordReveal } from "@/components/ui/WordReveal";
import { FiberField } from "@/components/visuals/FiberField";
import { KiEmblem } from "@/components/visuals/KiEmblem";
import { getPublicProducts } from "@/content/products";

const signals = ["Produtos próprios", "Integração de sistemas", "Automação", "Telecom"];

/** Posições dos selos de produto ao redor do emblema (em % da área). */
const chipSpots = [
  { top: "4%", left: "-6%", delay: "0s" },
  { top: "30%", right: "-10%", delay: "1.2s" },
  { bottom: "22%", left: "-12%", delay: "2.1s" },
  { bottom: "0%", right: "-2%", delay: "0.6s" },
];

export function Hero() {
  const products = getPublicProducts();
  const featured = ["mapfiber", "cx-tecnico", "estoki"];
  const live = featured.map((slug) => products.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-[calc(var(--header-h)+2rem)] pb-16 sm:pb-20"
    >
      {/* Fundo: campo de fibra interativo + luzes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <FiberField className="absolute inset-0 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_40%,transparent,rgb(10_16_32/0.75)_75%)]" />
        <div className="animate-gradient absolute top-[-25%] right-[-15%] h-[900px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgb(30_91_255/0.25),rgb(0_230_195/0.08)_55%,transparent)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <Container className="grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative z-10 lg:col-span-7">
          <p className="label-mono animate-rise inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-950/60 px-3 py-1.5 text-fg-muted backdrop-blur">
            <span aria-hidden className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-data opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-data" />
            </span>
            {products.length} produtos próprios no ecossistema
          </p>

          <h1 id="hero-title" className="mt-7 text-[clamp(2.5rem,5vw,4.6rem)] leading-[0.98] font-semibold tracking-[-0.04em]">
            <WordReveal
              delay={0.15}
              lines={[{ text: "Tecnologia que conecta." }, { text: "Engenharia que transforma.", className: "text-gradient" }]}
            />
          </h1>

          <p className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl" style={{ animationDelay: "700ms" }}>
            Criamos produtos digitais, integramos sistemas e automatizamos operações. Do técnico na rua ao painel do gestor, software que
            funciona onde o trabalho acontece.
          </p>

          <div className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "850ms" }}>
            <Magnetic>
              <ButtonLink href="/contato" size="lg" className="shadow-[0_0_40px_-6px_rgb(47_123_255/0.7)]">
                Quero conversar com a Ki
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/produtos" size="lg" variant="secondary">
                Ver os produtos
              </ButtonLink>
            </Magnetic>
          </div>

          <ul
            aria-label="Áreas de atuação"
            className="animate-rise mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6"
            style={{ animationDelay: "1000ms" }}
          >
            {signals.map((s) => (
              <li key={s} className="label-mono flex items-center gap-2 text-fg-subtle">
                <span aria-hidden className="size-1 rounded-full bg-data" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:col-span-5">
          <KiEmblem className="aspect-square w-full" />
          <ul aria-label="Produtos no ar" className="hidden sm:block">
            {[...live.map((p) => ({ label: p.name, sub: p.statusLabel })), { label: `+${products.length - live.length} produtos`, sub: "Ecossistema Ki" }].map(
              (chip, i) => {
                const spot = chipSpots[i % chipSpots.length]!;
                const { delay, ...pos } = spot;
                return (
                  <li
                    key={chip.label}
                    className="animate-float absolute flex items-center gap-2.5 rounded-2xl border border-white/10 bg-ink-900/70 px-3.5 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-md"
                    style={{ ...pos, animationDelay: delay }}
                  >
                    <span aria-hidden className="size-2 rounded-full bg-ok shadow-[0_0_10px_2px_rgb(52_211_153/0.6)]" />
                    <span className="leading-tight">
                      <span className="block text-sm font-semibold">{chip.label}</span>
                      <span className="label-mono block !text-[0.6rem] text-fg-subtle">{chip.sub}</span>
                    </span>
                  </li>
                );
              },
            )}
          </ul>
        </div>
      </Container>

    </section>
  );
}
