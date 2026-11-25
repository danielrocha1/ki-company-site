import type { Feature } from "@/content/types";
import { cn } from "@/lib/cn";

import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

/** Grade de recursos com linhas de diagrama entre os itens. */
export function FeatureGrid({ items, columns = 3, className }: { items: Feature[]; columns?: 2 | 3; className?: string }) {
  return (
    <ul className={cn("grid overflow-hidden rounded-2xl border border-line bg-line [gap:1px] sm:grid-cols-2", columns === 3 && "lg:grid-cols-3", className)}>
      {items.map((f, i) => (
        <Reveal
          as="li"
          key={f.title}
          delay={(i % 3) * 0.06}
          className="group relative overflow-hidden bg-ink-950 p-6 transition-colors duration-300 hover:bg-ink-900 sm:p-8"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal to-data transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
          />
          {f.icon && (
            <span className="inline-grid size-10 place-items-center rounded-lg border border-line bg-ink-850 text-signal transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-data/40 group-hover:text-data group-hover:shadow-[0_0_24px_rgb(0_230_195/0.25)]">
              <Icon name={f.icon} className="size-[18px]" />
            </span>
          )}
          <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
          <p className="mt-2 leading-relaxed text-fg-muted">{f.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}
