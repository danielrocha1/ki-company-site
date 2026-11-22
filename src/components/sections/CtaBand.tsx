import type { ReactNode } from "react";

import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/SectionHeader";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  text: ReactNode;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
};

export function CtaBand({ eyebrow = "Próximo passo", title, text, primary, secondary }: Props) {
  return (
    <section aria-labelledby="cta-title" className="py-20 sm:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[28px] border border-line-strong bg-ink-850 px-6 py-14 sm:px-12 sm:py-20">
          <div aria-hidden className="bg-blueprint mask-radial pointer-events-none absolute inset-0 opacity-70" />
          <div
            aria-hidden
            className="animate-gradient pointer-events-none absolute -top-1/2 left-1/2 h-[140%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(77_141_255/0.22),rgb(139_124_246/0.08)_55%,transparent)] blur-2xl"
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
            <h2 id="cta-title" className="mt-4 text-[clamp(1.9rem,4vw,3rem)] leading-[1.06] font-semibold">
              {title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">{text}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={primary.href} external={primary.external} size="lg">
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} size="lg" variant="secondary">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
