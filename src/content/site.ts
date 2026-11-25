/**
 * Dados institucionais da KI COMPANY.
 *
 * Tudo o que não foi confirmado (e-mail, telefone, endereço, redes)
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
  slogan: "Inovação. Conexão. Crescimento.",
  description:
    "Desenvolvemos produtos digitais, integramos sistemas e criamos soluções tecnológicas para conectar negócios, pessoas e operações.",
  contact: {
    email: env("NEXT_PUBLIC_CONTACT_EMAIL"),
    phone: env("NEXT_PUBLIC_CONTACT_PHONE"),
    // Número confirmado pela empresa em 25/11/2026. A variável só serve para sobrescrever.
    whatsapp: env("NEXT_PUBLIC_CONTACT_WHATSAPP") ?? "+55 21 96864-2276",
    city: env("NEXT_PUBLIC_COMPANY_CITY"),
  },
  legal: {
    // Confirmados pela empresa em 22/11/2026. As variáveis só servem para sobrescrever.
    legalName: env("NEXT_PUBLIC_COMPANY_LEGAL_NAME") ?? "KI COMPANY INOVA SIMPLES (I.S.)",
    cnpj: env("NEXT_PUBLIC_COMPANY_CNPJ") ?? "69.196.472/0001-68",
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

export function whatsappHref(message?: string): string | undefined {
  const digits = site.contact.whatsapp?.replace(/\D/g, "");
  if (!digits) return undefined;
  return message ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : `https://wa.me/${digits}`;
}
