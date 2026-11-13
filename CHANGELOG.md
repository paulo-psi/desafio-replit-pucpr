# Changelog — Replit (Kit Oficial do Inscrito PUCPR)

Todas as mudanças relevantes deste projeto são documentadas neste arquivo.

## [1.1.0] - 2026-11-13
### Alterado & Polimento Estético (Apple Studio Daylight)
- Redesign completo da hierarquia visual, espaçamentos e ritmo vertical seguindo a diretriz autêntica da Apple: seções com `padding: clamp(96px, 10vw, 140px) 24px` e remoção da sensação de "caixas empilhadas".
- Tipografia monumental no Hero (`font-size: clamp(2.6rem, 5vw, 4.4rem)`, `letter-spacing: -0.04em`, `line-height: 1.05`), pedestal para o cartaz oficial do evento com iluminação suave e banner refinado do Grupo Marista.
- Eliminação de 100% dos 26 anti-padrões reportados por `impeccable detect` (remoção de `border-left: 3px` em cards, `border-top: 4px` em cartões arredondados, kickers soltos e ajuste de hierarquia semântica de headings).
- Contraste WCAG AA/AAA aprimorado: texto principal em `#1D1D1F`, texto secundário em `#3A3A3C` (10.2:1) e legendas em `#59595E` (5.2:1).
- Cartões com backgrounds suaves (`#FFFFFF` sobre `#F5F5F7`), sombras hiper-realistas difusas e eliminação de bordas rígidas artificiais.

## [1.0.1] - 2026-11-12
### Melhorado
- Sincronização integral de `./src/index.html` com `./index.html` (0 anti-padrões no `npx impeccable detect` em ambos).
- Polimento da `Navbar Daylight Glass` em Desktop (`1440px`) exibindo todas as 8 âncoras sem truncamento, `scroll-margin-top: 84px` nas seções e alvos de toque `>= 44px` no mobile.
- Imunidade a overflow horizontal validada até `320x568` (`tests/test_portal_replit.py`), restauração automática de foco ao fechar os modais `<dialog>` e navegação por setas no Fluxograma Didático.

## [1.0.0] - 2026-11-12
### Adicionado
- Portal completo **Kit Oficial do Inscrito — Desafio Replit + PUCPR** em `./index.html` (espelhado em `./src/index.html`), `./assets/css/styles.css` e `./assets/js/app.js`, pronto para GitHub Pages (`./.nojekyll`).
- Paleta **100% Apple Studio Daylight** (`#F6F7FA` / `#E9EDF3` / `#FFFFFF`) com contraste WCAG AA/AAA verificado e 0 anti-padrões no `npx impeccable detect`.
- Integração das 2 marcas oficiais da PUCPR (`./assets/img/logo-pucpr-selo.png` e `./assets/img/logo-pucpr-marista.jpg`) e do cartaz oficial (`./assets/img/cartaz-desafio-replit.jpg`), destacando a realização **Empreendedorismo PUCPR** (`https://empreendedorismo.pucpr.br/`) em parceria com o **Curso de Administração da PUCPR** e **Replit**, além do botão direto para o **Edital PDF Oficial**.
- **Fluxograma Didático Interativo em SVG (8 etapas)** seguindo a gramática `diagram-design` (`type-flowchart.md`), com controlador passo a passo e painel sincronizado de ação, custo em tokens e prompt.
- **Raio-X Interativo da Tela do Replit 2026 (6 hotspots)**, **Manual de Economia dos US$ 20 de Tokens**, **Central Anti-Pânico (4 cuidados forenses)**, **4 Exemplos Práticos de Administração/Negócios**, **Oficina de Prompts** (Montador + Duelo + 4 Etapas em abas), **Videoteca de 13 vídeos auditados em PT-BR com Player YouTube Embutido (`<dialog closedby="any">`)**, **16 documentos/guias oficiais** e **Checklist Gamificado de 6 missões (`localStorage`)**.
- Suíte automatizada de testes E2E (`./tests/test_portal_replit.py`) e registro arquitetural `docs/adr/0002-kit-inscrito-apple-daylight-fluxograma.md`.

## [0.1.0] - 2026-11-12
### Adicionado
- Criação da estrutura inicial do workspace `C:\Users\Paulo\Antigravity\Sites\Replit` e coleta dos documentos base em `./docs/kit/`.
