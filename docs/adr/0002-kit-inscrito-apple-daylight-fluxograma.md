# ADR 0002: Kit Oficial do Inscrito em 100% Apple Studio Daylight com Fluxograma Didático Interativo

- **Status:** Aceito
- **Data:** 2026-11-12
- **Contexto:** O portal do **Desafio Replit + PUCPR** (17, 18 e 19 de novembro de 2026, das 14h às 17h, no Laboratório Watts Humphrey — Escola Politécnica, Bloco 10) não é uma landing page de inscrição, mas sim o **Kit Oficial de Boas-Vindas, Sobrevivência e Execução para os estudantes já inscritos** (em sua maioria leigos totais em programação). Era necessário corrigir informações técnicas desatualizadas sobre o Replit, destacar a realização institucional da área **Empreendedorismo PUCPR** em parceria com o **Curso de Administração da PUCPR** e **Replit** (sem menção à Hotmilk), disponibilizar o **Edital PDF Oficial** e embutir um player de vídeo funcional para os 13 tutoriais auditados.
- **Decisão:**
  1. **Paleta `100% Apple Studio Daylight` (WCAG AA/AAA):** Uso de superfície principal em alabastro suave (`#F6F7FA`), estágio secundário (`#E9EDF3`), cartões Bento brancos (`#FFFFFF`), tipografia grafite (`#1D1D1F` / `#424245` / `#525866`) e acentos calibrados para modo claro (`#0066CC`, `#B44104`, `#047857`, `#B45309`, `#B91C1C`).
  2. **Gramática de Fluxograma Didático (`diagram-design`):** Implementação de fluxograma interativo em SVG de 8 nós usando formas semânticas estritas (Oval para Início/Pitch, Retângulo para ações, Losango para decisão de Preview e ponto de junção para o loop de `Rollback + Database`), com controlador passo a passo sincronizado.
  3. **Correções da Auditoria Forense Replit Nov/2026:** Atualização da nomenclatura oficial de modos (`Plan`, `Free Mode`, `Power Mode`, `Max Mode`, `Visual Editor`), alerta para a caixinha `"Database"` em *"Additional rollback options"*, publicação via `Autoscale` e regra obrigatória de 5 registros pré-cadastrados para evitar telas vazias no Pitch.
  4. **Padrões `modern-web-guidance`:** Uso de `<dialog closedby="any">` com `@starting-style` e `transition-behavior: allow-discrete` separados para o Player YouTube Embutido e Lightbox do Cartaz Oficial; botão de cópia acessível com `<span role="status">` externo; abas semânticas com `::after` e `text-wrap: balance`/`pretty`.
- **Consequências:**
  - Zero anti-padrões detectados pelo `npx impeccable detect index.html`.
  - Suíte E2E automatizada (`tests/test_portal_replit.py`) passando 100% em Desktop (`1440x900`), Tablet (`768x1024`) e Mobile (`390x844`).
  - Publicação imediata no GitHub Pages a partir da raiz (`./index.html` + `./.nojekyll`).
