import { Clock, FileText, MessagesSquare } from "lucide-react";

import { ContactForm } from "@/components/contact/ContactForm";
import { Breadcrumbs } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { site, whatsappHref } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contato",
  description: "Fale com um especialista da KI COMPANY sobre integração de sistemas, automação, telecom ou desenvolvimento de software.",
  path: "/contato",
  eyebrow: "Contato",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Contato", path: "/contato" },
];

const steps = [
  { icon: FileText, title: "Você descreve o cenário", text: "Sistemas envolvidos, o que precisa mudar e o que já foi tentado." },
  { icon: MessagesSquare, title: "Conversa técnica", text: "Entendemos a operação e tiramos dúvidas, sem roteiro de vendas." },
  { icon: Clock, title: "Caminho proposto", text: "Você recebe uma proposta de abordagem, etapas e próximos passos." },
];

export default async function ContatoPage({ searchParams }: { searchParams: Promise<{ interesse?: string | string[] }> }) {
  const { interesse } = await searchParams;
  const defaultInterest = typeof interesse === "string" ? interesse : undefined;
  const wa = whatsappHref();
  const hasDirect = Boolean(site.contact.email || site.contact.phone || wa);

  const directContacts = hasDirect ? (
    <ul className="space-y-1">
      {site.contact.email && (
        <li>
          E-mail:{" "}
          <a className="text-fg underline underline-offset-4" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
        </li>
      )}
      {site.contact.phone && <li>Telefone: {site.contact.phone}</li>}
      {wa && (
        <li>
          <a className="text-fg underline underline-offset-4" href={wa} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </li>
      )}
    </ul>
  ) : undefined;

  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-8">
      <div aria-hidden className="bg-blueprint mask-radial pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgb(47_116_255/0.16),transparent)] blur-2xl"
      />
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="animate-rise">
            <Breadcrumbs items={crumbs} />
          </div>
          <Eyebrow className="animate-rise mt-8">Fale com um especialista</Eyebrow>
          <h1 className="animate-rise mt-4 text-[clamp(2.3rem,5vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.03em]" style={{ animationDelay: "60ms" }}>
            Converse sobre seu projeto.
          </h1>
          <p className="animate-rise mt-6 text-lg leading-relaxed text-fg-muted" style={{ animationDelay: "120ms" }}>
            Conte o que precisa ser integrado, automatizado ou construído. Quanto mais contexto, mais objetiva será a nossa resposta.
          </p>

          <ol className="animate-rise mt-10 space-y-6" style={{ animationDelay: "180ms" }} aria-label="O que acontece depois">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line-strong bg-ink-850 text-data">
                  <s.icon aria-hidden className="size-[18px]" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="label-mono text-fg-subtle">Etapa {i + 1}</span>
                  <span className="mt-1 block font-medium">{s.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-fg-muted">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>

          {directContacts && (
            <div className="mt-10 rounded-xl border border-line p-5 text-sm text-fg-muted">
              <p className="label-mono mb-3 text-fg-subtle">Contato direto</p>
              {directContacts}
            </div>
          )}
        </div>

        <div className="animate-rise lg:col-span-7" style={{ animationDelay: "120ms" }}>
          <div className="rounded-[24px] border border-line-strong bg-ink-850/80 p-5 shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
            <ContactForm defaultInterest={defaultInterest} fallbackContact={directContacts} />
          </div>
        </div>
      </Container>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </section>
  );
}
