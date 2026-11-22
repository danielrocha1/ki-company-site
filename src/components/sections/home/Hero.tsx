import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NetworkTopology } from "@/components/visuals/NetworkTopology";
import { ParallaxLayer } from "@/components/visuals/ParallaxLayer";

const signals = ["Produtos próprios", "Integração de sistemas", "Automação", "Telecom"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-16 sm:pb-24 lg:pt-[calc(var(--header-h)+4.5rem)]">
      {/* Fundo: grade técnica + luz controlada */}
      <ParallaxLayer className="pointer-events-none absolute inset-0 -z-10" speed={0.15}>
        <div aria-hidden className="bg-blueprint mask-radial absolute inset-0" />
      </ParallaxLayer>
      <div
        aria-hidden
        className="animate-gradient pointer-events-none absolute top-[-20%] right-[-10%] -z-10 h-[780px] w-[780px] rounded-full bg-[radial-gradient(closest-side,rgb(47_123_255/0.22),rgb(139_124_246/0.08)_55%,transparent)] blur-2xl"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink-950" />

      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p className="label-mono animate-rise inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-3 py-1.5 text-fg-muted">
            <span aria-hidden className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-data opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-data" />
            </span>
            Engenharia de software
          </p>

          <h1
            id="hero-title"
            className="animate-rise mt-6 text-[clamp(2.6rem,6.2vw,4.9rem)] leading-[0.98] font-semibold tracking-[-0.035em]"
            style={{ animationDelay: "60ms" }}
          >
            Tecnologia que conecta.
            <br />
            <span className="text-gradient">Engenharia que transforma.</span>
          </h1>

          <p
            className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl"
            style={{ animationDelay: "140ms" }}
          >
            Desenvolvemos produtos digitais, integramos sistemas e criamos soluções tecnológicas para conectar negócios,
            pessoas e operações.
          </p>

          <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "220ms" }}>
            <ButtonLink href="/servicos" size="lg">
              Conheça nossas soluções
            </ButtonLink>
            <ButtonLink href="/contato" size="lg" variant="secondary">
              Fale com um especialista
            </ButtonLink>
          </div>

          <ul
            aria-label="Áreas de atuação"
            className="animate-rise mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6"
            style={{ animationDelay: "300ms" }}
          >
            {signals.map((s) => (
              <li key={s} className="label-mono flex items-center gap-2 text-fg-subtle">
                <span aria-hidden className="size-1 rounded-full bg-signal" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6">
          <div
            className="animate-rise relative mx-auto aspect-[640/560] w-full max-w-[620px]"
            style={{ animationDelay: "180ms" }}
          >
            <NetworkTopology className="relative h-full w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
