"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type CSSProperties } from "react";

import { ProductCard, StatusBadge } from "@/components/products/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import type { Product } from "@/content/types";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Tela do produto dentro do notebook: print real ou a marca do app. */
function Screen({ product }: { product: Product }) {
  const style = { "--accent": product.accent.primary, "--accent-2": product.accent.secondary } as CSSProperties;
  if (product.media?.desktop) {
    return (
      <Image
        src={product.media.desktop.src}
        alt={product.media.desktop.alt}
        width={product.media.desktop.width}
        height={product.media.desktop.height}
        sizes="(min-width: 1024px) 680px, 90vw"
        className="h-full w-full object-cover object-top"
      />
    );
  }
  return (
    <div style={style} className="relative grid h-full w-full place-items-center overflow-hidden bg-ink-900">
      <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_70%_10%,color-mix(in_oklab,var(--accent)_35%,transparent),transparent_60%),radial-gradient(80%_70%_at_10%_100%,color-mix(in_oklab,var(--accent-2)_30%,transparent),transparent_60%)]" />
      <div className="bg-blueprint absolute inset-0 opacity-60" />
      <div className="relative flex flex-col items-center gap-6 text-center">
        {product.logo ? (
          <Image src={product.logo.src} alt="" width={product.logo.width} height={product.logo.height} className="h-auto w-[280px]" />
        ) : product.appIcon ? (
          // eslint-disable-next-line @next/next/no-img-element -- ícone SVG pequeno
          <img src={product.appIcon.src} alt="" width={120} height={120} className="size-[120px] rounded-[30px] shadow-2xl shadow-black/60" />
        ) : (
          <span
            className="grid size-[120px] place-items-center rounded-[30px] border border-white/15 shadow-2xl shadow-black/60"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
          >
            <Icon name={product.glyph ?? "boxes"} className="size-14 text-white" />
          </span>
        )}
        {!product.logo && <span className="text-4xl font-semibold tracking-tight">{product.name}</span>}
        <span className="label-mono text-fg-muted">{product.category}</span>
      </div>
    </div>
  );
}

/**
 * Vitrine dos produtos: a seção fica presa na tela e, conforme a rolagem,
 * cada produto assume o notebook. Em telas pequenas, vira uma lista de cards.
 */
export function ProductShowcase({ products }: { products: Product[] }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(products.length - 1, Math.max(0, Math.floor(v * products.length)));
    setActive(i);
  });

  const current = products[active]!;
  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    const target = top + (span * (i + 0.5)) / products.length;
    if (window.__lenis) window.__lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop: vitrine fixa na rolagem */}
      <section
        ref={ref}
        aria-labelledby="vitrine"
        className="relative hidden lg:block"
        style={{ height: `${products.length * 65 + 35}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-[var(--header-h)]">
          <div aria-hidden className="bg-blueprint mask-fade-y pointer-events-none absolute inset-0 opacity-40" />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-[8%] h-[700px] w-[700px] -translate-y-1/2 rounded-full blur-3xl"
            animate={{ background: `radial-gradient(closest-side, ${current.accent.primary}33, ${current.accent.secondary}14 55%, transparent)` }}
            transition={{ duration: 0.8 }}
          />
          <Container className="relative grid w-full grid-cols-12 items-center gap-10">
            <div className="col-span-5">
              <p className="label-mono flex items-center gap-3 text-data">
                <span aria-hidden className="h-px w-8 bg-data" />
                02 — Produtos próprios
              </p>
              <h2 id="vitrine" className="mt-4 text-[clamp(2rem,2.8vw,2.8rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
                Produtos que criamos, vendemos e mantemos.
              </h2>

              <ol className="mt-7 space-y-0.5" aria-label="Produtos">
                {products.map((p, i) => (
                  <li key={p.slug}>
                    <button
                      type="button"
                      onClick={() => jump(i)}
                      aria-current={i === active}
                      className={cn(
                        "group flex w-full items-center gap-4 rounded-xl px-3 py-1.5 text-left transition-colors duration-300",
                        i === active ? "bg-white/[0.05]" : "hover:bg-white/[0.03]",
                      )}
                    >
                      <span className={cn("label-mono w-6 transition-colors", i === active ? "text-data" : "text-fg-subtle")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "text-lg font-semibold tracking-tight transition-all duration-300",
                          i === active ? "translate-x-1 text-fg" : "text-fg-subtle group-hover:text-fg-muted",
                        )}
                      >
                        {p.name}
                      </span>
                      {i === active && <StatusBadge product={p} className="ml-auto" />}
                    </button>
                  </li>
                ))}
              </ol>

              <div className="mt-6 min-h-[130px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <p className="text-lg leading-relaxed text-fg-muted">{current.tagline}</p>
                    <Link
                      href={`/produtos/${current.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-data"
                    >
                      Conhecer o {current.name}
                      <ArrowUpRight aria-hidden className="size-4" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Notebook */}
            <div className="col-span-7 [perspective:1600px]">
              <motion.div
                initial={{ rotateX: 18, opacity: 0, y: 40 }}
                whileInView={{ rotateX: 6, opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, ease: EASE }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative rounded-[22px] border border-white/12 bg-gradient-to-b from-ink-700 to-ink-850 p-3 shadow-[0_60px_120px_-30px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_255_255/0.04)_inset]">
                  <div aria-hidden className="absolute top-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white/20" />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink-950">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={current.slug}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
                        transition={{ duration: 0.7, ease: EASE }}
                      >
                        <Screen product={current} />
                      </motion.div>
                    </AnimatePresence>
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.07),transparent_40%)]" />
                  </div>
                </div>
                <div aria-hidden className="mx-auto h-4 w-[112%] -translate-x-[5.4%] rounded-b-[26px] bg-gradient-to-b from-ink-700 to-ink-900 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)]" />
              </motion.div>

              <div className="mt-10 flex items-center gap-4">
                <div className="h-px flex-1 overflow-hidden bg-line-strong">
                  <motion.div className="h-full origin-left bg-gradient-to-r from-signal to-data" style={{ scaleX: progress }} />
                </div>
                <span className="label-mono text-fg-subtle tabular-nums">
                  {String(active + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Mobile e tablet */}
      <section aria-labelledby="vitrine-mobile" className="py-20 lg:hidden">
        <Container>
          <p className="label-mono flex items-center gap-3 text-data">
            <span aria-hidden className="h-px w-8 bg-data" />
            02 — Produtos próprios
          </p>
          <h2 id="vitrine-mobile" className="mt-4 text-4xl leading-[1.05] font-semibold tracking-[-0.03em]">
            Produtos que criamos, vendemos e mantemos.
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {products.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <ButtonLink href="/produtos" variant="secondary" className="mt-8">
            Ver todos os produtos
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
