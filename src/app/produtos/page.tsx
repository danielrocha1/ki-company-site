import { ProductCard } from "@/components/products/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPublicProducts } from "@/content/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Produtos",
  description: "Ecossistema de produtos digitais próprios da KI COMPANY, criados, lançados e operados pela nossa equipe de engenharia.",
  path: "/produtos",
  eyebrow: "Produtos",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Produtos", path: "/produtos" },
];

const principles = [
  { title: "Problema real primeiro", text: "Cada produto nasce de uma dor concreta, validada com quem a vive." },
  { title: "Engenharia de longo prazo", text: "Arquitetura pensada para operar e evoluir, não apenas para lançar." },
  { title: "Operação própria", text: "Mantemos o que construímos. Isso define o padrão de qualidade." },
];

export default function ProdutosPage() {
  const products = getPublicProducts();
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Ecossistema de produtos"
        title="Produtos digitais que criamos e operamos."
        description="Além de desenvolver para clientes, construímos produtos próprios. É onde testamos nossas decisões de arquitetura, experiência e operação no mundo real."
      />

      <section aria-label="Lista de produtos" className="pb-8">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {products.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.08}>
                <ProductCard product={p} priority={i === 0} />
              </Reveal>
            ))}
            <Reveal as="li" delay={0.12}>
              <div className="flex h-full min-h-[320px] flex-col justify-end rounded-2xl border border-dashed border-line-strong p-7">
                <p className="label-mono text-fg-subtle">Em construção</p>
                <p className="mt-3 text-xl font-semibold">Novos produtos a caminho.</p>
                <p className="mt-2 leading-relaxed text-fg-muted">
                  O ecossistema cresce a partir de problemas que encontramos nos projetos e nas operações que acompanhamos.
                </p>
              </div>
            </Reveal>
          </ul>
        </Container>
      </section>

      <section aria-labelledby="principios" className="py-20 sm:py-28">
        <Container>
          <SectionHeader id="principios" eyebrow="Como construímos produtos" title="O que todos os nossos produtos têm em comum." />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="border-t border-line-strong pt-6">
                <span className="label-mono text-data">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-fg-muted">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        title="Tem uma ideia de produto digital?"
        text="Aplicamos a mesma engenharia dos nossos produtos para tirar o seu do papel."
        primary={{ label: "Converse sobre seu projeto", href: "/contato?interesse=desenvolvimento-sob-demanda" }}
        secondary={{ label: "Desenvolvimento sob demanda", href: "/servicos/desenvolvimento-sob-demanda" }}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
