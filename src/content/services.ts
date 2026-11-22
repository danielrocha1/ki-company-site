import type { Service } from "./types";

const scopeNote =
  "As funcionalidades descritas são possibilidades técnicas. O que entra em cada projeto é definido no levantamento, a partir dos sistemas, das integrações disponíveis e dos objetivos da sua operação.";

/**
 * Portfólio de serviços. Cada item gera uma página em `/servicos/[slug]`,
 * um card na Home e uma opção no formulário de contato.
 */
export const services: Service[] = [
  {
    slug: "integracao-noc",
    icon: "radar",
    title: "Integrações com NOC",
    shortTitle: "Integração com NOC",
    navDescription: "Monitoramento, eventos e tickets conectados",
    eyebrow: "Network Operations Center",
    headline: "Seu NOC enxergando a operação inteira, não uma tela por sistema.",
    summary:
      "Conectamos ferramentas de monitoramento, sistemas de tickets e bases operacionais para que o NOC trabalhe com informação consolidada e rotinas automatizadas.",
    problem: {
      title: "Cada ferramenta conta uma parte da história.",
      text: "Alarmes num sistema, chamados em outro, inventário numa planilha. A equipe do NOC gasta tempo cruzando informações manualmente enquanto o incidente acontece.",
    },
    complexity: [
      "Ferramentas de monitoramento de fornecedores diferentes, cada uma com seu formato de evento",
      "Sistemas de tickets que não recebem dados do monitoramento",
      "Notificações duplicadas, ruidosas ou que chegam à pessoa errada",
      "Rotinas de verificação feitas à mão, todos os dias",
    ],
    capabilities: [
      { icon: "network", title: "Integração entre sistemas de monitoramento", text: "Eventos de diferentes ferramentas recebidos e normalizados num formato comum." },
      { icon: "webhook", title: "Comunicação entre ferramentas via APIs", text: "Conectores e webhooks para que os sistemas troquem dados sem intervenção manual." },
      { icon: "layers", title: "Consolidação de informações operacionais", text: "Uma visão única que reúne alarmes, ativos e chamados relacionados." },
      { icon: "bell", title: "Automação de notificações e eventos", text: "Regras para notificar o responsável certo, no canal certo, com o contexto do evento." },
      { icon: "ticket", title: "Integração com sistemas de tickets", text: "Abertura, atualização e encerramento de chamados a partir de eventos de monitoramento." },
      { icon: "dashboard", title: "Dashboards operacionais", text: "Painéis com os indicadores que a operação realmente acompanha." },
      { icon: "repeat", title: "Automação de rotinas de monitoramento", text: "Verificações recorrentes executadas e registradas automaticamente." },
    ],
    benefits: [
      "Menos alternância entre ferramentas durante um incidente",
      "Menos tarefas repetitivas para a equipe do NOC",
      "Histórico consistente de eventos e chamados",
      "Base pronta para novas integrações",
    ],
    scopeNote,
    cta: { label: "Solicite uma integração", href: "/contato?interesse=integracao-noc" },
    audience: ["Provedores de internet", "Operadoras", "Integradores", "Operações de infraestrutura"],
    seo: {
      title: "Integração com NOC para telecom e infraestrutura",
      description:
        "Integração entre sistemas de monitoramento, tickets e dashboards operacionais para NOCs de provedores, operadoras e operações de infraestrutura.",
    },
  },
  {
    slug: "viabilidade-tecnica",
    icon: "map",
    title: "Viabilidade técnica para telecomunicações",
    shortTitle: "Viabilidade técnica",
    navDescription: "Consultas de cobertura automatizadas",
    eyebrow: "Automação de viabilidade",
    headline: "Consulta de viabilidade em segundos, não em idas e vindas entre sistemas.",
    summary:
      "Automatizamos consultas de disponibilidade e análise de viabilidade, integrando dados geográficos e sistemas de operadoras e provedores numa única resposta.",
    problem: {
      title: "Cada consulta de viabilidade vira uma pequena investigação.",
      text: "O comercial pergunta, o técnico consulta mapas, bases e sistemas de parceiros, e a resposta volta depois. Enquanto isso, o cliente espera.",
    },
    complexity: [
      "Informações de cobertura espalhadas entre bases próprias e de parceiros",
      "Dados geográficos em formatos diferentes",
      "Consultas repetidas manualmente para cada endereço",
      "Resultados que dependem de interpretação de quem consulta",
    ],
    capabilities: [
      { icon: "radio", title: "Consultas de disponibilidade de cobertura", text: "Verificação automática de atendimento por endereço ou coordenada." },
      { icon: "cable", title: "Integração entre operadoras e provedores", text: "Conexão com sistemas de parceiros para consultar a disponibilidade de cada rede." },
      { icon: "cpu", title: "Automação da análise de viabilidade", text: "Regras técnicas aplicadas de forma consistente a cada consulta." },
      { icon: "globe", title: "Integração de informações geográficas", text: "Endereços, coordenadas e bases geográficas tratados num mesmo fluxo." },
      { icon: "webhook", title: "APIs de consulta", text: "Viabilidade disponível para site, CRM ou sistema comercial via API." },
      { icon: "filter", title: "Consolidação de múltiplas fontes", text: "Resultados de várias bases reunidos numa resposta única." },
      { icon: "zap", title: "Menos trabalho operacional manual", text: "A equipe técnica deixa de responder consultas repetitivas." },
    ],
    benefits: [
      "Resposta mais rápida para o time comercial",
      "Critério técnico aplicado sempre da mesma forma",
      "Consulta disponível onde o cliente está: site, CRM ou atendimento",
      "Registro de cada consulta para análise posterior",
    ],
    scopeNote,
    cta: { label: "Automatize sua operação", href: "/contato?interesse=viabilidade-tecnica" },
    audience: ["Provedores de internet", "Operadoras", "Equipes comerciais de telecom"],
    seo: {
      title: "Automação de viabilidade técnica para telecom",
      description:
        "Automação de consultas de cobertura e viabilidade técnica para operadoras e provedores, com integração geográfica e APIs de consulta.",
    },
  },
  {
    slug: "integracao-de-sistemas",
    icon: "workflow",
    title: "Integração de sistemas e automação de processos",
    shortTitle: "Integração e automação",
    navDescription: "Plataformas, APIs e processos conectados",
    eyebrow: "Integração corporativa",
    headline: "Sistemas que conversam entre si e processos que andam sozinhos.",
    summary:
      "Integramos plataformas, APIs e sistemas corporativos e automatizamos processos operacionais que hoje dependem de digitação, planilhas e conferência manual.",
    problem: {
      title: "Os dados existem. Só não estão no lugar certo.",
      text: "Informação redigitada entre sistemas, planilhas como ponte entre áreas e processos que param quando alguém sai de férias.",
    },
    complexity: [
      "Sistemas de fornecedores diferentes, com APIs diferentes ou sem API",
      "Regras de negócio que só existem na cabeça das pessoas",
      "Erros de digitação e dados divergentes entre áreas",
      "Sistemas legados que ainda sustentam a operação",
    ],
    capabilities: [
      { icon: "plug", title: "Integração entre plataformas", text: "ERPs, CRMs, plataformas de atendimento e sistemas internos conectados." },
      { icon: "webhook", title: "APIs e webhooks", text: "Comunicação em tempo real entre aplicações, com contratos documentados." },
      { icon: "database", title: "Sincronização de dados", text: "Dados consistentes entre sistemas, com tratamento de falhas e reprocessamento." },
      { icon: "workflow", title: "Automação de processos operacionais", text: "Fluxos que executam tarefas recorrentes e registram cada etapa." },
      { icon: "boxes", title: "Conectores para sistemas legados", text: "Integração com sistemas antigos sem precisar substituí-los de uma vez." },
      { icon: "activity", title: "Monitoramento das integrações", text: "Visibilidade sobre o que foi processado, o que falhou e por quê." },
    ],
    benefits: [
      "Menos retrabalho e digitação",
      "Dados confiáveis entre áreas",
      "Processos que não dependem de uma pessoa específica",
      "Integrações rastreáveis e fáceis de manter",
    ],
    scopeNote,
    cta: { label: "Solicite uma integração", href: "/contato?interesse=integracao-de-sistemas" },
    audience: ["Empresas com múltiplos sistemas", "Operações com processos manuais", "Times de TI"],
    seo: {
      title: "Integração de sistemas, APIs e automação de processos",
      description:
        "Integração entre plataformas, APIs e sistemas corporativos e automação de processos operacionais com rastreabilidade.",
    },
  },
  {
    slug: "desenvolvimento-sob-demanda",
    icon: "code",
    title: "Desenvolvimento de software sob demanda",
    shortTitle: "Desenvolvimento sob demanda",
    navDescription: "Sistemas web, APIs, mobile e SaaS",
    eyebrow: "Engenharia de software",
    headline: "Software feito para o seu processo, com engenharia de produto.",
    summary:
      "Projetamos e desenvolvemos sistemas web, APIs, aplicativos e plataformas SaaS com a mesma engenharia que usamos nos nossos próprios produtos.",
    problem: {
      title: "Ferramentas prontas resolvem o comum. Seu diferencial raramente é comum.",
      text: "Quando o processo da empresa não cabe num software de prateleira, adaptações e planilhas paralelas viram a regra.",
    },
    complexity: [
      "Regras de negócio específicas do seu mercado",
      "Integração com sistemas que já existem",
      "Necessidade de crescer sem reescrever tudo",
      "Segurança e desempenho desde o primeiro usuário",
    ],
    capabilities: [
      { icon: "globe", title: "Sistemas web", text: "Aplicações responsivas para operação interna, clientes ou parceiros." },
      { icon: "webhook", title: "APIs REST", text: "APIs documentadas, versionadas e preparadas para integração." },
      { icon: "smartphone", title: "Aplicações mobile", text: "Aplicativos para clientes ou equipes de campo." },
      { icon: "cloud", title: "Plataformas SaaS", text: "Produtos multiusuário com autenticação, perfis de acesso e cobrança." },
      { icon: "server", title: "Backend de alta performance", text: "Serviços desenhados para volume, concorrência e baixa latência." },
      { icon: "plug", title: "Integração entre aplicações", text: "O novo sistema conectado ao que a empresa já usa." },
      { icon: "wrench", title: "Modernização de sistemas", text: "Evolução gradual de sistemas legados, sem parar a operação." },
      { icon: "workflow", title: "Automação de processos", text: "Fluxos de trabalho digitais no lugar de etapas manuais." },
    ],
    benefits: [
      "Software alinhado ao processo real da empresa",
      "Arquitetura preparada para evoluir",
      "Código organizado, documentado e testável",
      "Entregas incrementais, com valor desde as primeiras etapas",
    ],
    scopeNote,
    cta: { label: "Converse sobre seu projeto", href: "/contato?interesse=desenvolvimento-sob-demanda" },
    audience: ["Empresas com processos específicos", "Startups", "Times que precisam de capacidade de engenharia"],
    seo: {
      title: "Desenvolvimento de software sob demanda",
      description:
        "Desenvolvimento de sistemas web, APIs REST, aplicativos mobile, plataformas SaaS e backend de alta performance.",
    },
  },
  {
    slug: "infraestrutura-e-observabilidade",
    icon: "activity",
    title: "Infraestrutura, arquitetura e observabilidade",
    shortTitle: "Infraestrutura e observabilidade",
    navDescription: "Arquitetura, monitoramento e confiabilidade",
    eyebrow: "Confiabilidade operacional",
    headline: "Saber o que está acontecendo antes que o cliente perceba.",
    summary:
      "Desenhamos arquitetura backend e infraestrutura e implantamos monitoramento, logs e métricas para que seus sistemas sejam previsíveis e fáceis de operar.",
    problem: {
      title: "Sem visibilidade, todo problema é descoberto tarde.",
      text: "Quando logs estão espalhados e não há métricas, a equipe só descobre a falha pelo chamado do cliente e leva horas para encontrar a causa.",
    },
    complexity: [
      "Aplicações distribuídas entre servidores e serviços em nuvem",
      "Logs sem padrão e difíceis de correlacionar",
      "Crescimento de uso sem planejamento de capacidade",
      "Arquitetura que cresceu sem desenho",
    ],
    capabilities: [
      { icon: "activity", title: "Monitoramento de aplicações", text: "Saúde, disponibilidade e desempenho acompanhados continuamente." },
      { icon: "chart", title: "Logs e métricas", text: "Logs estruturados e métricas que permitem investigar e correlacionar eventos." },
      { icon: "dashboard", title: "Dashboards", text: "Painéis técnicos e operacionais com os indicadores que importam." },
      { icon: "cloud", title: "Integrações em nuvem", text: "Serviços gerenciados e provedores de nuvem integrados à aplicação." },
      { icon: "gauge", title: "Escalabilidade", text: "Arquitetura e infraestrutura dimensionadas para o crescimento de uso." },
      { icon: "server", title: "Arquitetura backend", text: "Serviços, filas, bancos de dados e APIs desenhados com critério." },
      { icon: "shield", title: "Confiabilidade operacional", text: "Alertas, rotinas de recuperação e práticas que reduzem incidentes." },
    ],
    benefits: [
      "Problemas detectados antes de virarem incidentes",
      "Investigação mais rápida quando algo falha",
      "Infraestrutura dimensionada para o uso real",
      "Decisões técnicas baseadas em dados",
    ],
    scopeNote,
    cta: { label: "Converse sobre seu projeto", href: "/contato?interesse=infraestrutura-e-observabilidade" },
    audience: ["Empresas com sistemas críticos", "Produtos digitais em crescimento", "Times de operação"],
    seo: {
      title: "Infraestrutura, arquitetura backend e observabilidade",
      description:
        "Arquitetura backend, monitoramento de aplicações, logs, métricas, dashboards e escalabilidade para sistemas críticos.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Opções do formulário de contato: serviços + produtos + outro. */
export const contactInterests = [
  ...services.map((s) => ({ value: s.slug, label: s.shortTitle })),
  { value: "telecom", label: "Soluções para telecom" },
  { value: "produtos", label: "Nossos produtos" },
  { value: "outro", label: "Outro assunto" },
] as const;
