import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Info } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getService, services } from "@/content/services";
import { absoluteUrl, site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({ title: service.seo.title, description: service.seo.description, path: `/servicos/${slug}`, eyebrow: service.eyebrow });
}

const telecomSlugs = new Set(["integracao-noc", "viabilidade-tecnica"]);

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: service.shortTitle, path: `/servicos/${service.slug}` },
  ];
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow={service.eyebrow}
        title={service.headline}
        description={service.summary}
        aside={
          <div className="rounded-2xl border border-line-strong bg-ink-900/70 p-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-ink-800 text-data">
                <Icon name={service.icon} className="size-5" />
              </span>
              <p className="font-semibold">{service.title}</p>
            </div>
            <p className="label-mono mt-6 text-fg-subtle">Para quem</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {service.audience.map((a) => (
                <li key={a} className="rounded-full border border-line px-3 py-1 text-sm text-fg-muted">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={service.cta.href} size="lg">
            {service.cta.label}
          </ButtonLink>
          {telecomSlugs.has(service.slug) && (
            <ButtonLink href="/telecom" variant="secondary" size="lg">
              Conheça nossas soluções para telecom
            </ButtonLink>
          )}
        </div>
      </PageHero>

      {/* Problema → Complexidade */}
      <section aria-labelledby="problema" className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader id="problema" eyebrow="O problema" title={service.problem.title} description={service.problem.text} />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-2xl border border-line bg-ink-900/60 p-6 sm:p-7">
              <p className="label-mono text-warn">Complexidade operacional</p>
              <ul className="mt-5 space-y-4">
                {service.complexity.map((c) => (
                  <li key={c} className="flex gap-3 text-fg-muted">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-warn/80" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Solução */}
      <section aria-labelledby="solucao" className="py-16 sm:py-24">
        <Container>
          <SectionHeader id="solucao" eyebrow="A solução" title="O que podemos construir para a sua operação." />
          <FeatureGrid items={service.capabilities} className="mt-12" />
          <Reveal className="mt-6 flex gap-3 rounded-xl border border-line bg-white/[0.02] p-4 text-sm leading-relaxed text-fg-muted">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-data" />
            <p>{service.scopeNote}</p>
          </Reveal>
        </Container>
      </section>

      {/* Benefícios */}
      <section aria-labelledby="beneficios" className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader id="beneficios" eyebrow="Benefícios" title="O que muda na rotina." />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {service.benefits.map((b, i) => (
              <Reveal as="li" key={b} delay={(i % 2) * 0.06} className="flex gap-3 rounded-xl border border-line p-5">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-ok" />
                <span>{b}</span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Relacionados */}
      <section aria-labelledby="relacionados" className="py-16 sm:py-20">
        <Container>
          <h2 id="relacionados" className="label-mono text-fg-subtle">
            Serviços relacionados
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/servicos/${r.slug}`}
                  className="group flex h-full items-center justify-between gap-4 rounded-xl border border-line p-5 transition-colors hover:border-line-strong hover:bg-white/[0.02]"
                >
                  <span className="flex items-center gap-3">
                    <Icon name={r.icon} className="size-5 text-data" />
                    <span className="font-medium">{r.shortTitle}</span>
                  </span>
                  <ArrowRight aria-hidden className="size-4 text-fg-subtle transition-transform group-hover:translate-x-1 group-hover:text-fg" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title={`${service.cta.label}.`}
        text="Conte como sua operação funciona hoje. A primeira conversa é técnica e sem compromisso."
        primary={service.cta}
        secondary={{ label: "Ver todos os serviços", href: "/servicos" }}
      />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          serviceType: service.shortTitle,
          areaServed: "BR",
          url: absoluteUrl(`/servicos/${service.slug}`),
          provider: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
    </>
  );
}
