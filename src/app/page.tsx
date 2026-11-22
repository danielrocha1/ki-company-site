import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProductCard } from "@/components/products/ProductCard";
import { ClientsStrip } from "@/components/sections/ClientsStrip";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Hero } from "@/components/sections/home/Hero";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { differentiators, pillars, processSteps } from "@/content/company";
import { getPublicProducts } from "@/content/products";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { diagramLayers, telecomAudiences } from "@/content/telecom";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: `${site.name} — Engenharia de software, integração e automação`,
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} — Engenharia de software, integração e automação` },
};

export default function HomePage() {
  const featuredSlugs = ["mapfiber", "cx-tecnico", "central-do-assinante", "estoki"];
  const allProducts = getPublicProducts();
  const products = featuredSlugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <Hero />

      {/* 1. Apresentação */}
      <section aria-labelledby="apresentacao" className="relative py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              id="apresentacao"
              eyebrow="01 — A empresa"
              title="Uma empresa de engenharia que constrói o próprio produto e o do cliente."
            />
          </div>
          <div className="lg:col-span-7 lg:pt-10">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg-muted sm:text-xl">
                A {site.name} desenvolve produtos digitais próprios e cria soluções de software, integração e automação para empresas que operam
                com muitos sistemas, muitos dados e pouco espaço para erro.
              </p>
            </Reveal>
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 0.08} className="border-t border-line-strong pt-5">
                  {p.icon && <Icon name={p.icon} className="size-5 text-data" />}
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 2. Produtos próprios */}
      <section aria-labelledby="produtos" className="relative py-20 sm:py-28">
        <div aria-hidden className="bg-blueprint mask-fade-y pointer-events-none absolute inset-0 opacity-50" />
        <Container className="relative">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              id="produtos"
              eyebrow="02 — Produtos próprios"
              title="Produtos que criamos, lançamos e operamos."
              description="Produtos que criamos, vendemos e mantemos, usados por provedores de internet e empresas. O que aprendemos operando volta para cada projeto de cliente."
            />
            <ButtonLink href="/produtos" variant="secondary" className="shrink-0">
              Ver os {allProducts.length} produtos
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} className={products.length === 1 ? "md:col-span-2 md:max-w-3xl" : undefined}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ClientsStrip />

      {/* 3. Serviços */}
      <section aria-labelledby="servicos" className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            id="servicos"
            eyebrow="03 — Serviços especializados"
            title="Software, integração e automação para operações complexas."
            description="Do NOC ao sistema comercial, do backend à observabilidade. Cada serviço começa entendendo a sua operação."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06}>
                <ServiceCard service={s} index={i} />
              </Reveal>
            ))}
            <Reveal as="li" delay={0.12}>
              <Link
                href="/contato"
                className="group flex h-full min-h-[260px] flex-col justify-between rounded-2xl border border-dashed border-line-strong p-7 transition-colors hover:border-signal/60 hover:bg-signal/[0.04]"
              >
                <span className="label-mono text-fg-subtle">Não encontrou?</span>
                <span>
                  <span className="block text-xl font-semibold">Converse sobre seu projeto</span>
                  <span className="mt-2 block leading-relaxed text-fg-muted">Se envolve software, dados ou integração, vale a conversa.</span>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
                    Falar com a equipe <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </Reveal>
          </ul>
        </Container>
      </section>

      {/* 4. Diferenciais */}
      <section aria-labelledby="diferenciais" className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            id="diferenciais"
            eyebrow="04 — Como trabalhamos"
            title="Diferenciais que aparecem no código, não no discurso."
            description="Práticas de engenharia que aplicamos em todos os projetos, próprios ou de clientes."
          />
          <FeatureGrid items={differentiators} className="mt-12" />
        </Container>
      </section>

      {/* 5. Telecom */}
      <section aria-labelledby="telecom" className="relative overflow-hidden py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_50%,rgb(47_123_255/0.12),transparent_70%)]"
        />
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              id="telecom"
              eyebrow="05 — Telecomunicações"
              title="Parceiro de tecnologia para quem mantém a rede de pé."
              description="Integramos monitoramento, inventário, viabilidade e sistemas comerciais para reduzir a fragmentação operacional de provedores, operadoras e integradores."
            />
            <Reveal className="mt-8 flex flex-wrap gap-2">
              {telecomAudiences.map((a) => (
                <span key={a} className="rounded-full border border-line-strong bg-white/[0.02] px-3 py-1.5 text-sm text-fg-muted">
                  {a}
                </span>
              ))}
            </Reveal>
            <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/telecom">Conheça nossas soluções para telecom</ButtonLink>
              <ButtonLink href="/servicos/viabilidade-tecnica" variant="ghost">
                Viabilidade técnica
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal>
            <ol className="relative space-y-2.5" aria-label="Camadas de uma integração para telecom">
              {diagramLayers.map((l, i) => (
                <li key={l.id} className="relative flex items-center gap-4 rounded-xl border border-line bg-ink-900/70 px-4 py-3.5">
                  <span className="label-mono w-10 shrink-0 text-data">L{i + 1}</span>
                  <span className="flex-1">
                    <span className="block font-medium">{l.title}</span>
                    <span className="block text-sm text-fg-subtle">{l.items.map((it) => it.label).join(" · ")}</span>
                  </span>
                  {i < diagramLayers.length - 1 && (
                    <span aria-hidden className="absolute -bottom-2.5 left-9 h-2.5 w-px bg-gradient-to-b from-signal to-data" />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* 6. Processo */}
      <section aria-labelledby="processo" className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            id="processo"
            eyebrow="06 — Processo"
            title="Do diagnóstico à operação, sem caixa-preta."
            description="Um processo claro de desenvolvimento e integração, com entregas visíveis em cada etapa."
          />
          <div className="mt-14">
            <ProcessTimeline steps={processSteps} />
          </div>
        </Container>
      </section>

      {/* 7. Chamada comercial */}
      <CtaBand
        title={
          <>
            Sua operação tem sistemas demais
            <br className="hidden sm:block" /> e integração de menos?
          </>
        }
        text="Conte o que precisa ser conectado, automatizado ou construído. Respondemos com um caminho técnico claro."
        primary={{ label: "Converse sobre seu projeto", href: "/contato" }}
        secondary={{ label: "Automatize sua operação", href: "/servicos/integracao-de-sistemas" }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          inLanguage: "pt-BR",
        }}
      />
    </>
  );
}
