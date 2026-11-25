import Image from "next/image";

import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tilt } from "@/components/ui/Tilt";
import { about, differentiators, team } from "@/content/company";
import { site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sobre",
  description: "Quem somos, nossa visão, missão e cultura de engenharia. A KI COMPANY desenvolve produtos próprios e soluções de software para empresas.",
  path: "/sobre",
  eyebrow: "Sobre",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Sobre", path: "/sobre" },
];

export default function SobrePage() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Quem somos" title="Engenharia de software com mentalidade de produto." description={about.whoWeAre} />

      <section aria-label="Visão e missão" className="py-12 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          {[
            { label: "Visão", text: about.vision },
            { label: "Missão", text: about.mission },
          ].map((b, i) => (
            <Reveal key={b.label} delay={i * 0.08} className="relative overflow-hidden rounded-2xl border border-line-strong bg-ink-900/60 p-8 sm:p-10">
              <div aria-hidden className="bg-blueprint absolute inset-0 opacity-40" />
              <h2 className="label-mono relative text-data">{b.label}</h2>
              <p className="relative mt-5 text-xl leading-snug font-medium sm:text-2xl">{b.text}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      <section aria-labelledby="equipe" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="equipe"
            eyebrow="Quem faz"
            title="As pessoas por trás dos produtos."
            description="Quem desenvolve, coloca no ar e mantém o que a KI entrega, do código ao equipamento na rede."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 0.1}>
                <Tilt max={6} className="group">
                  <figure className="relative overflow-hidden rounded-2xl border border-line-strong bg-ink-900">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={m.photo}
                        alt={`Foto de ${m.name}`}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                        className="object-cover grayscale transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-[linear-gradient(140deg,rgb(30_91_255/0.25),transparent_45%,rgb(0_230_195/0.18))] opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
                      />
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 p-6">
                      <span aria-hidden className="mb-4 block h-px w-10 bg-gradient-to-r from-signal to-data transition-all duration-500 group-hover:w-20" />
                      <span className="block text-xl font-semibold">{m.name}</span>
                      <span className="label-mono mt-2 block text-data">{m.role}</span>
                    </figcaption>
                  </figure>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="cultura" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="cultura"
            eyebrow="Cultura de engenharia"
            title="Como pensamos e como trabalhamos."
            description="Princípios que orientam cada decisão técnica, nos nossos produtos e nos projetos dos clientes."
          />
          <FeatureGrid items={about.culture} columns={2} className="mt-12" />
        </Container>
      </section>

      <section aria-labelledby="atuacao" className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader id="atuacao" eyebrow="Atuação" title="Duas frentes, uma mesma engenharia." />
          </div>
          <div className="space-y-10 lg:col-span-7">
            <Reveal className="border-l border-signal/50 pl-6">
              <h3 className="text-xl font-semibold">Produtos próprios</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{about.productDevelopment}</p>
            </Reveal>
            <Reveal className="border-l border-data/50 pl-6">
              <h3 className="text-xl font-semibold">Mercado corporativo</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{about.corporate}</p>
            </Reveal>
            <Reveal className="border-l border-violet/50 pl-6">
              <h3 className="text-xl font-semibold">Compromisso com tecnologia e inovação</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{about.commitment}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section aria-labelledby="praticas" className="py-16 sm:py-24">
        <Container>
          <SectionHeader id="praticas" eyebrow="Na prática" title="O que você encontra em todo projeto." />
          <FeatureGrid items={differentiators} className="mt-12" />
        </Container>
      </section>

      <CtaBand
        title={`Vamos construir algo juntos?`}
        text={`Converse com a equipe da ${site.name} sobre o seu desafio de software, integração ou automação.`}
        primary={{ label: "Converse sobre seu projeto", href: "/contato" }}
        secondary={{ label: "Explore nossos produtos", href: "/produtos" }}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
