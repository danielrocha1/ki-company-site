import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, CircleDashed } from "lucide-react";
import type { CSSProperties } from "react";

import { ProductVisual, StatusBadge } from "@/components/products/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { canShowHidden, getProduct, products } from "@/content/products";
import { absoluteUrl } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.filter((p) => p.visibility === "public" || canShowHidden()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: `/produtos/${product.slug}`,
    eyebrow: product.category,
    noindex: product.visibility !== "public",
  });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const crumbs = [
    { name: "Início", path: "/" },
    { name: "Produtos", path: "/produtos" },
    { name: product.name, path: `/produtos/${product.slug}` },
  ];
  const accentStyle = { "--accent": product.accent.primary, "--accent-2": product.accent.secondary } as CSSProperties;

  return (
    <div style={accentStyle}>
      <PageHero
        crumbs={crumbs}
        eyebrow={product.category}
        title={
          <>
            {product.logo ? <span className="sr-only">{product.name}</span> : product.name}
            {product.logo && (
              <Image src={product.logo.src} alt="" width={product.logo.width} height={product.logo.height} priority className="h-auto w-[min(320px,70vw)]" />
            )}
          </>
        }
        description={product.summary}
        aside={<ProductVisual product={product} priority />}
      >
        <div className="flex flex-col gap-4">
          <StatusBadge product={product} className="self-start" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={product.primaryCta.href} external={product.primaryCta.external} size="lg">
              {product.primaryCta.label}
            </ButtonLink>
            {product.secondaryCta && (
              <ButtonLink href={product.secondaryCta.href} external={product.secondaryCta.external} variant="secondary" size="lg">
                {product.secondaryCta.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </PageHero>

      {/* Problema */}
      <section aria-labelledby="problema" className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader id="problema" eyebrow="O problema" title={product.problem.title} />
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-12">
            <p className="text-lg leading-relaxed text-fg-muted sm:text-xl">{product.problem.text}</p>
          </Reveal>
        </Container>
      </section>

      {/* Como funciona */}
      <section aria-labelledby="como-funciona" className="py-16 sm:py-24">
        <Container>
          <SectionHeader id="como-funciona" eyebrow="Como funciona" title={`Visão geral do funcionamento da ${product.name}.`} />
          <div className="mt-12 grid items-start gap-10 lg:grid-cols-12">
            <ol className={product.media?.mobile ? "grid gap-4 sm:grid-cols-2 lg:col-span-8" : "grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4"}>
              {product.howItWorks.map((step, i) => (
                <Reveal as="li" key={step.title} delay={(i % 2) * 0.08} className="relative rounded-2xl border border-line bg-ink-900/60 p-6">
                  <span className="label-mono" style={{ color: "var(--accent)" }}>
                    Passo {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-fg-muted">{step.text}</p>
                </Reveal>
              ))}
            </ol>
            {product.media?.mobile && (
              <Reveal className="mx-auto w-[240px] lg:col-span-4 lg:w-[260px]">
                <div className="relative rounded-[2.4rem] border border-white/15 bg-ink-800 p-2.5 shadow-2xl shadow-black/60">
                  <div aria-hidden className="absolute top-4 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink-950" />
                  <Image
                    src={product.media.mobile.src}
                    alt={product.media.mobile.alt}
                    width={product.media.mobile.width}
                    height={product.media.mobile.height}
                    sizes="260px"
                    className="h-auto w-full rounded-[1.9rem]"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      {/* Benefícios por público */}
      <section aria-labelledby="beneficios" className="py-16 sm:py-24">
        <Container>
          <SectionHeader id="beneficios" eyebrow="Benefícios" title="Valor para cada lado da plataforma." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {product.audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08} className="rounded-2xl border border-line bg-gradient-to-b from-white/[0.03] to-transparent p-7">
                <h3 className="text-xl font-semibold">{a.title}</h3>
                <ul className="mt-5 space-y-3">
                  {a.items.map((item) => (
                    <li key={item} className="flex gap-3 text-fg-muted">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0" style={{ color: "var(--accent)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Diferenciais */}
      <section aria-labelledby="diferenciais" className="py-16 sm:py-24">
        <Container>
          <SectionHeader id="diferenciais" eyebrow="Diferenciais" title="O que torna a plataforma diferente." />
          <FeatureGrid items={product.differentiators} className="mt-12" />
        </Container>
      </section>

      {/* Situação atual (produtos em desenvolvimento) */}
      {product.currentState && (
        <section aria-labelledby="situacao" className="py-16 sm:py-24">
          <Container>
            <SectionHeader
              id="situacao"
              eyebrow="Situação atual"
              title="O que já existe e o que vem a seguir."
              description="Transparência sobre o estágio do produto. Nada aqui é promessa de prazo."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Reveal className="rounded-2xl border border-ok/25 bg-ok/[0.04] p-7">
                <h3 className="label-mono text-ok">Disponível</h3>
                <ul className="mt-5 space-y-3">
                  {product.currentState.available.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-ok" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className="rounded-2xl border border-line bg-ink-900/50 p-7">
                <h3 className="label-mono text-fg-subtle">Em desenvolvimento</h3>
                <ul className="mt-5 space-y-3">
                  {product.currentState.next.map((item) => (
                    <li key={item} className="flex gap-3 text-fg-muted">
                      <CircleDashed aria-hidden className="mt-0.5 size-4 shrink-0 text-fg-subtle" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            {product.currentState.note && <p className="mt-6 max-w-3xl text-sm leading-relaxed text-fg-subtle">{product.currentState.note}</p>}
          </Container>
        </section>
      )}

      <CtaBand
        eyebrow={product.name}
        title={product.status === "live" ? `Conheça a ${product.name}.` : `Acompanhe a ${product.name}.`}
        text={product.tagline}
        primary={product.primaryCta}
        secondary={{ label: "Explore nossos produtos", href: "/produtos" }}
      />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {product.visibility === "public" && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: product.name,
            description: product.summary,
            applicationCategory: "BusinessApplication",
            url: absoluteUrl(`/produtos/${product.slug}`),
            ...(product.primaryCta.external ? { sameAs: product.primaryCta.href } : {}),
          }}
        />
      )}
    </div>
  );
}
