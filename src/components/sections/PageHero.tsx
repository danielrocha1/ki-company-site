import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/SectionHeader";

type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-fg-subtle">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden className="size-3" />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-fg-muted">
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="transition-colors hover:text-fg">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type Props = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
};

/** Cabeçalho das páginas internas. Animação CSS para pintar no primeiro frame. */
export function PageHero({ eyebrow, title, description, crumbs, children, aside }: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-16 sm:pb-20">
      <div aria-hidden className="bg-blueprint mask-radial pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="animate-gradient pointer-events-none absolute top-[-35%] left-[30%] -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgb(47_116_255/0.18),rgb(139_124_246/0.06)_60%,transparent)] blur-2xl"
      />
      <Container className={aside ? "grid items-center gap-12 lg:grid-cols-12" : undefined}>
        <div className={aside ? "lg:col-span-7" : "max-w-3xl"}>
          <div className="animate-rise">
            <Breadcrumbs items={crumbs} />
          </div>
          <Eyebrow className="animate-rise mt-8">{eyebrow}</Eyebrow>
          <h1
            className="animate-rise mt-4 text-[clamp(2.3rem,5.2vw,4rem)] leading-[1.03] font-semibold tracking-[-0.03em]"
            style={{ animationDelay: "60ms" }}
          >
            {title}
          </h1>
          <p className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl" style={{ animationDelay: "120ms" }}>
            {description}
          </p>
          {children && (
            <div className="animate-rise mt-9" style={{ animationDelay: "180ms" }}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="animate-rise lg:col-span-5" style={{ animationDelay: "160ms" }}>
            {aside}
          </div>
        )}
      </Container>
    </section>
  );
}
