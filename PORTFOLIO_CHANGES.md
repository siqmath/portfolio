# Portfolio — Plano de Implementação

> **Repositório:** `siqmath/portfolio` · **Branch:** `main`
> **Commit de referência:** `96ea96f` (08 mai 2026)

---

## Contexto

O portfolio `matheus.ie` é construído em **Next.js 15 (App Router) + TypeScript + Tailwind CSS**, com internacionalização via `next-intl` (PT/EN), animações via **GSAP** e deploy em VPS Hetzner via Docker.

Este documento descreve as mudanças planejadas em duas frentes:

1. **IntentSelector** — sistema interativo de contexto com URL compartilhável e CTA no WhatsApp
2. **Nova Habitar** — adição da experiência atual ao Curriculum Vitae

---

## Parte 1 — IntentSelector (Seção 2)

### O que é

Um seletor interativo de chips que substitui o bloco de texto estático na segunda seção (`Philosophy.tsx`). O visitante escolhe três variáveis em sequência e o site gera um link de WhatsApp com pré-texto personalizado — e ao mesmo tempo destaca visualmente as partes do CV e do radial que são relevantes para aquele contexto.

### Por que faz sentido

Você envia o portfólio de formas diferentes dependendo de quem está recebendo. Um recrutador para PM não precisa ver o mesmo CTA de um sócio potencial de Business Dev. O seletor resolve isso sem criar páginas separadas: **o URL carrega o estado**, então basta mandar o link já configurado.

### Como funciona — o fluxo completo

```
Visitante clica em chips
        ↓
URL atualiza sem reload
?intent=hire&role=pm&context=project
        ↓
┌─────────────────────────────────────────┐
│  RadialOrbitalTimeline                  │
│  → node "pm" fica em destaque/ativo     │
├─────────────────────────────────────────┤
│  Timeline (CV)                          │
│  → Nova Habitar + Avolta ficam laranja  │
├─────────────────────────────────────────┤
│  CTA                                    │
│  → Botão laranja abre WhatsApp com      │
│     mensagem pré-preenchida             │
└─────────────────────────────────────────┘
```

O estado é **100% client-side via URL search params** — sem backend, sem banco, sem cookies. Funciona com SSR e o link é completamente compartilhável.

### As três perguntas do seletor

| Linha | Opções |
|---|---|
| **Eu quero** | `Conhecer mais` · `Contratar` |
| **um** | `Product Manager` · `Project Manager` · `Business Developer` |
| **para** | `Um projeto específico` · `Como recrutador(a)` |

### Mapeamento: role → node do Radial

| Chip selecionado | Node ativado no Radial | Comportamento |
|---|---|---|
| Product Manager | `pm` (id: 1) | Rotaciona o orbitário para centralizar o node, abre card com conteúdo |
| Project Manager | `pm` (id: 1) | Idem — mesma habilidade, enquadramento diferente no CV |
| Business Developer | `founder` (id: 6) | Ativa o node central (Founder), pulsa os relacionados |

### Mapeamento: role → destaques no CV

Quando uma role é selecionada, itens específicos do CV ficam em **laranja (`#E8724A`)** e os demais ficam em `opacity-40`:

| Role | Itens destacados | Justificativa |
|---|---|---|
| Product Manager | Nova Habitar + Avolta | PM ativo hoje (NH) + PO em multinacional (Avolta) |
| Project Manager | Avolta + PROINFRA | Gestão de projeto em empresa global + projeto de automação |
| Business Developer | Nova Habitar + KQ Personalizados | Negociação de ativos (NH) + fundação/exit de negócio (KQ) |

### Pré-textos do WhatsApp

Cada combinação de `intent × role × context` gera uma mensagem diferente. O número é `+353 83 069 3753`.

| Combinação | Mensagem enviada |
|---|---|
| `hire · pm · project` | "…quero conversar sobre contratar você como Product Manager para um projeto específico." |
| `hire · pm · recruiter` | "Sou recrutador(a) e quero conversar sobre uma oportunidade de Product Manager." |
| `hire · projectmanager · project` | "…tenho interesse em você como Project Manager para um projeto." |
| `hire · projectmanager · recruiter` | "Sou recrutador(a) e quero conversar sobre uma vaga de Project Manager." |
| `hire · bizdev · project` | "…quero conversar sobre uma oportunidade de Business Development." |
| `hire · bizdev · recruiter` | "Sou recrutador(a) e quero falar sobre uma posição de Business Developer." |
| `explore · qualquer role · qualquer contexto` | Variações de "quero conhecer mais sobre seu trabalho / perfil." |

### URLs geradas (exemplos prontos para usar)

```
# Para mandar para um hiring manager de PM:
matheus.ie?intent=hire&role=pm&context=recruiter

# Para mandar para um potencial cliente de projeto:
matheus.ie?intent=hire&role=pm&context=project

# Para mandar para alguém interessado em BizDev:
matheus.ie?intent=hire&role=bizdev&context=project

# Link neutro (exploração geral):
matheus.ie?intent=explore&role=pm&context=project
```

### Comportamento visual do CTA

- **Seleção incompleta** (menos de 3 chips): botão desativado em estilo ghost, texto "Selecione as opções acima"
- **Seleção completa**: botão laranja com ícone de WhatsApp, texto contextual, abre `wa.me` com pré-texto em nova aba
- **Nota rodapé**: "→ O link que você enviar já virá pré-configurado"

---

## Parte 2 — Nova Habitar no Curriculum Vitae

### O que é adicionado

Uma nova entrada no topo do CV (item mais recente), representando o papel atual de **Product Manager na Nova Habitar**, conforme documentado no `Minha_Historia.md`.

### Dados da experiência

| Campo | Valor |
|---|---|
| **Role** | Product Manager |
| **Empresa** | Nova Habitar |
| **Localização** | Waterford, Irlanda |
| **Período** | 2026 – Presente |
| **Descrição PT** | Liderança da estratégia de produto para valorização de ativos imobiliários. Gestão de contratos entre proprietários de terrenos, construtores e investidores. Estruturação de ofertas baseada em dados de mercado e valor real de activos. |
| **Descrição EN** | Leading product strategy to increase real estate asset value. Managing contracts between landowners, builders, and investors. Structuring data-driven offers based on real market value and asset lifecycle intelligence. |

### Nova ordem do CV após a mudança

| Índice | Período | Empresa | Role |
|---|---|---|---|
| 0 *(novo)* | 2026 – Presente | Nova Habitar | Product Manager |
| 1 | Jan 2025 – Jan 2026 | Avolta Group | Back-Office & Product Owner |
| 2 | 2016 – 2026 | KQ Personalizados | Fundador & Exit |
| 3 | 2023 | PROINFRA / UFJF | Estágio em Engenharia (RPA) |
| 4 | 2016 – 2023 | UFJF | Engenharia Civil (Graduação) |
| 5 | 2015 – 2016 | Bromberg | Estágio em Qualidade Industrial |
| 6 | 2013 – 2015 | CEFET-RJ | Automação Industrial (Técnico) |

---

## Parte 3 — Arquivos modificados

### Arquivo 1 — `src/components/home/IntentSelector.tsx` *(novo)*

Componente client-side criado do zero. Responsabilidades:

- Ler e escrever `useSearchParams()` via `useRouter().replace()` sem reload de página
- Renderizar os três grupos de chips com estado ativo/inativo
- Calcular a URL do WhatsApp baseada na combinação selecionada
- Exportar `ROLE_TO_NODE` e `ROLE_TO_HIGHLIGHTED` para uso pelos componentes irmãos
- Envolver o componente interno em `<Suspense>` (obrigatório para `useSearchParams` no App Router do Next.js)

### Arquivo 2 — `src/components/home/Philosophy.tsx` *(modificado)*

Mudanças:

- **Remove** o bloco de texto estático "Full-Stack Product Manager / Bridging the gap..."
- **Importa** `IntentSelector` e o renderiza na coluna direita do grid
- **Importa** `RadialOrbitalTimeline` com a nova prop `externalActiveKey`
- **Lê** o search param `role` do URL e deriva o `NodeKey` correspondente via `ROLE_TO_NODE`
- Mantém todas as animações GSAP existentes (ScrollTrigger, scale, opacity, x)
- Envolve o componente interno em `<Suspense>` com fallback de loading spinner

### Arquivo 3 — `src/components/ui/radial-orbital-timeline.tsx` *(modificado)*

Mudanças mínimas e cirúrgicas:

- Adiciona `externalActiveKey?: NodeKey | null` à interface de props
- Adiciona um `useEffect` que observa `externalActiveKey` e, quando muda:
  - Abre o card do node correspondente (`setExpandedItems`)
  - Para a rotação automática (`setAutoRotate(false)`)
  - Ativa o pulso nos nodes relacionados (`setPulseEffect`)
  - Rotaciona o orbitário para centralizar o node (`setRotationAngle`)
  - Se `externalActiveKey` for `null`, volta ao estado inicial com rotação automática

Toda a lógica de interação existente (clique nos nodes, hover, fechar card) continua funcionando normalmente e tem prioridade sobre o estado externo.

### Arquivo 4 — `src/components/home/Timeline.tsx` *(modificado)*

Mudanças:

- Adiciona `item0` (Nova Habitar) como primeiro item do array `timelineItems`
- Atualiza o array `TIMELINE_YEARS` com "2026 – Presente" na posição 0
- Importa `ROLE_TO_HIGHLIGHTED` do `IntentSelector`
- Lê `role` do URL via `useSearchParams()`
- Aplica lógica de destaque condicional em cada item:
  - **Item destacado**: cor `#E8724A` no ano, título, badge da empresa e linha decorativa
  - **Itens não destacados** (quando há uma role ativa): `opacity-40`
  - **Nenhuma role ativa**: todos os itens em estado padrão (sem destaque)
- O dot central da timeline (linha vertical) também muda para laranja quando o item está destacado
- Envolve o componente interno em `<Suspense>` com fallback de seção vazia

### Arquivo 5 — `messages/pt.json` *(modificado)*

Adiciona ao objeto `Timeline_Dossier`:

```json
"item0_role": "Product Manager",
"item0_company": "Nova Habitar · Waterford, Irlanda",
"item0_desc": "Liderança da estratégia de produto para valorização de ativos imobiliários..."
```

### Arquivo 6 — `messages/en.json` *(modificado)*

Adiciona ao objeto `Timeline_Dossier`:

```json
"item0_role": "Product Manager",
"item0_company": "Nova Habitar · Waterford, Ireland",
"item0_desc": "Leading product strategy to increase real estate asset value..."
```

---

## Parte 4 — O que **não** muda

| Componente | Status |
|---|---|
| `Hero.tsx` | Sem alterações |
| `Navbar.tsx` | Sem alterações |
| `Mechanics.tsx` | Sem alterações |
| Sistema de rotas i18n (`/pt`, `/en`) | Sem alterações |
| Animações GSAP existentes | Preservadas integralmente |
| Docker / deploy / VPS config | Sem alterações |
| Blog | Sem alterações |
| Lógica de clique manual nos nodes do Radial | Preservada — tem prioridade sobre o estado externo |

---

## Parte 5 — Deploy

### Pré-requisito

Ter o repositório `siqmath/portfolio` clonado localmente com acesso de push ao branch `main`.

### Execução

```bash
# 1. Extrair os arquivos gerados na raiz do repositório
tar -xzf portfolio_deploy.tar.gz --strip-components=1

# 2. Executar o script de deploy
chmod +x deploy.sh && ./deploy.sh
```

O script `deploy.sh` realiza na sequência:

1. `git checkout main && git pull origin main`
2. Cria `IntentSelector.tsx` via heredoc
3. Sobrescreve `Philosophy.tsx` via heredoc
4. Sobrescreve `Timeline.tsx` via heredoc
5. Faz patch cirúrgico em `radial-orbital-timeline.tsx` via Python inline (adiciona interface + useEffect)
6. Atualiza `messages/pt.json` e `messages/en.json` via Python inline
7. `git add` nos 6 arquivos
8. `git commit` com mensagem estruturada
9. `git push origin main`

### Verificação após deploy

Abrir no browser e testar as URLs:

```
matheus.ie?intent=hire&role=pm&context=project
matheus.ie?intent=hire&role=projectmanager&context=recruiter
matheus.ie?intent=hire&role=bizdev&context=project
matheus.ie?intent=explore&role=pm&context=project
```

Checklist de validação:

- [ ] Chips respondem ao clique e atualizam o URL sem reload
- [ ] Node correto do radial fica ativo ao selecionar uma role
- [ ] Itens do CV ficam laranja conforme a role selecionada
- [ ] Itens não destacados ficam em `opacity-40`
- [ ] Botão de CTA aparece somente com os 3 chips selecionados
- [ ] Clicar no CTA abre WhatsApp com o pré-texto correto
- [ ] URL pré-configurada carrega o estado corretamente ao ser aberta
- [ ] Nova Habitar aparece no topo do CV como primeiro item
- [ ] Versão EN (`/en`) funciona corretamente com os mesmos parâmetros
- [ ] Clicar manualmente em um node do radial ainda funciona normalmente

---

*Documento gerado em 08 mai 2026 · SkyClaw para Matheus Fernandes*
