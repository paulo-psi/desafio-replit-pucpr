# Brief do Projeto: Kit Oficial do Inscrito — Desafio Replit + PUCPR

## 1. Visão Geral e Posicionamento
Portal web interativo (**Kit Oficial do Inscrito**) desenvolvido para guiar os estudantes participantes do **Desafio Replit + PUCPR: Da ideia ao software** (**17, 18 e 19 de novembro de 2026, das 14h às 17h**, no **Laboratório Watts Humphrey — Escola Politécnica, Bloco 10, 1º andar**, Campus Curitiba).

- **Foco Central:** Apoiar o estudante **leigo absoluto (zero programação)** com dicas práticas, fluxo de trabalho passo a passo, economia dos **US$ 20 de créditos (tokens)**, cuidados anti-erro, exemplos de Administração/Negócios, oficina de prompts e 13 tutoriais em vídeo com player embutido.
- **Chancela Institucional:** Realização **Empreendedorismo PUCPR** (`https://empreendedorismo.pucpr.br/`) em parceria com o **Curso de Administração da PUCPR** (Escola de Negócios) e **Replit** (`https://replit.com/`).
- **Documento Oficial:** Acesso direto ao Edital oficial (`https://empreendedorismo.pucpr.br/wp-content/uploads/2026/11/Edital_Desafio-Replit-PUCPR-2026.pdf`).

## 2. Arquitetura das 10 Seções (`100% Apple Studio Daylight`)
1. **Header Daylight Glass + HUD XP:** Logos oficiais PUCPR e Replit, navegação rápida, botão do Edital PDF e barra de progresso gamificada (`localStorage`).
2. **Hero do Inscrito:** Boas-vindas, logística das 3 tardes (17, 18 e 19/11), cartaz oficial ampliável em Lightbox `<dialog>` e card institucional PUCPR | Grupo Marista.
3. **Fluxograma Didático Interativo (`diagram-design`):** Mapa SVG de 8 etapas com formas semânticas, controlador passo a passo e painel sincronizado (*O que fazer*, *Onde clicar*, *Custo em tokens* e *Prompt da etapa*).
4. **Guia Para Leigos:** Papel do Diretor de Produto vs. Engenheiro IA, **Raio-X Interativo da Tela do Replit 2026** (6 pinos clicáveis) e Tradutor de Jargões (`<details>`).
5. **Manual de Economia de Tokens (US$ 20):** Divisão nos 3 Potes do Orçamento e tabela comparativa (`Visual Editor` grátis, `Free Mode`, `Plan`, `Power Mode`, `Max Mode` e `Autoscale`).
6. **Cuidados Críticos & Central Anti-Pânico:** Regra das 2 Tentativas, caixinha `"Database"` no Rollback, deploy `Autoscale` e proibição de tela vazia/login bloqueante no Pitch.
7. **Exemplos Práticos de MVP:** 4 casos de Administração, Serviços, RH e Campus com preenchimento em 1 clique no Montador.
8. **Oficina de Prompts:** Montador automático em tempo real + Duelo Visual (Errado vs. Certo) + Abas das 4 etapas do hackathon.
9. **Videoteca Auditada (13 Vídeos) & Docs/PDFs:** 13 vídeos reais em português com filtros por tempo e **Player YouTube Embutido (`<dialog closedby="any">`)**, além dos 10 módulos da documentação oficial Replit PT-BR e 5 artigos/PDFs.
10. **Checklist Gamificado (6 Missões) & Rodapé Institucional PUCPR:** Persistência local de evolução e rodapé institucional completo.
