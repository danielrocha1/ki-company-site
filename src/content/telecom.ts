import type { Feature, IconName } from "./types";

export type DiagramLayer = {
  id: string;
  label: string;
  title: string;
  description: string;
  items: { id: string; label: string; icon: IconName }[];
};

/**
 * Camadas do diagrama interativo da página Telecom.
 * Sistemas das operadoras → Integração → Automação → APIs → Destinos.
 */
export const diagramLayers: DiagramLayer[] = [
  {
    id: "origem",
    label: "L1 · Origem",
    title: "Sistemas das operadoras",
    description:
      "Onde os dados nascem: ferramentas de monitoramento, inventário de rede, bases geográficas e sistemas de operadoras parceiras. Cada um com seu formato, seu protocolo e sua forma de acesso.",
    items: [
      { id: "monitoramento", label: "Monitoramento", icon: "activity" },
      { id: "inventario", label: "Inventário de rede", icon: "database" },
      { id: "geo", label: "Bases geográficas", icon: "map" },
      { id: "parceiros", label: "Operadoras parceiras", icon: "radio" },
    ],
  },
  {
    id: "integracao",
    label: "L2 · Integração",
    title: "Camada de integração",
    description:
      "Conectores recebem os dados de cada origem, normalizam formatos e garantem entrega com fila, nova tentativa e registro do que foi processado.",
    items: [{ id: "conectores", label: "Conectores e normalização", icon: "plug" }],
  },
  {
    id: "automacao",
    label: "L3 · Automação",
    title: "Motor de automação",
    description:
      "Regras de negócio aplicadas aos dados já normalizados: correlação de eventos, análise de viabilidade, abertura de chamados e notificações.",
    items: [{ id: "motor", label: "Regras e orquestração", icon: "cpu" }],
  },
  {
    id: "apis",
    label: "L4 · Exposição",
    title: "APIs",
    description:
      "Os resultados ficam disponíveis por APIs documentadas e webhooks, com autenticação e controle de acesso para cada sistema consumidor.",
    items: [{ id: "api", label: "APIs e webhooks", icon: "webhook" }],
  },
  {
    id: "destinos",
    label: "L5 · Destino",
    title: "NOC, CRM e sistemas comerciais",
    description:
      "Cada área recebe a informação no sistema que já usa: o NOC vê eventos consolidados, o CRM recebe viabilidade e o comercial responde ao cliente sem depender de outra equipe.",
    items: [
      { id: "noc", label: "NOC", icon: "radar" },
      { id: "crm", label: "CRM", icon: "users" },
      { id: "comercial", label: "Sistemas comerciais", icon: "receipt" },
    ],
  },
];

export const telecomPains: Feature[] = [
  {
    icon: "layers",
    title: "Sistemas que não conversam",
    text: "Monitoramento, inventário, tickets e CRM evoluíram separados. Cada integração ponto a ponto vira mais uma dependência frágil.",
  },
  {
    icon: "repeat",
    title: "Trabalho manual recorrente",
    text: "Consultas de viabilidade, conferência de alarmes e atualização de chamados repetidas à mão, todos os dias.",
  },
  {
    icon: "bell",
    title: "Informação que chega tarde",
    text: "O comercial espera o técnico, o NOC espera o chamado, o cliente espera todo mundo.",
  },
];

export const telecomSolutions = [
  {
    serviceSlug: "integracao-noc",
    title: "Integração com NOC",
    text: "Eventos de monitoramento, tickets e dashboards conectados numa operação só.",
    icon: "radar" as IconName,
  },
  {
    serviceSlug: "viabilidade-tecnica",
    title: "Viabilidade técnica automatizada",
    text: "Consultas de cobertura respondidas por API, a partir de múltiplas fontes.",
    icon: "map" as IconName,
  },
  {
    serviceSlug: "integracao-de-sistemas",
    title: "Integração com sistemas comerciais",
    text: "CRM, ERP e atendimento recebendo dados técnicos sem redigitação.",
    icon: "workflow" as IconName,
  },
  {
    serviceSlug: "infraestrutura-e-observabilidade",
    title: "Observabilidade das integrações",
    text: "Logs, métricas e alertas para saber o que cada integração está fazendo.",
    icon: "activity" as IconName,
  },
];

export const telecomAudiences = [
  "Provedores de internet",
  "Operadoras",
  "Integradores de rede",
  "Empresas que operam infraestrutura de redes",
];
