/**
 * Dados institucionais da KI COMPANY.
 *
 * Tudo o que não foi confirmado (e-mail, telefone, CNPJ, endereço, redes)
 * vem de variáveis de ambiente públicas. Campo vazio = campo não exibido.
 * Nunca preencha estes valores com dados de exemplo.
 */

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export const site = {
  name: "KI COMPANY",
  shortName: "KI",
  locale: "pt-BR",
  url: (env("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000").replace(/\/$/, ""),
  tagline: "Tecnologia que conecta. Engenharia que transforma.",
  description:
    "Desenvolvemos produtos digitais, integramos sistemas e criamos soluções tecnológicas para conectar negócios, pessoas e operações.",
  contact: {
    email: env("NEXT_PUBLIC_CONTACT_EMAIL"),
    phone: env("NEXT_PUBLIC_CONTACT_PHONE"),
    whatsapp: env("NEXT_PUBLIC_CONTACT_WHATSAPP"),
    city: env("NEXT_PUBLIC_COMPANY_CITY"),
  },
  legal: {
    legalName: env("NEXT_PUBLIC_COMPANY_LEGAL_NAME"),
    cnpj: env("NEXT_PUBLIC_COMPANY_CNPJ"),
  },
  social: {
    linkedin: env("NEXT_PUBLIC_SOCIAL_LINKEDIN"),
    github: env("NEXT_PUBLIC_SOCIAL_GITHUB"),
    instagram: env("NEXT_PUBLIC_SOCIAL_INSTAGRAM"),
  },
} as const;

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsappHref(): string | undefined {
  const digits = site.contact.whatsapp?.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : undefined;
}
