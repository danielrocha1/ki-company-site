import type { Feature } from "./types";

/** Conteúdo institucional compartilhado entre Home e Sobre. */

export const pillars: Feature[] = [
  {
    icon: "boxes",
    title: "Produtos próprios",
    text: "Criamos e operamos produtos digitais. Isso nos obriga a pensar como dono: arquitetura que se sustenta, experiência que se usa e código que se mantém.",
  },
  {
    icon: "network",
    title: "Integração e automação",
    text: "Conectamos sistemas que não foram feitos para conversar e automatizamos o trabalho que hoje depende de pessoas copiando dados.",
  },
  {
    icon: "radio",
    title: "Especialização em telecom",
    text: "Entendemos a rotina de provedores e operadoras: NOC, viabilidade técnica, inventário e a pressão de manter a rede de pé.",
  },
];

export const differentiators: Feature[] = [
  {
    icon: "compass",
    title: "Arquitetura antes do código",
    text: "Cada projeto começa pelo desenho: fluxos, integrações, dados e pontos de falha. Escrever código é a parte mais barata de corrigir no papel.",
  },
  {
    icon: "file-code",
    title: "Contratos de API documentados",
    text: "Integrações com contrato explícito, versionamento e tratamento de erro. Quem vier depois entende o que foi feito.",
  },
  {
    icon: "activity",
    title: "Observabilidade desde o início",
    text: "Logs estruturados, métricas e alertas fazem parte da entrega, não de uma fase futura.",
  },
  {
    icon: "shield",
    title: "Segurança por padrão",
    text: "Autenticação, autorização e proteção de dados tratadas no desenho do sistema, não como ajuste final.",
  },
  {
    icon: "gauge",
    title: "Escalabilidade planejada",
    text: "Arquitetura dimensionada para o uso real de hoje, com caminho claro para crescer.",
  },
  {
    icon: "rocket",
    title: "Entregas incrementais",
    text: "Valor em produção desde as primeiras etapas, com validação contínua junto à sua equipe.",
  },
];

export type ProcessStep = { id: string; title: string; text: string; outputs: string[] };

export const processSteps: ProcessStep[] = [
  {
    id: "01",
    title: "Descoberta",
    text: "Entendemos a operação, os sistemas existentes, as integrações disponíveis e o problema que precisa ser resolvido.",
    outputs: ["Mapa de sistemas", "Objetivos e restrições"],
  },
  {
    id: "02",
    title: "Arquitetura",
    text: "Desenhamos a solução: fluxos de dados, integrações, contratos de API, segurança e pontos de monitoramento.",
    outputs: ["Desenho técnico", "Escopo por etapas"],
  },
  {
    id: "03",
    title: "Desenvolvimento",
    text: "Construímos em ciclos curtos, com entregas que podem ser vistas e validadas pela sua equipe.",
    outputs: ["Incrementos funcionais", "Código versionado"],
  },
  {
    id: "04",
    title: "Integração e testes",
    text: "Conectamos aos sistemas reais e validamos o comportamento com dados e cenários da operação.",
    outputs: ["Testes de integração", "Homologação"],
  },
  {
    id: "05",
    title: "Implantação",
    text: "Publicamos com monitoramento ativo, documentação e plano de reversão.",
    outputs: ["Go-live monitorado", "Documentação"],
  },
  {
    id: "06",
    title: "Evolução",
    text: "Acompanhamos o uso, corrigimos o que for preciso e evoluímos a solução conforme a operação cresce.",
    outputs: ["Melhorias contínuas", "Novas integrações"],
  },
];

export const about = {
  whoWeAre:
    "A KI COMPANY é uma empresa de tecnologia que desenvolve produtos digitais próprios e cria soluções de software, integração e automação para empresas. Trabalhamos onde a operação é complexa: muitos sistemas, muitos dados e pouco espaço para erro.",
  vision:
    "Ser referência em engenharia de software para operações complexas, com produtos próprios e soluções que conectam negócios, pessoas e sistemas, no Brasil e fora dele.",
  mission:
    "Transformar operações fragmentadas em sistemas conectados, confiáveis e fáceis de evoluir, por meio de produtos digitais e soluções sob medida.",
  culture: [
    {
      icon: "search",
      title: "Entender antes de construir",
      text: "Perguntamos muito no começo para errar pouco depois. Software certo para o problema errado é desperdício.",
    },
    {
      icon: "file-code",
      title: "Código é para ser lido",
      text: "Escrevemos pensando em quem vai manter: nomes claros, testes, documentação e decisões registradas.",
    },
    {
      icon: "target",
      title: "Honestidade técnica",
      text: "Dizemos o que é possível, o que depende de terceiros e o que ainda não sabemos. Sem promessas que a tecnologia não sustenta.",
    },
    {
      icon: "activity",
      title: "Responsabilidade pela produção",
      text: "Nosso trabalho termina quando o sistema funciona bem em produção, não quando o código compila.",
    },
  ] satisfies Feature[],
  productDevelopment:
    "Desenvolver produtos próprios mantém nossa engenharia afiada. Cada produto passa por descoberta, arquitetura, lançamento e operação. O que aprendemos operando nossos produtos volta para os projetos dos nossos clientes.",
  corporate:
    "No mercado corporativo, atuamos como parceiro técnico de empresas que precisam integrar sistemas, automatizar processos e construir software sob medida, com atenção especial a provedores de internet, operadoras e operações de infraestrutura.",
  commitment:
    "Tecnologia é meio, não fim. Escolhemos ferramentas pela adequação ao problema, documentamos nossas decisões e mantemos a solução preparada para evoluir.",
};

/**
 * Provedores que usam produtos da KI COMPANY.
 * Nomes autorizados pela empresa em 22/11/2026. Inclua aqui só com autorização.
 */
export const clients: string[] = ["GigaUp", "SUVNET", "Fibramar"];
