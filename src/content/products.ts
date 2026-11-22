import type { Product, ProductSegment } from "./types";

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
    segment: "empresas",
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
    segment: "empresas",
    category: "Plataforma de cobranças e pagamentos",
    status: "in-development",
    statusLabel: "Em desenvolvimento",
    // Produto da KI COMPANY, confirmado pela empresa em 22/11/2026.
    visibility: "public",
    tagline: "Cobranças, pagamentos e repasses organizados em uma só plataforma.",
    summary:
      "Plataforma para empresas e vendedores criarem cobranças, acompanharem pagamentos e receberem os valores das vendas. O software é a camada de gestão e integração; o processamento e a liquidação acontecem em um provedor de pagamentos parceiro e autorizado.",
    accent: { primary: "#00e6c3", secondary: "#8b5cf6" },
    media: {
      desktop: { src: "/products/avvia/avvia.webp", width: 800, height: 500, alt: "Página inicial da AVVIA Payments" },
    },
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
  {
    slug: "mapfiber",
    name: "MapFiber",
    segment: "telecom",
    category: "App de campo para redes de fibra",
    status: "live",
    statusLabel: "No ar",
    visibility: "public",
    tagline: "O mapa da rede, a viabilidade e as portas das CTOs no celular do técnico.",
    summary:
      "App de campo para provedores de fibra: mapa da rede, viabilidade por endereço ou GPS, portas das CTOs e montagem da rede direto no celular, inclusive sem sinal. O painel do administrador fica para mapas, usuários e configurações.",
    accent: { primary: "#16B8D4", secondary: "#087EAA" },
    media: {
      desktop: { src: "/products/mapfiber/mapfiber.webp", width: 800, height: 500, alt: "Página inicial do MapFiber" },
    },
    logo: { src: "/products/mapfiber/mapfiber-logo.svg", width: 246, height: 64, alt: "MapFiber" },
    url: "mapfiber.vercel.app",
    problem: {
      title: "A rede está em planilha, KMZ e na cabeça de quem montou.",
      text: "Responder se um endereço tem viabilidade, achar a CTO com porta livre ou descobrir quem ficou sem sinal num rompimento depende de procurar em vários arquivos e de ligar para alguém do escritório.",
    },
    howItWorks: [
      { title: "Viabilidade na hora", text: "Toque no mapa, busque o endereço ou use o GPS. O app mostra a distância pela rua, a CTO que atende e as portas livres, ignorando CTOs lotadas." },
      { title: "Portas e potência", text: "Grade de portas de cada CTO (livre, ocupada, reservada, com defeito), com cliente, potência em dBm e histórico de quem mudou o quê." },
      { title: "Montar a rede em campo", text: "Criar CTOs, caixas de emenda e splitters, lançar cabos ponto a ponto com metragem, cor da fibra (ABNT) e VLAN." },
      { title: "Rastrear e achar rompimento", text: "Do cliente até a OLT, com diagrama de emenda. Num rompimento, o app mostra na hora as caixas, portas e clientes afetados." },
    ],
    audiences: [
      {
        title: "Para o técnico de rua",
        items: [
          "Mapa em tela cheia, com ruas, satélite e GPS",
          "Uso sem sinal, com sincronização quando a internet volta",
          "Fotos das CTOs marcadas como antes e depois",
          "Rota até a CTO pelo Google Maps",
        ],
      },
      {
        title: "Para o escritório",
        items: [
          "Relatório de ocupação e CTOs quase cheias",
          "Metragem de cabos da rede",
          "Alertas de potência fora da faixa",
          "Vínculo das CTOs com os clientes do IXC",
        ],
      },
    ],
    differentiators: [
      { icon: "wifi-off", title: "Funciona sem sinal", text: "Mapas, portas, potência e fotos ficam no aparelho. Conflitos de edição aparecem para o técnico decidir." },
      { icon: "map", title: "Feito para o celular", text: "Interface em tela cheia pensada para o uso na rua, com tema claro e escuro." },
      { icon: "plug", title: "Integrado ao IXC", text: "Clientes e sinal da ONU vindos do IXC aparecem junto da porta da CTO." },
    ],
    primaryCta: { label: "Falar sobre o MapFiber", href: "/contato?interesse=produtos" },
    seo: {
      title: "MapFiber — app de campo para redes de fibra (FTTH)",
      description:
        "MapFiber leva mapa da rede, viabilidade, portas das CTOs, emendas e rompimentos para o celular do técnico de fibra, com uso offline e integração ao IXC.",
    },
    sources: ["castrox-dev/Verificador-De-Viabilidade: README.md"],
  },
  {
    slug: "cx-tecnico",
    name: "CX Técnico",
    segment: "telecom",
    category: "App do técnico de campo integrado ao IXC",
    status: "live",
    statusLabel: "No ar",
    visibility: "public",
    tagline: "Agenda do dia, ONU autorizada e OS finalizada sem ligar para o escritório.",
    summary:
      "App do técnico de campo integrado ao IXC Provedor: agenda e roteiro das ordens de serviço, leitura da etiqueta da ONU pela câmera, autorização na OLT Huawei ou ZTE e finalização da OS com fotos.",
    accent: { primary: "#1792D6", secondary: "#F97316" },
    appIcon: { src: "/products/cx-tecnico/icone.svg", alt: "Ícone do CX Técnico" },
    url: "autorizaronu.vercel.app",
    problem: {
      title: "Cada instalação para no telefone do NOC.",
      text: "O técnico chega no cliente, instala a ONU e precisa ligar para alguém autorizar na OLT, anotar VLAN e PPPoE e depois fechar a OS. Cada ligação é tempo parado na casa do cliente.",
    },
    howItWorks: [
      { title: "Agenda do técnico", text: "O técnico vê as próprias OS agendadas no IXC e confere contrato e login PPPoE do cliente." },
      { title: "Leitura da ONU", text: "A câmera lê a etiqueta e o app reconhece sozinho qual código é o serial, ignorando o MAC." },
      { title: "Autorização na OLT", text: "O app encontra a ONU pendente, cria o cadastro de fibra ligado ao contrato e autoriza. Mostra VLAN, PPPoE e potência RX." },
      { title: "Finalizar a OS", text: "O técnico descreve o que foi feito, anexa fotos e a OS é fechada no IXC em nome dele." },
    ],
    audiences: [
      {
        title: "Para o técnico",
        items: [
          "Só as próprias ordens de serviço",
          "Dados da ONU com botão de copiar",
          "Desautorizar e excluir ONU já cadastrada",
          "Fotos da instalação anexadas à OS",
        ],
      },
      {
        title: "Para a gestão",
        items: [
          "Administradores veem a agenda de todos os técnicos",
          "Cadastro de usuários sem novo deploy",
          "Senhas guardadas só como hash",
          "Modo demonstração para treinamento",
        ],
      },
    ],
    differentiators: [
      { icon: "scan", title: "Câmera no lugar da digitação", text: "Lê o código de barras da etiqueta e identifica o serial nas formas usadas por Huawei e ZTE." },
      { icon: "cable", title: "Huawei e ZTE", text: "Autorização em OLTs dos dois fabricantes, com o perfil de ONU configurável." },
      { icon: "smartphone", title: "Pronto para o celular", text: "Aplicativo web instalável, preparado para publicação na Google Play." },
    ],
    primaryCta: { label: "Falar sobre o CX Técnico", href: "/contato?interesse=produtos" },
    seo: {
      title: "CX Técnico — app do técnico de campo integrado ao IXC",
      description:
        "CX Técnico organiza a agenda do técnico, lê a etiqueta da ONU pela câmera, autoriza em OLTs Huawei e ZTE pelo IXC e finaliza a OS com fotos.",
    },
    sources: ["castrox-dev/autorizaronu: README.md, app/layout.tsx"],
  },
  {
    slug: "cadastroki",
    name: "Cadastroki",
    segment: "telecom",
    category: "Migração de bases de clientes para o IXC",
    status: "live",
    statusLabel: "No ar",
    visibility: "public",
    tagline: "A base do provedor comprado dentro do seu IXC, sem digitar cliente por cliente.",
    summary:
      "Sistema de importação de bases de clientes para o IXC Provedor. Lê o dump do IXC ou do MK-Auth, planilhas CSV e Excel, e cria clientes, contratos e logins sem duplicar quem já existe.",
    accent: { primary: "#2F7BFF", secondary: "#8B5CF6" },
    glyph: "file-up",
    problem: {
      title: "Comprar um provedor é rápido. Subir a base dele no seu sistema, não.",
      text: "Cadastrar milhares de clientes à mão leva semanas, erra plano, cidade e vencimento e ainda corre o risco de duplicar quem a equipe já tinha cadastrado.",
    },
    howItWorks: [
      { title: "Planilha ou dump", text: "Arquivo .sql do IXC ou do MK-Auth (com clientes, contratos, logins e boletos), .csv ou .xlsx." },
      { title: "Colunas e de-para", text: "Cidade, plano e vencimento são ligados aos IDs do seu IXC uma vez só, e o de-para fica salvo para as próximas bases." },
      { title: "Revisão", text: "Simular, enviar um cliente de teste e só então enviar os que estão prontos." },
      { title: "Envio sem duplicar", text: "O sistema confere o CPF no IXC antes de criar. Quem já existe fica intacto, e no fim sai o relatório completo." },
    ],
    audiences: [
      {
        title: "Para quem compra provedores",
        items: [
          "Base nova no IXC em dias, não semanas",
          "Clientes já cadastrados não são duplicados",
          "Relatório com o que entrou e o que deu erro",
        ],
      },
      {
        title: "Para a equipe técnica",
        items: [
          "Botão para tentar de novo só os erros",
          "Resumo dos erros mais comuns",
          "Contrato, login PPPoE e cobrança configurados por lote",
        ],
      },
    ],
    differentiators: [
      { icon: "database", title: "Lê IXC e MK-Auth", text: "Reconhece o dump dos dois sistemas direto no navegador, sem limite de tamanho." },
      { icon: "repeat", title: "De-para reaproveitado", text: "O mapeamento de cidades, planos e vencimentos vale para as próximas migrações." },
      { icon: "shield", title: "Não duplica", text: "Confere CPF, contrato e login antes de gravar, e se recupera quando o IXC responde com erro." },
    ],
    primaryCta: { label: "Migrar uma base para o IXC", href: "/contato?interesse=produtos" },
    seo: {
      title: "Cadastroki — migração de bases de clientes para o IXC",
      description:
        "Cadastroki importa bases de clientes para o IXC Provedor a partir de dumps do IXC e do MK-Auth ou de planilhas, com de-para reaproveitável e sem duplicar clientes.",
    },
    sources: ["castrox-dev/CADASTRO: docs/CONTEXTO_PROJETO.md", "Vercel: projeto cadastro em cadastroki.vercel.app"],
  },
  {
    slug: "isp-noc",
    name: "ISP NOC",
    segment: "telecom",
    category: "Monitoramento de rede para provedores",
    status: "in-development",
    statusLabel: "Em validação",
    visibility: "public",
    tagline: "Monitoramento próprio da rede do provedor, sem montar Zabbix e Grafana.",
    summary:
      "Plataforma de monitoramento de infraestrutura para provedores. Um agente instalado na rede mede os equipamentos e envia os resultados para a nuvem, que calcula estados e incidentes, guarda o histórico e mostra tudo num painel.",
    accent: { primary: "#2F7BFF", secondary: "#00E6C3" },
    glyph: "activity",
    problem: {
      title: "Montar e manter um NOC custa mais do que parece.",
      text: "Juntar ferramentas de monitoramento, painéis e alertas exige tempo de especialista. Sem isso, o provedor descobre a queda quando o cliente liga.",
    },
    howItWorks: [
      { title: "Agente na rede", text: "Roda numa máquina Linux do provedor e só abre conexões de saída. Nenhuma porta precisa ser aberta." },
      { title: "Coleta", text: "ICMP (latência, perda, jitter), SNMP (CPU, memória, interfaces e tráfego) e API do MikroTik." },
      { title: "Incidentes e alertas", text: "A nuvem calcula estados e incidentes, com regras contra alarme falso e janelas de manutenção." },
      { title: "Painel em tempo real", text: "Central de operações com histórico de 24 horas, 7 e 30 dias." },
    ],
    audiences: [
      {
        title: "Para o NOC",
        items: [
          "Equipamentos offline e instáveis em destaque",
          "Alertas de CPU, memória, temperatura e interface",
          "Histórico por equipamento e por interface",
        ],
      },
      {
        title: "Para a gestão",
        items: [
          "Perfis de administrador, operador e leitura",
          "Dados de cada provedor isolados no banco",
          "Fila local para não perder medições se a internet cair",
        ],
      },
    ],
    differentiators: [
      { icon: "lock", title: "Seguro por desenho", text: "Canal mTLS entre agente e nuvem, credenciais cifradas e nunca gravadas em disco no agente." },
      { icon: "radar", title: "Coletores próprios", text: "Não depende de Zabbix, The Dude ou Grafana." },
      { icon: "server", title: "Resiliente", text: "Com a nuvem fora do ar, o agente guarda as medições e envia depois." },
    ],
    currentState: {
      available: ["ICMP, SNMP e API do MikroTik testados de ponta a ponta em laboratório", "Painel, incidentes e alertas de recursos"],
      next: ["Piloto em rede de provedor", "Suporte a OLTs Huawei, ZTE e V-SOL"],
      note: "Ainda em validação: nenhum equipamento de provedor foi homologado.",
    },
    primaryCta: { label: "Quero participar do piloto", href: "/contato?interesse=produtos" },
    seo: {
      title: "ISP NOC — monitoramento de rede para provedores de internet",
      description:
        "ISP NOC monitora a rede do provedor com agente local e painel na nuvem: ICMP, SNMP, MikroTik, incidentes e alertas. Em validação.",
    },
    sources: ["castrox-dev/isp-noc: README.md", "castrox-dev/isp-noc-agent: README.md"],
  },
  {
    slug: "estoki",
    name: "Estoki",
    segment: "empresas",
    category: "Gestão de estoque pelo celular",
    status: "live",
    statusLabel: "No ar",
    visibility: "public",
    tagline: "Estoque, inventário e etiquetas com a câmera do celular.",
    summary:
      "Sistema de gestão de estoque feito para o celular: leitura de códigos de barras e QR Code pela câmera, movimentações, inventário, etiquetas e entrada de mercadoria pela nota fiscal eletrônica.",
    accent: { primary: "#14B8A6", secondary: "#0F766E" },
    appIcon: { src: "/products/estoki/icone.svg", alt: "Ícone do Estoki" },
    url: "estoki-xi.vercel.app",
    problem: {
      title: "O estoque do sistema nunca bate com o da prateleira.",
      text: "Contagem em papel, entrada digitada item por item e etiqueta feita à mão. Quando o número não bate, ninguém sabe onde o erro começou.",
    },
    howItWorks: [
      { title: "Leitura pela câmera", text: "Código de barras ou QR Code lido direto pelo celular para encontrar, cadastrar ou movimentar um produto." },
      { title: "Entrada pela nota", text: "A nota fiscal eletrônica (XML) alimenta a entrada de mercadoria sem digitar item por item." },
      { title: "Inventário", text: "Contagem guiada com relatório do inventário." },
      { title: "Etiquetas", text: "Geração de etiquetas com QR Code para os produtos." },
    ],
    audiences: [
      {
        title: "Para quem opera o estoque",
        items: ["Funciona no navegador do celular, sem instalar loja de apps", "Movimentações registradas na hora", "Busca por código lido na câmera"],
      },
      {
        title: "Para a gestão",
        items: ["Várias empresas na mesma conta", "Usuários e permissões", "Relatórios e exportação"],
      },
    ],
    differentiators: [
      { icon: "scan", title: "Câmera como leitor", text: "Sem coletor dedicado: o celular lê códigos de barras e QR Codes." },
      { icon: "receipt", title: "Nota fiscal na entrada", text: "Importação do XML da NF-e para dar entrada na mercadoria." },
      { icon: "boxes", title: "Multiempresa", text: "Gestão de mais de uma empresa no mesmo sistema." },
    ],
    primaryCta: { label: "Falar sobre o Estoki", href: "/contato?interesse=produtos" },
    seo: {
      title: "Estoki — gestão de estoque pelo celular",
      description:
        "Estoki é a gestão de estoque mobile: leitura de códigos de barras e QR Code pela câmera, inventário, etiquetas, multiempresa e entrada pela NF-e.",
    },
    sources: ["castrox-dev/estoki: package.json, src/pages, server/main.go"],
  },
  {
    slug: "taktalk",
    name: "TakTalk",
    segment: "empresas",
    category: "Atendimento, WhatsApp e CRM",
    status: "in-development",
    statusLabel: "Em desenvolvimento",
    visibility: "public",
    tagline: "Atendimento pelo WhatsApp, CRM e automações num só painel para a equipe.",
    summary:
      "Plataforma SaaS de comunicação operacional: atendimento em tempo real, WhatsApp Business, CRM, automações e gestão comercial, com filas, perfis de acesso e planos por assinatura.",
    accent: { primary: "#8B5CF6", secondary: "#2F7BFF" },
    media: {
      desktop: { src: "/products/taktalk/taktalk.webp", width: 800, height: 500, alt: "Página inicial do TakTalk" },
    },
    glyph: "message",
    url: "taktalk.com.br",
    problem: {
      title: "O atendimento está espalhado em celulares da equipe.",
      text: "Cada atendente usa um WhatsApp, o histórico do cliente se perde e ninguém sabe quantas conversas estão paradas. Sem CRM, a venda depende da memória de quem atendeu.",
    },
    howItWorks: [
      { title: "Caixa de entrada única", text: "Conversas do WhatsApp Business chegam num painel compartilhado em tempo real." },
      { title: "Filas e equipes", text: "Distribuição por fila, perfis de acesso e acompanhamento do supervisor." },
      { title: "CRM", text: "Histórico do cliente e gestão comercial ligados às conversas." },
      { title: "Automações", text: "Fluxos automáticos para responder, encaminhar e organizar o atendimento." },
    ],
    audiences: [
      {
        title: "Para a equipe de atendimento",
        items: ["Um painel para todas as conversas", "Histórico do cliente à mão", "Distribuição por filas"],
      },
      {
        title: "Para a gestão",
        items: ["Perfis e permissões por função", "Visão do supervisor", "Planos por assinatura"],
      },
    ],
    differentiators: [
      { icon: "message", title: "WhatsApp Business", text: "Integração oficial com o WhatsApp Business no centro do atendimento." },
      { icon: "workflow", title: "Automação", text: "Motor de automação para tirar trabalho repetitivo da equipe." },
      { icon: "users", title: "Multiempresa", text: "Cada cliente da plataforma com seus dados, usuários e limites de plano." },
    ],
    currentState: {
      available: ["Atendimento em tempo real", "WhatsApp (mensagens de texto)", "CRM, automações e perfis de acesso"],
      next: ["Mídia no WhatsApp", "Assinatura e cobrança automáticas", "Aplicativo para Android e iOS"],
    },
    primaryCta: { label: "Quero conhecer o TakTalk", href: "/contato?interesse=produtos" },
    seo: {
      title: "TakTalk — atendimento pelo WhatsApp, CRM e automações",
      description:
        "TakTalk reúne atendimento em tempo real, WhatsApp Business, CRM e automações num painel para equipes. Em desenvolvimento.",
    },
    sources: ["castrox-dev/taktalk: README.md, docs/PROJECT_STATUS.md"],
  },
];

/** Mostra produtos ocultos apenas quando explicitamente habilitado (pré-visualização). */
export function canShowHidden(): boolean {
  return process.env.PREVIEW_HIDDEN_PRODUCTS === "true";
}

export function getPublicProducts(): Product[] {
  return products.filter((p) => p.visibility === "public");
}

export const segments: { id: ProductSegment; title: string; description: string }[] = [
  {
    id: "telecom",
    title: "Para provedores de internet",
    description: "Do técnico de rua ao assinante: produtos que conversam com o IXC e com a rede.",
  },
  {
    id: "empresas",
    title: "Para empresas",
    description: "Estoque, atendimento, pagamentos e serviços.",
  },
];

export function getProductsBySegment(segment: ProductSegment): Product[] {
  return getPublicProducts().filter((p) => p.segment === segment);
}

export function getProduct(slug: string): Product | undefined {
  const product = products.find((p) => p.slug === slug);
  if (!product) return undefined;
  if (product.visibility === "hidden" && !canShowHidden()) return undefined;
  return product;
}
