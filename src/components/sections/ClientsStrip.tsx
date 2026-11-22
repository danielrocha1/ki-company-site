import { clients } from "@/content/company";
import { cn } from "@/lib/cn";

import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

/** Faixa com os provedores que usam produtos da KI COMPANY (nomes autorizados). */
export function ClientsStrip({ className, title = "Provedores que usam nossos produtos" }: { className?: string; title?: string }) {
  if (clients.length === 0) return null;
  return (
    <section aria-label={title} className={cn("py-12", className)}>
      <Container>
        <Reveal className="flex flex-col items-center gap-6 rounded-2xl border border-line bg-ink-900/50 px-6 py-8 sm:flex-row sm:justify-between sm:px-10">
          <p className="label-mono text-center text-fg-subtle sm:text-left">{title}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {clients.map((c) => (
              <li key={c} className="text-xl font-semibold tracking-tight text-fg/85 sm:text-2xl">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
