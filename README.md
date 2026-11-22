# KI COMPANY — site institucional

Site institucional da KI COMPANY: produtos próprios, serviços de software,
integração e automação e soluções para telecom.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · Lucide · React Hook Form + Zod · fontes Geist (locais).

## Executar

Requer Node.js 20+.

```bash
npm install
cp .env.example .env.local   # preencha o que tiver
npm run dev                  # http://localhost:3000
```

Verificações:

```bash
npm run lint
npm run typecheck
npm run build && npm start
```

## Publicar (Vercel)

1. Importe o repositório na Vercel (framework detectado automaticamente).
2. Em *Settings → Environment Variables*, configure no mínimo
   `NEXT_PUBLIC_SITE_URL` e um canal de entrega do formulário (abaixo).
3. Aponte o domínio. O `sitemap.xml`, o `robots.txt` e as imagens Open Graph
   usam `NEXT_PUBLIC_SITE_URL`.

Funciona em qualquer hospedagem Node (`npm run build && npm start`).

## Formulário de contato

`POST /api/contato` valida os dados com o mesmo schema Zod do formulário
(`src/lib/contact-schema.ts`), confere a origem, aplica limite de tentativas e
um campo honeypot, e entrega por:

| Canal   | Variáveis |
| ------- | --------- |
| E-mail (Resend) | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` |
| Webhook | `CONTACT_WEBHOOK_URL`, opcional `CONTACT_WEBHOOK_SECRET` (HMAC-SHA256 em `X-Signature-SHA256`) |

Os canais configurados rodam em paralelo; o envio só é confirmado ao visitante
quando pelo menos um deles aceita a mensagem. **Sem canal configurado, a API
responde 503 e o formulário mostra erro** — nunca simula sucesso.

Payload do webhook:

```json
{ "type": "contact.created",
  "data": { "name": "", "company": "", "email": "", "phone": "", "interest": "integracao-noc",
            "interestLabel": "Integração com NOC", "message": "", "consent": true,
            "receivedAt": "2026-01-01T00:00:00.000Z", "source": "https://.../contato" } }
```

O limite de tentativas é em memória, por instância. Em produção, complemente
com o firewall da hospedagem.

## Estrutura

```
src/
├── app/                      # rotas (App Router)
│   ├── page.tsx              # Home
│   ├── produtos/             # listagem + [slug]
│   ├── servicos/             # listagem + [slug]
│   ├── telecom/ sobre/ contato/ privacidade/
│   ├── api/contato/          # entrega do formulário
│   ├── api/og/               # imagem Open Graph por página
│   └── sitemap.ts robots.ts not-found.tsx template.tsx
├── components/
│   ├── layout/               # Header, MobileNav, Footer, Logo
│   ├── ui/                   # Button, Container, SectionHeader, SpotlightCard, Reveal, Icon
│   ├── sections/             # PageHero, CtaBand, FeatureGrid, ProcessTimeline, home/
│   ├── visuals/              # NetworkTopology (hero), TelecomDiagram, ParallaxLayer
│   ├── products/ services/ contact/
├── content/                  # TODO o conteúdo do site, tipado
│   ├── types.ts              # contratos (prontos para CMS/i18n)
│   ├── site.ts               # dados institucionais (via env)
│   ├── products.ts services.ts telecom.ts company.ts cases.ts navigation.ts
└── lib/                      # SEO, schema e entrega do contato, rate limit
```

## Como estender

- **Novo produto:** adicione um objeto em `src/content/products.ts`. Página,
  menu, rodapé, listagem e sitemap são gerados a partir dele. Use
  `visibility: "hidden"` para construir sem publicar.
- **Novo serviço:** adicione em `src/content/services.ts`. Ganha página, card,
  item de menu e opção no formulário.
- **Cases:** adicione em `src/content/cases.ts` somente com autorização formal
  do cliente. Hoje a lista está vazia de propósito.
- **CMS:** os arquivos de `src/content` seguem os tipos de `types.ts`. Troque as
  funções de leitura (`getProduct`, `getService`...) por chamadas ao CMS.
- **Inglês:** mova as rotas para `src/app/[locale]/`, crie
  `src/content/en/` com os mesmos tipos e passe o locale às funções de
  conteúdo. Ajuste `lang`, `alternates.languages` e o sitemap.

## Regras editoriais

Nenhum dado foi inventado: sem clientes, depoimentos, métricas, ano de
fundação, equipe ou certificações. Cada produto registra a origem das
informações em `sources`.

- **Limpaki:** informações do portfólio CastroX (`src/projects.json`) e do
  briefing. Imagens em `public/products/limpaki/`.
- **Avvia:** informações do repositório `gateway-tech`
  (`knowledge_plataforma_pagamentos.md`, `README.md`, `brand/README.md`). A
  página está **oculta** (`visibility: "hidden"`, 404 em produção) até
  confirmação de titularidade e aprovação da marca. Para pré-visualizar:
  `PREVIEW_HIDDEN_PRODUCTS=true npm run dev` e abra `/produtos/avvia`.
- **Logotipo:** tipográfico e provisório (`components/layout/Logo.tsx`,
  `app/icon.svg`). Substitua quando houver arquivo oficial.
- **Política de privacidade:** texto base; revise com o jurídico antes de
  publicar.

## Acessibilidade, desempenho e movimento

- HTML semântico, link "pular para o conteúdo", navegação por teclado (menus,
  diagrama e formulário), foco visível, `aria-*` nos estados do formulário.
- `prefers-reduced-motion`: animações contínuas param (topologia do hero,
  fluxos do diagrama, gradientes) e entradas viram fade.
- A animação do hero usa um único `requestAnimationFrame`, sem re-render, e
  pausa fora da tela ou com a aba oculta.
- Páginas estáticas (SSG), imagens via `next/image` (AVIF/WebP), fontes locais,
  diagrama interativo carregado em chunk separado, cabeçalhos de segurança em
  `next.config.ts`.
