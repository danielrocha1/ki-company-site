import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

import type { Product } from "@/content/types";
import { cn } from "@/lib/cn";

import { SpotlightCard } from "../ui/SpotlightCard";

export function StatusBadge({ product, className }: { product: Product; className?: string }) {
  const live = product.status === "live";
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 !text-[0.62rem]",
        live ? "border-ok/30 bg-ok/10 text-ok" : "border-warn/30 bg-warn/10 text-warn",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", live ? "bg-ok" : "bg-warn")} />
      {product.statusLabel}
    </span>
  );
}

/** Prévia visual do produto: mockup real quando existe, senão a marca do produto. */
export function ProductVisual({ product, priority }: { product: Product; priority?: boolean }) {
  const style = { "--accent": product.accent.primary, "--accent-2": product.accent.secondary } as CSSProperties;
  return (
    <div style={style} className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-ink-900">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_0%,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_60%),radial-gradient(90%_70%_at_0%_100%,color-mix(in_oklab,var(--accent-2)_22%,transparent),transparent_60%)]"
      />
      <div aria-hidden className="bg-blueprint absolute inset-0 opacity-60" />
      {product.media?.desktop ? (
        <div className="absolute inset-x-[7%] top-[9%] bottom-0 overflow-hidden rounded-t-lg border border-white/10 shadow-2xl shadow-black/60 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5">
          <div aria-hidden className="flex h-5 items-center gap-1 border-b border-white/10 bg-ink-800 px-2">
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
          </div>
          <Image
            src={product.media.desktop.src}
            alt={product.media.desktop.alt}
            width={product.media.desktop.width}
            height={product.media.desktop.height}
            sizes="(min-width: 1024px) 560px, 90vw"
            priority={priority}
            className="h-auto w-full"
          />
        </div>
      ) : product.logo ? (
        <div className="absolute inset-0 grid place-items-center p-[18%]">
          <Image src={product.logo.src} alt={product.logo.alt} width={product.logo.width} height={product.logo.height} className="h-auto w-full max-w-[260px]" />
        </div>
      ) : (
        <div className="absolute inset-0 grid place-items-center text-3xl font-semibold">{product.name}</div>
      )}
    </div>
  );
}

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <SpotlightCard className="group h-full">
      <Link href={`/produtos/${product.slug}`} className="flex h-full flex-col rounded-2xl p-4 sm:p-5">
        <ProductVisual product={product} priority={priority} />
        <div className="flex flex-1 flex-col px-1 pt-6 pb-1">
          <div className="flex items-center justify-between gap-3">
            <p className="label-mono text-fg-subtle">{product.category}</p>
            <StatusBadge product={product} />
          </div>
          <h3 className="mt-3 text-2xl font-semibold">{product.name}</h3>
          <p className="mt-2 leading-relaxed text-fg-muted">{product.tagline}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-fg">
            Explorar produto
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </SpotlightCard>
  );
}
