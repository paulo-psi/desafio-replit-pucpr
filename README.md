# Kit Oficial do Inscrito — Desafio Replit + PUCPR

Portal pedagógico e interativo construído para os estudantes inscritos no **Desafio Replit + PUCPR: Da ideia ao software** (**17, 18 e 19 de novembro de 2026, das 14h às 17h**, no **Laboratório Watts Humphrey — Escola Politécnica, Bloco 10, 1º andar**, Campus Curitiba).

- **Realização:** [Empreendedorismo PUCPR](https://empreendedorismo.pucpr.br/) em parceria com o **Curso de Administração da PUCPR** (Escola de Negócios) e [Replit](https://replit.com/).
- **Documento Oficial:** [Edital Desafio Replit PUCPR 2026 (PDF)](https://empreendedorismo.pucpr.br/wp-content/uploads/2026/11/Edital_Desafio-Replit-PUCPR-2026.pdf).

## Estrutura Principal
- `./index.html` — Página principal na raiz (pronta para publicação no GitHub Pages com `./.nojekyll`).
- `./assets/css/styles.css` — Design System `100% Apple Studio Daylight` (ADR 0006 + `modern-web-guidance`).
- `./assets/js/app.js` — Controlador interativo do Fluxograma Didático de 8 etapas, Raio-X da interface Replit 2026, Montador de Prompts, Abas, Player YouTube embutido (`<dialog closedby="any">`) e Checklist Gamificado (`localStorage`).
- `./assets/img/` — Logos oficiais da PUCPR (`logo-pucpr-selo.png`, `logo-pucpr-marista.jpg`) e cartaz oficial (`cartaz-desafio-replit.jpg`).
- `./tests/test_portal_replit.py` — Suíte de testes E2E automatizada (Playwright + Pytest).
- `./docs/` — Governança do projeto (`brief.md`, `plan.md`, `log.md`, `adr/` e `kit/`).
