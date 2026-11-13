/* ==========================================================================
   Kit Oficial do Inscrito — Desafio Replit + PUCPR (Nov/2026)
   Módulo Interativo Vanilla JS (ES6+)
   ========================================================================== */

(() => {
  "use strict";

  /* ------------------------------------------------------------------------
     1. Utilitário de Cópia Acessível (modern-web-guidance: copy-button)
        - Usa Clipboard API + fallback síncrono <textarea readonly>
        - Jamais aplica disabled no botão
        - Atualiza região viva externa (<span role="status">) via opacity + \u00A0
     ------------------------------------------------------------------------ */
  const copyTimers = new WeakMap();
  const copyToggleMap = new WeakMap();

  async function copiarTextoParaClipboard(texto) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(texto);
        return true;
      } catch (_) {
        // Continua para o fallback síncrono abaixo
      }
    }
    const ta = document.createElement("textarea");
    ta.value = texto;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (_) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  async function acionarBotaoCopia(btn, texto, tipEl) {
    if (tipEl) {
      const prevTimer = copyTimers.get(btn);
      if (prevTimer) clearTimeout(prevTimer);

      const useNbsp = !copyToggleMap.get(btn);
      copyToggleMap.set(btn, useNbsp);
      tipEl.textContent = useNbsp ? "✓ Copiado!\u00A0" : "✓ Copiado!";
      tipEl.classList.add("visible");

      const timer = setTimeout(() => {
        tipEl.classList.remove("visible");
      }, 2200);
      copyTimers.set(btn, timer);
    }
    await copiarTextoParaClipboard(texto);
  }

  /* ------------------------------------------------------------------------
     2. Fluxograma Didático Interativo (8 Nós Semânticos — diagram-design)
     ------------------------------------------------------------------------ */
  const FLOW_STEPS = {
    1: {
      badge: "Etapa 1 de 8 • Dia 1 (17/11)",
      title: "1. Papel & Caneta: Definir a Dor e as 3 Telas",
      what: "Antes de encostar no teclado, defina em 1 frase quem é o cliente, qual problema real você resolve e quais são as 3 únicas telas essenciais da primeira versão (MVP).",
      where: "Fora da tela (anotação rápida ou Montador de Prompts da Seção 8 deste Kit).",
      cost: "🟢 Custo: US$ 0,00 (Zero Tokens)",
      costClass: "free",
      prompt: "Minha ideia se chama [Nome], ajuda [Público] a resolver [Problema] através de 3 telas simples: 1) Painel Resumo, 2) Cadastro Rápido e 3) Lista de Gestão."
    },
    2: {
      badge: "Etapa 2 de 8 • Dia 1 (17/11)",
      title: "2. Planejar Escopo com o Botão 'Plan' Ativado",
      what: "Ative o modo Plan no chat do Replit Agent para alinhar a lista de telas e o banco de dados sem que a IA saia escrevendo código errado ou gastando créditos à toa.",
      where: "Canto inferior direito da caixa de chat do Replit → Ative o botão 'Plan' (ou pressione Ctrl+Shift+I).",
      cost: "🟢 Custo: ~US$ 0,20 a US$ 0,60 (Planejamento Leve)",
      costClass: "free",
      prompt: "Estou no Modo Plan. Analise minha ideia em português (pt-BR) e proponha um plano enxuto de 3 telas com banco de dados e 5 exemplos pré-cadastrados. Ainda não escreva o código."
    },
    3: {
      badge: "Etapa 3 de 8 • Dia 2 (18/11)",
      title: "3. Construir o MVP Enxuto no 'Power Mode'",
      what: "Com o plano aprovado, autorize o Agent a construir o aplicativo completo já com banco de dados integrado e 5 registros realistas em português para demonstração.",
      where: "Desative o 'Plan' para entrar em Build e confirme que o seletor está em 'Power Mode' (o substituto oficial do antigo Economy Mode).",
      cost: "🟡 Custo: ~US$ 6,00 a US$ 10,00 (Construção Principal)",
      costClass: "moderate",
      prompt: "Aprovo o plano! Agora construa o MVP completo em português (pt-BR) com visual moderno em modo claro e deixe 5 registros brasileiros realistas pré-cadastrados no banco de dados."
    },
    4: {
      badge: "Etapa 4 de 8 • Dia 2 (18/11) — Decisão",
      title: "4. Funcionou no Preview? (O Ponto de Decisão)",
      what: "Teste o aplicativo ao vivo na janela direita (Preview): clique nos botões, cadastre um item novo e veja se ele permanece salvo ao recarregar.",
      where: "Painel direito 'Preview' (Webview) do Replit. Se funcionar, avance para a Etapa 5! Se der erro 1x ou 2x, envie o erro exato. Na 3ª falha seguida, vá para a Etapa 8 (Rollback).",
      cost: "🟢 Custo de testar no Preview: US$ 0,00",
      costClass: "free",
      prompt: "Na tela [Nome da Tela], ao clicar no botão [Nome do Botão], apareceu este erro: [Colar Erro]. Corrija apenas essa função sem alterar o restante do layout."
    },
    5: {
      badge: "Etapa 5 de 8 • Dia 3 (19/11)",
      title: "5. Polimento Visual Grátis ('Visual Editor' + 'Free Mode')",
      what: "Ajuste títulos, textos em português, cores de botões e espaçamentos clicando diretamente nos elementos da tela — sem gastar 1 centavo dos seus US$ 20!",
      where: "Barra da janela Preview → Clique no ícone 'Visual Editor' (edição direta a custo zero) ou use o 'Free Mode' (cota gratuita renovada a cada 5h).",
      cost: "🟢 Custo: US$ 0,00 (100% Grátis no Visual Editor / Free Mode)",
      costClass: "free",
      prompt: "No modo Free Mode: revise todos os rótulos e botões da tela inicial para português do Brasil claro e garanta ótimo contraste de leitura."
    },
    6: {
      badge: "Etapa 6 de 8 • Dia 3 (19/11)",
      title: "6. Publicar na Internet com 'Autoscale'",
      what: "Gere o link público oficial (.replit.app) para que a banca avaliadora e você possam abrir o sistema no celular ou no projetor do auditório.",
      where: "Canto superior direito → Botão 'Publish' (Publishing) → 'Adjust settings' → 'Deployment type' → escolha 'Autoscale' (NUNCA escolha Reserved VM!).",
      cost: "🟢 Custo: Centavos por uso (Escala a zero quando ocioso)",
      costClass: "free",
      prompt: "Faça uma checagem final para publicação em Autoscale: confirme que a rota principal abre direto no painel com os 5 exemplos visíveis, sem tela de login bloqueando a banca."
    },
    7: {
      badge: "Etapa 7 de 8 • Dia 3 (19/11) — Chegada",
      title: "7. Pitch de 3 Minutos no Palco da Politécnica!",
      what: "Apresente a dor real do mercado (45s), mostre o sistema funcionando ao vivo com dados preenchidos (90s) e conclua com o impacto do negócio (45s).",
      where: "Auditório / Laboratório Watts Humphrey (Bloco 10) com seu link .replit.app aberto e testado.",
      cost: "🏆 Recompensa: Premiação + Declaração de 20h + Portfólio Real",
      costClass: "free",
      prompt: "Roteiro de Pitch (3 min): 1) Qual problema real descobrimos; 2) Demonstração ao vivo das 3 telas no link publicado; 3) Como essa solução gera valor imediato."
    },
    8: {
      badge: "Desvio de Segurança Anti-Pânico • Qualquer Dia",
      title: "8. Saída de Emergência: Rollback (+ Caixinha 'Database')",
      what: "Se a IA errou 2 vezes seguidas a mesma coisa, PARE imediatamente de mandar mensagens! Volte o projeto no tempo para o último ponto que funcionava.",
      where: "Role o chat do Agent até a última versão estável → Clique em 'Rollback here' → Abra 'Additional rollback options' e MARQUE a caixinha 'Database'!",
      cost: "🛡️ Economia: Salva de US$ 5 a US$ 12 que seriam queimados em loop",
      costClass: "burn",
      prompt: "[Após fazer Rollback + Database]: Vamos tentar um caminho mais simples. Implemente apenas [Ação Simplificada] mantendo o banco de dados atual intacto."
    }
  };

  let currentFlowStep = 1;
  let flowTourInterval = null;

  function renderFlowStep(stepNum, showAll = false) {
    currentFlowStep = Number(stepNum) || 1;
    const data = FLOW_STEPS[currentFlowStep];
    if (!data) return;

    const nodes = document.querySelectorAll("[data-flow-step]");
    nodes.forEach((node) => {
      const n = Number(node.getAttribute("data-flow-step"));
      node.classList.toggle("is-active", n === currentFlowStep);
      node.classList.toggle("is-dimmed", !showAll && n !== currentFlowStep);
    });

    const badgeEl = document.getElementById("flow-detail-badge");
    const titleEl = document.getElementById("flow-detail-title");
    const whatEl = document.getElementById("flow-detail-what");
    const whereEl = document.getElementById("flow-detail-where");
    const costEl = document.getElementById("flow-detail-cost");
    const promptEl = document.getElementById("flow-detail-prompt");

    if (badgeEl) badgeEl.textContent = data.badge;
    if (titleEl) titleEl.textContent = data.title;
    if (whatEl) whatEl.textContent = data.what;
    if (whereEl) whereEl.textContent = data.where;
    if (costEl) {
      costEl.textContent = data.cost;
      costEl.className = `cost-pill ${data.costClass}`;
    }
    if (promptEl) promptEl.textContent = data.prompt;
  }

  function initFlowchart() {
    const nodes = document.querySelectorAll("[data-flow-step]");
    nodes.forEach((node) => {
      node.addEventListener("click", () => {
        stopFlowTour();
        renderFlowStep(Number(node.getAttribute("data-flow-step")), false);
      });
      node.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          stopFlowTour();
          renderFlowStep(Number(node.getAttribute("data-flow-step")), false);
        }
      });
    });

    const prevBtn = document.getElementById("flow-prev");
    const nextBtn = document.getElementById("flow-next");
    const tourBtn = document.getElementById("flow-tour");
    const resetBtn = document.getElementById("flow-reset");
    const copyFlowBtn = document.getElementById("btn-copy-flow-prompt");
    const copyFlowTip = document.getElementById("tip-copy-flow-prompt");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        stopFlowTour();
        const prev = currentFlowStep <= 1 ? 8 : currentFlowStep - 1;
        renderFlowStep(prev, false);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        stopFlowTour();
        const next = currentFlowStep >= 8 ? 1 : currentFlowStep + 1;
        renderFlowStep(next, false);
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        stopFlowTour();
        renderFlowStep(1, true);
      });
    }
    if (tourBtn) {
      tourBtn.addEventListener("click", () => {
        if (flowTourInterval) {
          stopFlowTour();
        } else {
          tourBtn.textContent = "⏸ Pausar Tour";
          flowTourInterval = setInterval(() => {
            const next = currentFlowStep >= 8 ? 1 : currentFlowStep + 1;
            renderFlowStep(next, false);
          }, 2600);
        }
      });
    }
    if (copyFlowBtn) {
      copyFlowBtn.addEventListener("click", () => {
        const promptText = document.getElementById("flow-detail-prompt")?.textContent || "";
        acionarBotaoCopia(copyFlowBtn, promptText, copyFlowTip);
      });
    }

    // Suporte a setas do teclado (ArrowRight / ArrowLeft) dentro da seção do fluxograma
    const flowSection = document.getElementById("fluxograma");
    if (flowSection) {
      flowSection.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          stopFlowTour();
          const next = currentFlowStep >= 8 ? 1 : currentFlowStep + 1;
          renderFlowStep(next, false);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          stopFlowTour();
          const prev = currentFlowStep <= 1 ? 8 : currentFlowStep - 1;
          renderFlowStep(prev, false);
        }
      });
    }

    // Static-first contract (?motion=static ou prefers-reduced-motion)
    const params = new URLSearchParams(window.location.search);
    const isStatic = params.get("motion") === "static";
    renderFlowStep(1, isStatic || true);
  }

  function stopFlowTour() {
    if (flowTourInterval) {
      clearInterval(flowTourInterval);
      flowTourInterval = null;
      const tourBtn = document.getElementById("flow-tour");
      if (tourBtn) tourBtn.textContent = "⏯ Tour Guiado";
    }
  }

  /* ------------------------------------------------------------------------
     3. Raio-X Interativo da Tela do Replit 2026 (6 Pinos)
     ------------------------------------------------------------------------ */
  const XRAY_SPOTS = {
    1: {
      badge: "Ponto 1 de 6 • Seu Canal de Comando",
      title: "Caixa de Chat do Replit Agent (Em Português)",
      body: "É aqui que você conversa com a inteligência artificial como se fosse um colega de equipe. Você não digita código: você descreve o problema de negócio, as telas que deseja e o que precisa ser ajustado.",
      tip: "💡 Dica de Ouro: Após o app base ficar pronto, peça apenas 1 alteração por mensagem para manter precisão máxima e gastar poucos tokens."
    },
    2: {
      badge: "Ponto 2 de 6 • Trava Anti-Desperdício",
      title: "Botão 'Plan' (Canto Inferior Direito do Chat)",
      body: "Quando o botão 'Plan' está ativado (azul), o Replit Agent funciona como um consultor: ele faz perguntas, sugere a estrutura das 3 telas e monta a lista de tarefas sem alterar seus arquivos nem gastar créditos pesados de construção.",
      tip: "💡 Atalho Rápido: Você também pode alternar os modos no teclado pressionando Ctrl+Shift+I (ou Cmd+Shift+I no Mac)."
    },
    3: {
      badge: "Ponto 3 de 6 • Controle de Créditos (US$ 20)",
      title: "Seletor de Modo: Free Mode / Power Mode / Max Mode",
      body: "Na versão 2026 do Replit, o antigo Economy Mode foi substituído pelo 'Power Mode' (equilíbrio ideal para criar o MVP). Já o 'Free Mode' usa uma franquia gratuita renovada a cada 5 horas para dúvidas e ajustes rápidos!",
      tip: "⚠️ Cuidado: Evite deixar no 'Max Mode' para tarefas comuns — ele usa os modelos mais caros e pode consumir vários dólares em poucos minutos."
    },
    4: {
      badge: "Ponto 4 de 6 • Segredo Custo Zero (US$ 0,00)",
      title: "Botão 'Visual Editor' (Edição Direta na Tela)",
      body: "Quer trocar um título em inglês para português, mudar a cor de um botão, ajustar o tamanho da letra ou a margem de um cartão? Clique no 'Visual Editor' na barra do Preview e edite direto na tela!",
      tip: "🟢 Economia Total: Alterações feitas pelo Visual Editor modificam o código instantaneamente e custam ZERO tokens de IA!"
    },
    5: {
      badge: "Ponto 5 de 6 • Máquina do Tempo Segura",
      title: "Janela 'Preview' + Histórico de 'Rollback'",
      body: "Toda vez que o Agent conclui uma tarefa, ele cria um Checkpoint no chat. Se uma mudança estragar o que já estava funcionando, basta rolar o chat para cima e clicar em 'Rollback here'.",
      tip: "🗄️ Atenção ao Banco de Dados: Ao clicar em Rollback, abra 'Additional rollback options' e marque a caixinha 'Database' se quiser desfazer mudanças nas tabelas!"
    },
    6: {
      badge: "Ponto 6 de 6 • Colocando o App na Internet",
      title: "Botão 'Publish' (Autoscale) + Abas Database & Secrets",
      body: "No Dia 3, clique em 'Publish' (Publishing) → 'Adjust settings' → 'Deployment type' e selecione 'Autoscale'. Ele gera um link público (.replit.app) que funciona no celular da banca e escala a zero quando ninguém está usando.",
      tip: "🚫 Nunca escolha 'Reserved VM' (que cobra US$ 20/mês fixo 24h por dia) nem 'Static' (que não suporta o banco de dados do seu app)."
    }
  };

  function initXraySimulator() {
    const buttons = document.querySelectorAll("[data-xray-spot]");
    const badgeEl = document.getElementById("xray-detail-badge");
    const titleEl = document.getElementById("xray-detail-title");
    const bodyEl = document.getElementById("xray-detail-body");
    const tipEl = document.getElementById("xray-detail-tip");

    function selectSpot(spotId) {
      const data = XRAY_SPOTS[spotId];
      if (!data) return;
      buttons.forEach((b) => {
        b.classList.toggle("is-active", b.getAttribute("data-xray-spot") === String(spotId));
      });
      if (badgeEl) badgeEl.textContent = data.badge;
      if (titleEl) titleEl.textContent = data.title;
      if (bodyEl) bodyEl.textContent = data.body;
      if (tipEl) tipEl.textContent = data.tip;
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => selectSpot(btn.getAttribute("data-xray-spot")));
    });
  }

  /* ------------------------------------------------------------------------
     4. Exemplos Práticos de Administração/Negócios & Montador de Prompts
     ------------------------------------------------------------------------ */
  const PRESET_EXAMPLES = {
    gestao: {
      ideia: "GestãoFácil — Painel de Pedidos, Estoque Crítico e Caixa para Microempresas",
      publico: "donos de pequenos comércios, cafeterias e negócios locais de Curitiba",
      dor: "perder vendas por falta de controle de estoque mínimo e não visualizar o lucro líquido da semana em uma tela simples"
    },
    agenda: {
      ideia: "AgendaSmart — Central de Agendamento, Triagem e Retorno de Clientes",
      publico: "clínicas, escritórios de consultoria e prestadores de serviços autônomos",
      dor: "sofrer com faltas de clientes (no-show), horários vagos na agenda e histórico de atendimento espalhado no WhatsApp"
    },
    rh: {
      ideia: "PulsoEquipe — Gestão de Metas (OKRs), Feedback Contínuo e Clima Organizacional",
      publico: "gestores de equipes comerciais e líderes de RH de pequenas e médias empresas",
      dor: "acompanhar o progresso das metas trimestrais da equipe e registrar planos de desenvolvimento individual sem planilhas complexas"
    },
    campus: {
      ideia: "ConectaCampus PUCPR — Mural de Projetos Empreendedores e Match de Talentos",
      publico: "estudantes universitários da PUCPR de Administração, Engenharias e Design",
      dor: "encontrar sócios complementares no campus para tirar ideias de startups do papel e validar problemas reais com mentores"
    }
  };

  function buildMasterPrompt(ideia, publico, dor) {
    const nomeIdeia = (ideia || "").trim() || "GestãoFácil — Painel Inteligente para Pequenos Negócios";
    const alvo = (publico || "").trim() || "empreendedores e gestores de pequenas empresas";
    const problema = (dor || "").trim() || "controlar pedidos, indicadores financeiros e prioridades do dia sem depender de planilhas confusas";

    return `Atue como um Engenheiro Full-Stack Sênior e Designer de Produto especialista em criar MVPs premiados em hackathons.

Quero planejar e construir o aplicativo web "${nomeIdeia}".
• Público-alvo: ${alvo}.
• Problema real resolvido: ${problema}.

DIRETRIZES OBRIGATÓRIAS DE ARQUITETURA E UX (PARA ECONOMIZAR TOKENS E BRILHAR NO PITCH):
1. IDIOMA E VISUAL: Toda a interface, botões, mensagens e dados devem estar 100% em Português do Brasil (pt-BR), com estética limpa em Modo Claro (estilo Apple Studio Daylight), responsiva para computador e celular.
2. ESCOPO ENXUTO DE 3 TELAS (MVP SEM LOGIN BLOQUEANTE):
   - Tela 1 (Dashboard Executivo): Indicadores principais no topo (cards de resumo) + visão geral imediata assim que abrir o link (NÃO coloque tela de login obrigatória bloqueando a avaliação da banca).
   - Tela 2 (Cadastro e Ação Rápida): Formulário simples, validado e intuitivo para inserir um novo registro em menos de 15 segundos.
   - Tela 3 (Gestão e Filtro Inteligente): Lista/tabela interativa permitindo filtrar por status, atualizar situação com 1 clique e visualizar detalhes.
3. BANCO DE DADOS COM 5 EXEMPLOS PRÉ-CADASTRADOS (SEED DATA):
   - Configure persistência real no banco de dados e já deixe 5 registros brasileiros realistas pré-cadastrados para que o aplicativo nunca abra vazio durante a demonstração do Pitch.

IMPORTANTE: Se eu estiver com o botão "Plan" ativado agora, apresente primeiro o plano objetivo das 3 telas e da tabela de dados para minha aprovação antes de gerar o código.`;
  }

  function initPromptWorkshop() {
    const inIdeia = document.getElementById("in-ideia");
    const inPublico = document.getElementById("in-publico");
    const inDor = document.getElementById("in-dor");
    const outputEl = document.getElementById("prompt-gerado-output");
    const copyBuilderBtn = document.getElementById("btn-copy-builder");
    const copyBuilderTip = document.getElementById("tip-copy-builder");

    function updateBuilderOutput() {
      if (!outputEl) return;
      outputEl.textContent = buildMasterPrompt(
        inIdeia?.value,
        inPublico?.value,
        inDor?.value
      );
    }

    [inIdeia, inPublico, inDor].forEach((input) => {
      if (input) input.addEventListener("input", updateBuilderOutput);
    });

    const presetTriggers = document.querySelectorAll("[data-preset]");
    presetTriggers.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-preset");
        const preset = PRESET_EXAMPLES[key];
        if (!preset) return;

        if (inIdeia) inIdeia.value = preset.ideia;
        if (inPublico) inPublico.value = preset.publico;
        if (inDor) inDor.value = preset.dor;
        updateBuilderOutput();

        document.querySelectorAll(".preset-chip").forEach((chip) => {
          chip.classList.toggle("is-active", chip.getAttribute("data-preset") === key);
        });

        // Se clicou em um card da Seção 7, rola suavemente até o Montador
        if (btn.classList.contains("scroll-to-builder")) {
          document.getElementById("oficina-montador")?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });

    if (copyBuilderBtn) {
      copyBuilderBtn.addEventListener("click", () => {
        acionarBotaoCopia(copyBuilderBtn, outputEl?.textContent || "", copyBuilderTip);
      });
    }

    // Botões de cópia das 4 etapas de prompts prontos
    document.querySelectorAll("[data-copy-stage]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-copy-stage");
        const tipId = btn.getAttribute("data-copy-tip");
        const codeEl = document.getElementById(targetId);
        const tipEl = document.getElementById(tipId);
        if (codeEl) {
          acionarBotaoCopia(btn, codeEl.textContent || "", tipEl);
        }
      });
    });

    updateBuilderOutput();
  }

  /* ------------------------------------------------------------------------
     5. Sistema de Abas Semânticas (modern-web-guidance: tabs)
     ------------------------------------------------------------------------ */
  function initAccessibleTabs(tablistSelector) {
    const tablist = document.querySelector(tablistSelector);
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));

    function activateTab(selectedTab, focusTab = false) {
      tabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.setAttribute("aria-selected", isSelected ? "true" : "false");
        tab.tabIndex = isSelected ? 0 : -1;
        const panelId = tab.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel) {
          if (isSelected) {
            panel.removeAttribute("hidden");
          } else {
            panel.setAttribute("hidden", "");
          }
        }
      });
      if (focusTab) selectedTab.focus();
    }

    tabs.forEach((tab, idx) => {
      tab.addEventListener("click", () => activateTab(tab, false));
      tab.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          activateTab(tabs[(idx + 1) % tabs.length], true);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          activateTab(tabs[(idx - 1 + tabs.length) % tabs.length], true);
        } else if (e.key === "Home") {
          e.preventDefault();
          activateTab(tabs[0], true);
        } else if (e.key === "End") {
          e.preventDefault();
          activateTab(tabs[tabs.length - 1], true);
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. Videoteca Auditada (13 Vídeos PT-BR) + Player Embutido <dialog>
     ------------------------------------------------------------------------ */
  const VIDEOS_DATA = [
    {
      id: "rDR1ym2HQKc",
      titulo: "Vibe Coding: O que você precisa saber!",
      canal: "Código Fonte TV",
      duracao: "00m30s",
      cat: "rapido",
      catLabel: "⚡ Rápido (30s)",
      resumo: "Entenda em 30 segundos como funciona programar conversando em português com a IA e por que você é o diretor do projeto."
    },
    {
      id: "cLzQGaGuxOA",
      titulo: "Como Usar o Replit Grátis — Guia para Iniciantes 2026",
      canal: "TechGuidePro Português",
      duracao: "01m43s",
      cat: "rapido",
      catLabel: "⚡ Rápido (1m43s)",
      resumo: "Tour direto ao ponto mostrando como criar a conta, abrir o painel inicial e dar o primeiro comando no Replit."
    },
    {
      id: "JleGqrG6Lhc",
      titulo: "CRIEI um APP e um SITE para VENDER em 6 MINUTOS!",
      canal: "Negócios em Mente",
      duracao: "06m18s",
      cat: "pratico",
      catLabel: "🛠️ Mão na Massa",
      resumo: "Excelente para alunos de Administração e Negócios: mostra como transformar uma ideia comercial em protótipo funcional rapidamente."
    },
    {
      id: "c70oPEfvARY",
      titulo: "Eu testei: Criei aplicativos para Android e iOS com Replit",
      canal: "Helio Arreche",
      duracao: "06m18s",
      cat: "pratico",
      catLabel: "🛠️ Mão na Massa",
      resumo: "Mostra na prática como criar e testar aplicativos focados na experiência mobile pelo celular."
    },
    {
      id: "yZylpOR5n7o",
      titulo: "PUBLICAR App com IA na Play Store e App Store (Passo a Passo)",
      canal: "Onde eu Clico",
      duracao: "10m00s",
      cat: "pratico",
      catLabel: "🛠️ Mão na Massa",
      resumo: "Visão prática de publicação e disponibilização do aplicativo criado com IA para usuários reais."
    },
    {
      id: "Lz5H6WuV6iU",
      titulo: "Replit — Programe Online de Forma Completa",
      canal: "Hashtag Programação",
      duracao: "10m45s",
      cat: "pratico",
      catLabel: "🛠️ Mão na Massa",
      resumo: "Didática super acessível explicando a estrutura das janelas do Replit na nuvem sem precisar instalar nada no computador."
    },
    {
      id: "NjGfb7XjsIQ",
      titulo: "Replit FREE e outras novidades — com EXEMPLO",
      canal: "Elber Domingos",
      duracao: "11m16s",
      cat: "pratico",
      catLabel: "🛠️ Mão na Massa",
      resumo: "Essencial para economizar tokens: mostra como funcionam os modos de uso, créditos e novidades recentes da plataforma."
    },
    {
      id: "Jc7vOaadsLY",
      titulo: "Com 5 prompts criamos um projeto no Replit (com autenticação)",
      canal: "Código Fonte TV",
      duracao: "16m58s",
      cat: "pratico",
      catLabel: "🛠️ Mão na Massa",
      resumo: "Demonstra a técnica de evolução incremental: construir o sistema passo a passo em 5 prompts bem estruturados."
    },
    {
      id: "C1VjuaWEPI4",
      titulo: "Como criar seu Primeiro APP com IA no REPLIT! (Passo a Passo)",
      canal: "Sancler Miranda",
      duracao: "19m02s",
      cat: "pratico",
      catLabel: "🛠️ Mão na Massa",
      resumo: "Tutorial completo do zero mostrando desde o primeiro prompt até os ajustes visuais e banco de dados."
    },
    {
      id: "NXbya3qmMi8",
      titulo: "Essa IA pode criar seus apps em segundos — Vamos testar o Replit",
      canal: "Léo Andrade",
      duracao: "21m49s",
      cat: "pratico",
      catLabel: "🛠️ Mão na Massa",
      resumo: "Teste prático de 21 minutos criando uma aplicação real e mostrando como reagir quando a IA comete pequenos erros."
    },
    {
      id: "gPUGz8YSQwc",
      titulo: "O Replit é a melhor plataforma para vibe coding",
      canal: "Rafael Quintanilha — QuantBrasil",
      duracao: "41m50s",
      cat: "imersao",
      catLabel: "🎓 Imersão Completa",
      resumo: "Aula aprofundada ideal para assistir antes do evento: analisa arquitetura, banco de dados e publicação profissional."
    },
    {
      id: "TbtBUYxpygA",
      titulo: "Vibe coding: guia completo para iniciantes",
      canal: "Vini Lana",
      duracao: "42m16s",
      cat: "imersao",
      catLabel: "🎓 Imersão Completa",
      resumo: "Curso introdutório completo sobre mentalidade de produto, engenharia de prompts para leigos e boas práticas."
    },
    {
      id: "QBJVxwscuvI",
      titulo: "Tutorial Replit: Como Usar o Replit AI para Criar Apps Completos",
      canal: "Eric Grassi",
      duracao: "47m14s",
      cat: "imersao",
      catLabel: "🎓 Imersão Completa",
      resumo: "Masterclass detalhada cobrindo todas as ferramentas do painel Replit AI do início ao deploy final."
    }
  ];

  function renderVideos(filterCat = "todos") {
    const grid = document.getElementById("grid-videos");
    if (!grid) return;

    const list = filterCat === "todos"
      ? VIDEOS_DATA
      : VIDEOS_DATA.filter((v) => v.cat === filterCat);

    grid.innerHTML = list
      .map(
        (v) => `
      <article class="cinema-video-card" data-video-id="${v.id}" data-video-cat="${v.cat}">
        <button type="button" class="cinema-thumb-wrap" data-open-video="${v.id}" aria-label="Assistir na página: ${v.titulo}">
          <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="Miniatura da aula ${v.titulo}" loading="lazy" width="480" height="360">
          <span class="cinema-play-btn">
            <span class="cinema-glass-circle" aria-hidden="true">▶</span>
          </span>
          <span class="cinema-time-tag">${v.duracao}</span>
        </button>
        <div class="cinema-card-info">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <span class="eyebrow-text" style="margin:0;font-size:0.75rem;">${v.catLabel}</span>
            <span style="font-size:0.8rem;color:var(--apple-muted);">${v.canal}</span>
          </div>
          <h3>${v.titulo}</h3>
          <p style="font-size:0.9rem;color:var(--apple-secondary);flex:1;">${v.resumo}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:14px;border-top:1px solid rgba(0,0,0,0.05);margin-top:8px;">
            <button type="button" class="btn btn-safira btn-sm" data-open-video="${v.id}">▶ Assistir Aqui</button>
            <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener" style="font-size:0.82rem;font-weight:600;">YouTube ↗</a>
          </div>
        </div>
      </article>
    `
      )
      .join("");
  }

  /* modern-web-guidance: dialog + light-dismiss-a-dialog */
  function attachDialogLightDismissFallback(dialogEl, onCloseCallback) {
    if (!dialogEl) return;
    dialogEl.addEventListener("close", () => {
      if (typeof onCloseCallback === "function") onCloseCallback();
    });
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      dialogEl.addEventListener("click", (e) => {
        if (e.target !== dialogEl) return;
        const rect = dialogEl.getBoundingClientRect();
        const clickedOutside =
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom;
        if (clickedOutside) dialogEl.close();
      });
    }
  }

  function initVideoLibraryAndModals() {
    renderVideos("todos");

    // Filtros da Videoteca
    const filterBtns = document.querySelectorAll("[data-video-filter]");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-video-filter") || "todos";
        filterBtns.forEach((b) => {
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        renderVideos(cat);
      });
    });

    // Modal de Vídeo Embutido
    const videoModal = document.getElementById("video-modal");
    const videoIframe = document.getElementById("video-modal-iframe");
    const videoTitle = document.getElementById("video-modal-title");
    const videoSummary = document.getElementById("video-modal-summary");
    const videoExtLink = document.getElementById("video-modal-external");
    const videoCloseBtn = document.getElementById("video-modal-close");
    let lastVideoTrigger = null;

    function closeAndResetVideoModal() {
      if (videoIframe) videoIframe.setAttribute("src", "");
      if (lastVideoTrigger && typeof lastVideoTrigger.focus === "function") {
        lastVideoTrigger.focus();
      }
    }

    attachDialogLightDismissFallback(videoModal, closeAndResetVideoModal);

    if (videoCloseBtn && videoModal) {
      videoCloseBtn.addEventListener("click", () => {
        videoModal.close();
      });
    }

    document.addEventListener("click", (e) => {
      if (e.target.closest("a[href]")) return;
      const trigger = e.target.closest("[data-open-video], [data-video-id]");
      if (!trigger || !videoModal) return;
      const vid = trigger.getAttribute("data-open-video") || trigger.getAttribute("data-video-id");
      const meta = VIDEOS_DATA.find((x) => x.id === vid);
      if (!meta) return;

      lastVideoTrigger = trigger;
      if (videoTitle) videoTitle.textContent = `${meta.titulo} (${meta.duracao})`;
      if (videoSummary) videoSummary.textContent = meta.resumo;
      if (videoExtLink) videoExtLink.setAttribute("href", `https://www.youtube.com/watch?v=${meta.id}`);
      if (videoIframe) {
        videoIframe.setAttribute(
          "src",
          `https://www.youtube-nocookie.com/embed/${meta.id}?autoplay=1&rel=0`
        );
      }
      videoModal.showModal();
    });

    // Lightbox do Cartaz Oficial
    const posterModal = document.getElementById("poster-modal");
    const openPosterBtn = document.getElementById("btn-open-poster");
    const closePosterBtn = document.getElementById("poster-modal-close");

    attachDialogLightDismissFallback(posterModal, () => {
      if (openPosterBtn && typeof openPosterBtn.focus === "function") {
        openPosterBtn.focus();
      }
    });
    if (openPosterBtn && posterModal) {
      openPosterBtn.addEventListener("click", () => posterModal.showModal());
    }
    if (closePosterBtn && posterModal) {
      closePosterBtn.addEventListener("click", () => posterModal.close());
    }
  }

  /* ------------------------------------------------------------------------
     7. Checklist Gamificado de 6 Missões (Persistência localStorage)
     ------------------------------------------------------------------------ */
  const STORAGE_KEY = "pucpr_replit_kit_xp_v2";
  const RANKS = [
    "Nível 1: Explorador da Ideia",
    "Nível 2: Arquiteto do Modo Plan",
    "Nível 3: Construtor de MVP",
    "Nível 4: Guardião dos Tokens",
    "Nível 5: Especialista Full-Stack",
    "Nível 6: Fundador Pronto para o Pitch 🏆"
  ];

  function initGamifiedChecklist() {
    const checkboxes = Array.from(document.querySelectorAll(".chk-missao"));
    const xpFill = document.getElementById("xp-bar-fill");
    const xpPercent = document.getElementById("xp-percent");
    const xpRank = document.getElementById("xp-rank");
    const xpBannerStatus = document.getElementById("checklist-status-text");
    const resetBtn = document.getElementById("btn-reset-xp");

    let savedState = {};
    try {
      savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
    } catch (_) {
      savedState = {};
    }

    function updateProgressUI() {
      const total = checkboxes.length || 6;
      const done = checkboxes.filter((c) => c.checked).length;
      const pct = Math.round((done / total) * 100);

      if (xpFill) xpFill.style.width = `${pct}%`;
      if (xpPercent) xpPercent.textContent = `${pct}%`;

      const rankIndex = done === 0 ? 0 : Math.min(RANKS.length - 1, done - 1);
      const rankText = done === total ? RANKS[5] : RANKS[rankIndex];
      if (xpRank) xpRank.textContent = rankText;
      if (xpBannerStatus) {
        xpBannerStatus.textContent = `${done} de ${total} missões concluídas (${pct}%) — ${rankText}`;
      }

      const toSave = {};
      checkboxes.forEach((c) => {
        toSave[c.value] = c.checked;
      });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      } catch (_) {
        // Ignora erro de storage privado
      }
    }

    checkboxes.forEach((chk) => {
      if (savedState[chk.value]) chk.checked = true;
      chk.addEventListener("change", updateProgressUI);
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        checkboxes.forEach((c) => {
          c.checked = false;
        });
        updateProgressUI();
      });
    }

    updateProgressUI();
  }

  /* ------------------------------------------------------------------------
     Inicialização Principal
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    initFlowchart();
    initXraySimulator();
    initPromptWorkshop();
    initAccessibleTabs("#prompt-stage-tabs");
    initVideoLibraryAndModals();
    initGamifiedChecklist();
  });
})();
