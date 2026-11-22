/**
 * Tipos de conteúdo. Os arquivos em `src/content` seguem estes contratos para
 * que um CMS (ou uma versão em inglês) possa substituí-los sem mexer no layout.
 */

export type IconName =
  | "network"
  | "radar"
  | "code"
  | "workflow"
  | "activity"
  | "server"
  | "shield"
  | "layers"
  | "cable"
  | "gauge"
  | "map"
  | "webhook"
  | "boxes"
  | "cpu"
  | "smartphone"
  | "users"
  | "calendar"
  | "star"
  | "message"
  | "bell"
  | "ticket"
  | "dashboard"
  | "repeat"
  | "database"
  | "cloud"
  | "chart"
  | "branch"
  | "plug"
  | "wallet"
  | "receipt"
  | "split"
  | "lock"
  | "search"
  | "compass"
  | "target"
  | "wrench"
  | "rocket"
  | "filter"
  | "zap"
  | "globe"
  | "file-code"
  | "radio";

export type Feature = { icon?: IconName; title: string; text: string };

export type Cta = { label: string; href: string; external?: boolean };

export type ProductStatus = "live" | "in-development";

/**
 * `public`: aparece no menu, na listagem e no sitemap.
 * `hidden`: página construída, mas fora do site público até ser liberada.
 */
export type Visibility = "public" | "hidden";

export type Product = {
  slug: string;
  name: string;
  category: string;
  status: ProductStatus;
  statusLabel: string;
  visibility: Visibility;
  tagline: string;
  summary: string;
  /** Cores de acento do produto, aplicadas dentro da identidade da KI. */
  accent: { primary: string; secondary: string };
  logo?: { src: string; width: number; height: number; alt: string };
  media?: {
    desktop?: { src: string; width: number; height: number; alt: string };
    mobile?: { src: string; width: number; height: number; alt: string };
  };
  problem: { title: string; text: string };
  howItWorks: { title: string; text: string }[];
  audiences: { title: string; items: string[] }[];
  differentiators: Feature[];
  /** Situação atual do produto, sem promessas. */
  currentState?: { available: string[]; next: string[]; note?: string };
  primaryCta: Cta;
  secondaryCta?: Cta;
  seo: { title: string; description: string };
  /** Origem das informações publicadas (não exibido). */
  sources: string[];
};

export type Service = {
  slug: string;
  icon: IconName;
  title: string;
  shortTitle: string;
  navDescription: string;
  eyebrow: string;
  headline: string;
  summary: string;
  problem: { title: string; text: string };
  complexity: string[];
  capabilities: Feature[];
  benefits: string[];
  scopeNote: string;
  cta: Cta;
  audience: string[];
  seo: { title: string; description: string };
};

export type CaseStudy = {
  slug: string;
  client: string;
  /** Somente com autorização formal do cliente. */
  authorized: true;
  sector: string;
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  services: string[];
};
