import Link from "next/link";

import { getPublicProducts } from "@/content/products";
import { services } from "@/content/services";
import { site, whatsappHref } from "@/content/site";

import { Container } from "../ui/Container";
import { Logo } from "./Logo";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  if (links.length === 0) return null;
  return (
    <div>
      <h2 className="label-mono text-fg-subtle">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-fg-muted transition-colors hover:text-fg">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const wa = whatsappHref();
  const contactLinks = [
    { label: "Solicitar uma conversa", href: "/contato" },
    ...(site.contact.email ? [{ label: site.contact.email, href: `mailto:${site.contact.email}`, external: true }] : []),
    ...(site.contact.phone ? [{ label: site.contact.phone, href: `tel:${site.contact.phone.replace(/[^\d+]/g, "")}`, external: true }] : []),
    ...(wa ? [{ label: "WhatsApp", href: wa, external: true }] : []),
  ];
  const socialLinks = [
    site.social.linkedin && { label: "LinkedIn", href: site.social.linkedin, external: true },
    site.social.github && { label: "GitHub", href: site.social.github, external: true },
    site.social.instagram && { label: "Instagram", href: site.social.instagram, external: true },
  ].filter(Boolean) as { label: string; href: string; external: boolean }[];

  return (
    <footer data-site-footer className="relative mt-24 border-t border-line bg-ink-950">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent" />
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-muted">{site.description}</p>
          {site.contact.city && <p className="mt-4 text-sm text-fg-subtle">{site.contact.city}</p>}
        </div>
        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:col-span-8">
          <FooterColumn
            title="Produtos"
            links={[
              { label: "Visão geral", href: "/produtos" },
              ...getPublicProducts().map((p) => ({ label: p.name, href: `/produtos/${p.slug}` })),
            ]}
          />
          <FooterColumn
            title="Serviços"
            links={[{ label: "Visão geral", href: "/servicos" }, ...services.map((s) => ({ label: s.shortTitle, href: `/servicos/${s.slug}` }))]}
          />
          <FooterColumn
            title="Empresa"
            links={[
              { label: "Soluções para telecom", href: "/telecom" },
              { label: "Sobre", href: "/sobre" },
              { label: "Privacidade", href: "/privacidade" },
            ]}
          />
          <div className="space-y-10">
            <FooterColumn title="Contato" links={contactLinks} />
            <FooterColumn title="Redes" links={socialLinks} />
          </div>
        </nav>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-line py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.legal.legalName ?? site.name}
          {site.legal.cnpj && <> · CNPJ {site.legal.cnpj}</>}
        </p>
        <p className="label-mono !text-[0.65rem]">{site.slogan}</p>
      </Container>
    </footer>
  );
}
