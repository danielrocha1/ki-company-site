import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processSteps } from "@/content/company";
import { services } from "@/content/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Serviços",
  description:
    "Integração com NOC, viabilidade técnica para telecom, integração de sistemas, desenvolvimento sob demanda, infraestrutura e observabilidade.",
  path: "/servicos",
  eyebrow: "Serviços",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Serviços", path: "/servicos" },
];

export default function ServicosPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Serviços tecnológicos"
        title="Engenharia para conectar, automatizar e construir."
        description="Atuamos onde a operação é complexa: muitos sistemas, muitos dados e processos que não podem parar. Cada serviço parte de um diagnóstico da sua operação."
      >
        <ButtonLink href="/contato" size="lg">
          Converse sobre seu projeto
        </ButtonLink>
      </PageHero>

      <section aria-label="Serviços" className="pb-12">
        <Container>
          <ul className="divide-y divide-line border-y border-line">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug}>
                <Link
                  href={`/servicos/${s.slug}`}
                  className="group grid gap-6 py-10 transition-colors md:grid-cols-12 md:items-start md:py-12"
                >
                  <div className="flex items-center gap-4 md:col-span-4">
                    <span className="label-mono text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <span className="grid size-12 place-items-center rounded-xl border border-line-strong bg-ink-850 text-data transition-colors group-hover:border-signal/60">
                      <Icon name={s.icon} className="size-5" />
                    </span>
                    <span className="label-mono hidden text-fg-subtle lg:inline">{s.eyebrow}</span>
                  </div>
                  <div className="md:col-span-7">
                    <h2 className="text-2xl font-semibold transition-colors group-hover:text-white sm:text-3xl">{s.title}</h2>
                    <p className="mt-3 max-w-2xl leading-relaxed text-fg-muted">{s.summary}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {s.capabilities.map((c) => (
                        <li key={c.title} className="rounded-full border border-line px-2.5 py-1 text-xs text-fg-subtle">
                          {c.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex md:col-span-1 md:justify-end">
                    <span className="grid size-11 place-items-center rounded-full border border-line-strong transition-all group-hover:border-signal group-hover:bg-signal">
                      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                      <span className="sr-only">Ver {s.title}</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="processo" className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            id="processo"
            eyebrow="Processo de desenvolvimento e integração"
            title="Como um projeto acontece."
            description="O mesmo processo vale para uma integração pontual e para um sistema completo. O que muda é a profundidade de cada etapa."
          />
          <div className="mt-14">
            <ProcessTimeline steps={processSteps} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Vamos entender a sua operação?"
        text="Uma conversa técnica inicial para mapear sistemas, gargalos e caminhos possíveis."
        primary={{ label: "Converse sobre seu projeto", href: "/contato" }}
        secondary={{ label: "Soluções para telecom", href: "/telecom" }}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
