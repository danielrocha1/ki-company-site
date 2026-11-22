import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Hero } from "@/components/sections/home/Hero";
import { Journey, type JourneyStep } from "@/components/sections/home/Journey";
import { ProductShowcase } from "@/components/sections/home/ProductShowcase";
import { Proof } from "@/components/sections/home/Proof";

import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { clients, differentiators, pillars, processSteps } from "@/content/company";
import { getPublicProducts } from "@/content/products";
import { services } from "@/content/services";
import { site } from "@/content/site";
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
  const all = getPublicProducts();
  const order = ["mapfiber", "cx-tecnico", "cadastroki", "isp-noc", "estoki", "taktalk", "avvia", "limpaki"];
  const rank = (slug: string) => (order.includes(slug) ? order.indexOf(slug) : order.length);
  const showcase = [...all].sort((a, b) => rank(a.slug) - rank(b.slug));
  const stats = [
    { value: all.length, label: "produtos próprios" },
    { value: all.filter((p) => p.status === "live").length, label: "produtos no ar" },
    { value: clients.length, label: "provedores clientes" },
    { value: all.filter((p) => p.segment === "telecom").length, label: "produtos para provedores" },
  ];
  const href = (slug: string) => `/produtos/${slug}`;
  const journey: JourneyStep[] = [
    {
      id: "campo",
      icon: "smartphone",
      stage: "Campo",
      title: "O técnico instala sem ligar para o escritório.",
      text: "Agenda do dia, leitura da ONU pela câmera, autorização na OLT e OS fechada com fotos, direto do celular.",
      product: { name: "CX Técnico", href: href("cx-tecnico") },
    },
    {
      id: "rede",
      icon: "map",
      stage: "Rede",
      title: "A rede inteira no mapa, até sem sinal.",
      text: "Viabilidade por endereço, portas das CTOs, emendas e rompimentos, com o técnico montando a rede na rua.",
      product: { name: "MapFiber", href: href("mapfiber") },
    },
    {
      id: "base",
      icon: "database",
      stage: "Base",
      title: "Comprou um provedor? A base entra no IXC.",
      text: "Clientes, contratos e logins importados de dumps e planilhas, sem duplicar quem já existe.",
      product: { name: "Cadastroki", href: href("cadastroki") },
    },
    {
      id: "operacao",
      icon: "activity",
      stage: "Operação",
      title: "A queda aparece no painel antes do cliente ligar.",
      text: "Agente na rede do provedor, coleta ICMP, SNMP e MikroTik, incidentes e alertas num painel só.",
      product: { name: "ISP NOC", href: href("isp-noc") },
    },
  ];
  const stack = ["Go", "TypeScript", "Next.js", "React", "NestJS", "Django", "PostgreSQL", "Redis", "IXC Provedor", "MikroTik", "SNMP", "WhatsApp Business API"];

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

      <Proof stats={stats} clients={clients} stack={stack} />

      <ProductShowcase products={showcase} />

      <Journey steps={journey} />
      <div className="-mt-8 flex justify-center pb-10">
        <ButtonLink href="/telecom" variant="secondary">
          Soluções para telecom
        </ButtonLink>
      </div>

      {/* 3. Serviços */}
      <section aria-labelledby="servicos" className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            id="servicos"
            eyebrow="04 — Serviços especializados"
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
            eyebrow="05 — Como trabalhamos"
            title="Diferenciais que aparecem no código, não no discurso."
            description="Práticas de engenharia que aplicamos em todos os projetos, próprios ou de clientes."
          />
          <FeatureGrid items={differentiators} className="mt-12" />
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
