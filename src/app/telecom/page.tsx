import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

import { ProductCard } from "@/components/products/ProductCard";
import { ClientsStrip } from "@/components/sections/ClientsStrip";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProductsBySegment } from "@/content/products";
import { telecomAudiences, telecomPains, telecomSolutions } from "@/content/telecom";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

// Componente interativo pesado: carregado em um chunk separado.
const TelecomDiagram = dynamic(() => import("@/components/visuals/TelecomDiagram").then((m) => m.TelecomDiagram), {
  loading: () => <div className="aspect-[1000/600] w-full animate-pulse rounded-[28px] border border-line bg-ink-900/60" />,
});

export const metadata = buildMetadata({
  title: "Soluções para telecom",
  description:
    "Parceiro de tecnologia para provedores de internet, operadoras e integradores: integração com NOC, viabilidade técnica automatizada e integração com sistemas comerciais.",
  path: "/telecom",
  eyebrow: "Telecom",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Telecom", path: "/telecom" },
];

const engagement = [
  { title: "Mapeamento", text: "Levantamos os sistemas, as fontes de dados e as integrações disponíveis na sua operação." },
  { title: "Prioridade por impacto", text: "Começamos pela integração que mais reduz trabalho manual ou tempo de resposta." },
  { title: "Integração incremental", text: "Cada sistema entra na camada de integração sem interromper a operação existente." },
  { title: "Operação acompanhada", text: "Monitoramos as integrações em produção e evoluímos conforme novas necessidades." },
];

export default function TelecomPage() {
  const telecomProducts = getProductsBySegment("telecom");
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Soluções para telecomunicações"
        title="Menos sistemas isolados. Mais rede sob controle."
        description="Somos parceiros de tecnologia de provedores de internet, integradores e empresas que operam infraestrutura de redes. Conectamos monitoramento, viabilidade, NOC e sistemas comerciais numa operação integrada."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contato?interesse=telecom" size="lg">
            Solicite uma integração
          </ButtonLink>
          <ButtonLink href="#diagrama" variant="secondary" size="lg" arrow={false}>
            Ver o diagrama
          </ButtonLink>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Para quem">
          {telecomAudiences.map((a) => (
            <li key={a} className="rounded-full border border-line-strong bg-white/[0.02] px-3 py-1.5 text-sm text-fg-muted">
              {a}
            </li>
          ))}
        </ul>
      </PageHero>

      <section aria-labelledby="desafio" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="desafio"
            eyebrow="O desafio"
            title="A operação de telecom cresceu. As integrações, nem sempre."
            description="Ferramentas de monitoramento, inventário, viabilidade, tickets e CRM foram adotadas em momentos diferentes. O resultado é uma operação fragmentada, que depende de pessoas para ligar os pontos."
          />
          <FeatureGrid items={telecomPains} className="mt-12" />
        </Container>
      </section>

      <section id="diagrama" aria-labelledby="diagrama-titulo" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="diagrama-titulo"
            eyebrow="Arquitetura de integração"
            title="Como uma camada de integração reduz a fragmentação."
            description="Compare os dois cenários e selecione cada camada para entender o papel dela no fluxo, das origens de dados até o NOC, o CRM e os sistemas comerciais."
          />
          <Reveal className="mt-12">
            <TelecomDiagram />
          </Reveal>
          <p className="mt-4 text-sm text-fg-subtle">
            Representação conceitual. Sistemas, conectores e regras de cada projeto são definidos a partir do ambiente da sua operação.
          </p>
        </Container>
      </section>

      <section aria-labelledby="solucoes" className="py-16 sm:py-24">
        <Container>
          <SectionHeader id="solucoes" eyebrow="Soluções" title="Onde atuamos na operação de telecom." />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {telecomSolutions.map((s, i) => (
              <Reveal as="li" key={s.serviceSlug} delay={(i % 2) * 0.08}>
                <Link
                  href={`/servicos/${s.serviceSlug}`}
                  className="group flex h-full gap-5 rounded-2xl border border-line bg-ink-900/50 p-6 transition-colors hover:border-line-strong hover:bg-ink-900 sm:p-7"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-ink-800 text-data">
                    <Icon name={s.icon} className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-semibold">{s.title}</span>
                    <span className="mt-1.5 block leading-relaxed text-fg-muted">{s.text}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                      Ver serviço <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="produtos-telecom" className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              id="produtos-telecom"
              eyebrow="Produtos prontos"
              title="Produtos para provedores, já em uso."
              description="Além de projetos sob medida, a KI COMPANY tem produtos próprios para a rotina do provedor, do técnico de campo ao assinante."
            />
            <ButtonLink href="/produtos" variant="secondary" className="shrink-0">
              Todos os produtos
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {telecomProducts.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 2) * 0.08}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <ClientsStrip />

      <section aria-labelledby="engajamento" className="py-16 sm:py-24">
        <Container>
          <SectionHeader id="engajamento" eyebrow="Como começamos" title="Integração sem parar a operação." />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engagement.map((e, i) => (
              <Reveal as="li" key={e.title} delay={i * 0.06} className="border-t border-line-strong pt-5">
                <span className="label-mono text-data">0{i + 1}</span>
                <h3 className="mt-3 font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{e.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        eyebrow="Telecom"
        title="Conecte os sistemas da sua operação."
        text="Conte quais ferramentas sua equipe usa hoje e onde está o maior trabalho manual."
        primary={{ label: "Solicite uma integração", href: "/contato?interesse=telecom" }}
        secondary={{ label: "Automatize sua operação", href: "/servicos/viabilidade-tecnica" }}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
