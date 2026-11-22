import type { MetadataRoute } from "next";

import { getPublicProducts } from "@/content/products";
import { services } from "@/content/services";
import { absoluteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/servicos", priority: 0.9 },
    { path: "/telecom", priority: 0.9 },
    { path: "/produtos", priority: 0.8 },
    { path: "/sobre", priority: 0.6 },
    { path: "/contato", priority: 0.8 },
    { path: "/privacidade", priority: 0.2 },
  ];
  return [
    ...staticRoutes.map((r) => ({ url: absoluteUrl(r.path), lastModified: now, priority: r.priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/servicos/${s.slug}`), lastModified: now, priority: 0.8 })),
    ...getPublicProducts().map((p) => ({ url: absoluteUrl(`/produtos/${p.slug}`), lastModified: now, priority: 0.7 })),
  ];
}
