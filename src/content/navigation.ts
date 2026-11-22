import { products } from "./products";
import { services } from "./services";

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href: string; children?: NavLink[] };

export function getMainNav(): NavGroup[] {
  return [
    {
      label: "Produtos",
      href: "/produtos",
      children: products
        .filter((p) => p.visibility === "public")
        .map((p) => ({ label: p.name, href: `/produtos/${p.slug}`, description: p.category })),
    },
    {
      label: "Serviços",
      href: "/servicos",
      children: services.map((s) => ({ label: s.shortTitle, href: `/servicos/${s.slug}`, description: s.navDescription })),
    },
    { label: "Telecom", href: "/telecom" },
    { label: "Sobre", href: "/sobre" },
  ];
}
