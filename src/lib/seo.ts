import type { Metadata } from "next";

import { absoluteUrl, site } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Rótulo curto exibido acima do título na imagem Open Graph. */
  eyebrow?: string;
  noindex?: boolean;
};

export function ogImageUrl(title: string, eyebrow?: string): string {
  const params = new URLSearchParams({ title });
  if (eyebrow) params.set("eyebrow", eyebrow);
  return `/api/og?${params.toString()}`;
}

/** Metadados exclusivos por página, com canonical e Open Graph. */
export function buildMetadata({ title, description, path, eyebrow, noindex }: PageMeta): Metadata {
  const image = ogImageUrl(title, eyebrow);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: site.name,
      url: absoluteUrl(path),
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function organizationJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    description: site.description,
    ...(site.legal.legalName ? { legalName: site.legal.legalName } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
