# CVSTEC — Bio & Portfolio Hub para Redes Sociais

Bio profissional mobile-first e hub de links para o perfil @CVSTEC, projetado para carregamento ultra-rápido em conexões 4G, com animações táteis fluidas, feixe de luz dinâmico nos cartões sociais, partículas interativas e galeria de portfólio em modais.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Decisões confirmadas com o usuário nas etapas de alinhamento:**
> - **Apresentação do Portfólio**: Galeria interativa com cards visuais e modais detalhados de projetos e serviços da CVSTEC.
> - **Ação de Contato**: Botão direto e proeminente para WhatsApp (`wa.me/5581994564800`) com mensagem personalizada para atendimento rápido.
> - **Paleta e Tema Padrão**: Tema escuro de alto contraste (#111111 no fundo, #333333 nas superfícies e bordas, #E30613 vermelho vibrante da marca, #FFFFFF no texto principal), acompanhado de alternador fluido de tema claro/escuro.
> - **Internacionalização**: Seletor de idioma (Português BR 🇧🇷 e Inglês 🇺🇸) no cabeçalho com ícone de bandeira.

---

## 1. Overview & Core Concept

- **O que faz**: Página de destino (Link-in-Bio / Portfolio Hub) para Instagram e YouTube da CVSTEC, centralizando canais de contato, serviços tecnológicos e trabalhos realizados em uma interface de alta performance.
- **Público-alvo**: Visitantes do Instagram (@cvstec), inscritos do canal no YouTube, potenciais clientes de desenvolvimento de software, automação e consultoria em inovação digital.
- **Proposta de Valor**: Carregamento em menos de 2 segundos em conexões móveis, fidelidade visual à marca com a paleta oficial (#111111, #333333, #E30613, #FFFFFF), logotipo sem fundo em destaque superior e microinterações de impacto (feixe de luz correndo na borda dos cards e canvas de partículas reativo ao toque/cursor).

---

## 2. User Experience & Visual Design

### Fluxos Principais
1. **Entrada e Apresentação da Marca**:
   - Cabeçalho limpo com alternador de idioma (🇧🇷 / 🇺🇸) e botão de alternância de tema (Claro / Noturno).
   - Logomarca da CVSTEC centralizada em alta definição, com tipografia editorial e bio destacando "Especialista em tecnologia e inovação digital".
2. **Redes Sociais & Canais com Efeito Light-Beam**:
   - **Instagram**: @CVSTEC — com ícone oficial, seguidor de contagem/chamada e link direto.
   - **YouTube**: Canal oficial CVSTEC — com ícone oficial e chamada para assistir conteúdos e cases.
   - **WhatsApp**: Botão de contato rápido com suporte a mensagem pronta de orçamento/consultoria.
   - Cada card possui um feixe de luz que percorre suavemente a borda no hover (desktop) ou toque (mobile).
3. **Galeria de Portfólio e Serviços**:
   - Filtros de categoria rápidos (Todos, Desenvolvimento Web/Mobile, Automação & IA, Infraestrutura/Cloud).
   - Cards com imagens ricas e metadados claros sem poluição visual.
   - Clique no projeto abre modal completo com escopo, tecnologias utilizadas, métricas de resultado e link/demonstração.
4. **Canvas de Partículas Flutuantes**:
   - Efeito de fundo leve em HTML5 Canvas, simulando partículas e constelações digitais que são atraídas/repelidas pelo cursor ou dedo do usuário, desativado suavemente se `prefers-reduced-motion` estiver ativo.

### Identidade Visual & Cores
- **Canvas Base**: `#111111` (Preto profundo no modo escuro) / `#F8F9FA` (no modo claro).
- **Superfícies & Cartões**: `#1C1C1C` e `#333333` com bordas sutis de 1px.
- **Acento Primário**: `#E30613` (Vermelho oficial da CVSTEC para botões de conversão, anéis de foco e luz de destaque).
- **Tipografia**: *Plus Jakarta Sans* / *Inter* para clareza máxima e algarismos tabulares para métricas.

---

## 3. Key Product Decisions & Trade-Offs

- **Canvas de Partículas Customizado em Vanilla JS**:
  - *Decisão*: Implementação direta em `<canvas>` com cálculo vetorial leve em `requestAnimationFrame`, pausando quando fora da visão.
  - *Por que*: Consome menos de 10KB, não depende de bibliotecas pesadas como tsParticles (que adicionam centenas de kilobytes), garantindo carregamento < 2 segundos em conexões 4G.
- **Efeito de Borda de Luz "Light-Beam" em CSS Puro**:
  - *Decisão*: Uso de pseudo-elementos `@property` ou gradiente cônico rotativo com máscara CSS de alta performance (`transform` e `opacity` acelerados por GPU).
  - *Por que*: 60fps constantes sem travar o processamento do dispositivo móvel.
- **Modo Noturno / Claro com Persistência em LocalStorage**:
  - *Decisão*: Padrão escuro conforme aprovado, mas permitindo chaveamento instantâneo via botão discreto no header.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   Top Control Bar                      │
│   [ Idioma: 🇧🇷 PT / 🇺🇸 EN ]    [ Alternador Tema 🌙/☀️ ]│
├────────────────────────────────────────────────────────┤
│                 Centered Brand Header                  │
│               [ CVSTEC Logo & Slogan ]                 │
├────────────────────────────────────────────────────────┤
│               Social & Action Hub Cards                │
│    ┌──────────────────────────────────────────────┐    │
│    │  Instagram (@cvstec) - Light-Beam Border    │    │
│    ├──────────────────────────────────────────────┤    │
│    │  YouTube (Canal Oficial) - Light-Beam Border │    │
│    ├──────────────────────────────────────────────┤    │
│    │  WhatsApp (wa.me/5581994564800) Direct      │    │
│    └──────────────────────────────────────────────┘    │
├────────────────────────────────────────────────────────┤
│             Interactive Portfolio Showcase             │
│   [Filtros de Categoria: Apps, Automação, Inovação]    │
│   ┌───────────────────┐     ┌───────────────────┐      │
│   │ Project Card 1    │     │ Project Card 2    │      │
│   └───────────────────┘     └───────────────────┘      │
├────────────────────────────────────────────────────────┤
│       Project Detail Modal & Fast Action Sheet         │
└────────────────────────────────────────────────────────┘
          ▲ Background: Lightweight Particle Canvas
```

### Componentes e Estados
- `useLanguage`: Estado reativo alternando entre dicionários `pt` e `en`.
- `useTheme`: Alternador `dark` / `light` com classe Tailwind no elemento raiz.
- `ParticleCanvas`: Componente performático sem re-renders desnecessários.
- `SocialLinkCard`: Componente com o efeito visual da luz correndo, ícone SVG autêntico de cada rede e target `_blank` com `rel="noopener noreferrer"`.
- `PortfolioModal`: Modal acessível com foco gerenciado, tecla ESC e clique fora para fechar.
