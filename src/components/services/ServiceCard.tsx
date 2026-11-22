import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Service } from "@/content/types";

import { Icon } from "../ui/Icon";
import { SpotlightCard } from "../ui/SpotlightCard";

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  return (
    <SpotlightCard className="group h-full">
      <Link href={`/servicos/${service.slug}`} className="flex h-full flex-col rounded-2xl p-6 sm:p-7">
        <div className="flex items-start justify-between">
          <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-ink-800 text-data transition-colors group-hover:border-signal/50 group-hover:text-fg">
            <Icon name={service.icon} className="size-5" />
          </span>
          {index !== undefined && <span className="label-mono text-fg-subtle">{String(index + 1).padStart(2, "0")}</span>}
        </div>
        <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
        <p className="mt-3 leading-relaxed text-fg-muted">{service.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {service.capabilities.slice(0, 3).map((c) => (
            <li key={c.title} className="rounded-full border border-line px-2.5 py-1 text-xs text-fg-subtle">
              {c.title}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-medium text-fg">
          Ver detalhes
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </SpotlightCard>
  );
}
