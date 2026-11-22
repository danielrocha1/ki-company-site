import type { Product } from "./types";

/**
 * Ecossistema de produtos.
 * Para adicionar um produto: inclua um objeto neste array. A listagem, o menu,
 * o sitemap e a página `/produtos/[slug]` são gerados a partir daqui.
 *
 * Regra editorial: só publique o que estiver confirmado em documentação do
 * produto. Registre a origem em `sources`.
 */
export const products: Product[] = [
  {
    slug: "limpaki",
    name: "Limpaki",
    category: "Plataforma de serviços de limpeza",
    status: "live",
    statusLabel: "No ar",
    visibility: "public",
    tagline: "Quem precisa de limpeza encontra quem faz, com confiança dos dois lados.",
    summary:
      "Plataforma digital que conecta clientes a profissionais de limpeza, simplificando a contratação de serviços e a gestão de solicitações. Site institucional e aplicativo mobile publicados.",
    accent: { primary: "#14b8a6", secondary: "#0e9488" },
    media: {
      desktop: {
        src: "/products/limpaki/limpaki.webp",
        width: 1440,
        height: 900,
        alt: "Página inicial do site da Limpaki",
      },
      mobile: {
        src: "/products/limpaki/limpaki-mobile.webp",
        width: 390,
        height: 844,
        alt: "Limpaki em tela de celular",
      },
    },
    problem: {
      title: "Contratar limpeza ainda depende de indicação e mensagem solta.",
      text: "Sem um fluxo estruturado, cliente e profissional combinam preço por mensagem, não sabem com quem estão lidando e não têm a quem recorrer quando algo sai do combinado.",
    },
    howItWorks: [
      {
        title: "Escolha da profissional",
        text: "O cliente consulta perfis de profissionais com avaliações e identidade verificada antes do primeiro serviço.",
      },
      {
        title: "Agendamento e pagamento no app",
        text: "Data, serviço e pagamento são definidos dentro do aplicativo, sem negociar valor por mensagem.",
      },
      {
        title: "Avaliação nos dois sentidos",
        text: "Depois do serviço, o cliente avalia a profissional e a profissional avalia o cliente.",
      },
      {
        title: "Suporte quando precisa",
        text: "Se algo sai do combinado, o suporte acontece pelo próprio aplicativo.",
      },
    ],
    audiences: [
      {
        title: "Para clientes",
        items: [
          "Profissionais com identidade verificada e avaliações visíveis",
          "Preço combinado antes do serviço",
          "Agendamento e pagamento em um só lugar",
          "Canal de suporte dentro do app",
        ],
      },
      {
        title: "Para profissionais",
        items: [
          "Solicitações organizadas no aplicativo",
          "Pagamento combinado dentro da plataforma",
          "Avaliação dos clientes depois de cada serviço",
          "Reputação construída a cada atendimento",
        ],
      },
    ],
    differentiators: [
      {
        icon: "shield",
        title: "Confiança verificada",
        text: "Verificação de identidade antes do primeiro serviço, do lado de quem contrata e de quem presta.",
      },
      {
        icon: "star",
        title: "Reputação dos dois lados",
        text: "Avaliação mútua para que clientes e profissionais escolham com quem trabalhar.",
      },
      {
        icon: "calendar",
        title: "Fluxo completo no app",
        text: "Agendamento, pagamento e suporte sem sair da plataforma.",
      },
    ],
    primaryCta: { label: "Conhecer a Limpaki", href: "https://limpaki.com.br/", external: true },
    secondaryCta: { label: "Falar sobre o produto", href: "/contato?interesse=produtos" },
    seo: {
      title: "Limpaki — plataforma que conecta clientes a profissionais de limpeza",
      description:
        "Limpaki conecta clientes a profissionais de limpeza verificadas, com agendamento, pagamento e avaliação dentro do aplicativo.",
    },
    sources: ["castrox-dev/portifolio: src/projects.json (limpaki)", "Briefing do site institucional"],
  },
  {
    slug: "avvia",
    name: "Avvia",
    category: "Plataforma de cobranças e pagamentos",
    status: "in-development",
    statusLabel: "Em desenvolvimento",
    // Oculta até confirmação de titularidade e aprovação da marca (ver README).
    visibility: "hidden",
    tagline: "Cobranças, pagamentos e repasses organizados em uma só plataforma.",
    summary:
      "Plataforma para empresas e vendedores criarem cobranças, acompanharem pagamentos e receberem os valores das vendas. O software é a camada de gestão e integração; o processamento e a liquidação acontecem em um provedor de pagamentos parceiro e autorizado.",
    accent: { primary: "#00e6c3", secondary: "#8b5cf6" },
    logo: { src: "/products/avvia/avvia-logo-dark.svg", width: 1378, height: 330, alt: "AVVIA" },
    problem: {
      title: "Vender é simples. Organizar cobranças, comissões e repasses não é.",
      text: "Empresas que vendem por meio de vários vendedores precisam separar o valor de cada um e a comissão da plataforma, acompanhar o status de cada pagamento e manter um registro confiável de tudo isso.",
    },
    howItWorks: [
      {
        title: "O vendedor cria a cobrança",
        text: "Pelo painel, o vendedor gera e acompanha suas cobranças.",
      },
      {
        title: "O pagamento acontece no parceiro",
        text: "O cliente paga pelo meio habilitado. Processamento e liquidação ficam com o provedor de pagamentos contratado; a plataforma não custodia dinheiro.",
      },
      {
        title: "Split entre vendedor e plataforma",
        text: "O objetivo é separar automaticamente o valor do vendedor e a comissão da plataforma, usando o split nativo do provedor.",
      },
      {
        title: "Acompanhamento e auditoria",
        text: "Vendedor e administração acompanham cobranças, status e repasses, com trilha de auditoria das ações administrativas.",
      },
    ],
    audiences: [
      {
        title: "Para vendedores",
        items: [
          "Painel com dados cadastrais e resumo de atividades",
          "Criação e consulta de cobranças (em desenvolvimento)",
          "Histórico de status dos pagamentos (em desenvolvimento)",
        ],
      },
      {
        title: "Para a operação",
        items: [
          "Painel administrativo com gestão de vendedores",
          "Consulta de usuários",
          "Trilha de auditoria das ações administrativas",
        ],
      },
    ],
    differentiators: [
      {
        icon: "split",
        title: "Split pelo parceiro",
        text: "A separação de valores é desenhada para usar o recurso nativo do provedor de pagamentos, com liquidação feita por ele.",
      },
      {
        icon: "lock",
        title: "Segurança desde a fundação",
        text: "Senhas com Argon2id, sessão em cookie HttpOnly, proteção CSRF e perfis de acesso validados no servidor.",
      },
      {
        icon: "file-code",
        title: "Contrato de API documentado",
        text: "Backend em Go com PostgreSQL e API descrita em OpenAPI desde o início.",
      },
    ],
    currentState: {
      available: [
        "Cadastro, login e recuperação de acesso",
        "Painel do vendedor e painel administrativo",
        "Gestão de vendedores e trilha de auditoria",
      ],
      next: [
        "Integração com o provedor de pagamentos",
        "Cobranças com PIX e boleto (meios em validação)",
        "Split, repasses e relatórios",
      ],
      note: "Nenhum provedor de pagamentos está integrado ainda. Meios de pagamento, split e modelo de repasse dependem do parceiro escolhido.",
    },
    primaryCta: { label: "Quero acompanhar a Avvia", href: "/contato?interesse=produtos" },
    seo: {
      title: "Avvia — plataforma de cobranças e pagamentos",
      description:
        "Avvia é uma plataforma em desenvolvimento para empresas e vendedores criarem cobranças, acompanharem pagamentos e organizarem repasses com um provedor parceiro.",
    },
    sources: [
      "castrox-dev/gateway-tech: knowledge_plataforma_pagamentos.md",
      "castrox-dev/gateway-tech: README.md (estado atual)",
      "castrox-dev/gateway-tech: brand/README.md (direção criativa, não aprovada)",
    ],
  },
];

/** Mostra produtos ocultos apenas quando explicitamente habilitado (pré-visualização). */
export function canShowHidden(): boolean {
  return process.env.PREVIEW_HIDDEN_PRODUCTS === "true";
}

export function getPublicProducts(): Product[] {
  return products.filter((p) => p.visibility === "public");
}

export function getProduct(slug: string): Product | undefined {
  const product = products.find((p) => p.slug === slug);
  if (!product) return undefined;
  if (product.visibility === "hidden" && !canShowHidden()) return undefined;
  return product;
}
