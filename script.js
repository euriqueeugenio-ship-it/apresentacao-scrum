
const questions = [
  {
    question: "O que melhor descreve o Scrum?",
    options: [
      "Uma linguagem de programação para criar sistemas.",
      "Um framework leve para lidar com problemas complexos e entregar valor.",
      "Um programa usado apenas para montar cronogramas.",
      "Uma abordagem que proíbe mudanças depois do planejamento."
    ],
    correct: 1,
    explanation:
      "Scrum é um framework que ajuda equipes a resolver problemas complexos, inspecionar resultados e adaptar o trabalho."
  },
  {
    question: "Quais são as três responsabilidades dentro do Scrum Team?",
    options: [
      "Gerente, programador e cliente.",
      "Analista, diretor e administrador.",
      "Product Owner, Scrum Master e Developers.",
      "Designer, gerente de projeto e testador."
    ],
    correct: 2,
    explanation:
      "As três responsabilidades são Product Owner, Scrum Master e Developers."
  },
  {
    question: "Qual é a duração máxima de uma Sprint?",
    options: [
      "Sempre um dia.",
      "Exatamente duas semanas.",
      "Um mês ou menos.",
      "Até que todas as tarefas da empresa terminem."
    ],
    correct: 2,
    explanation:
      "Uma Sprint tem duração fixa de um mês ou menos."
  },
  {
    question: "Qual é a principal responsabilidade do Product Owner?",
    options: [
      "Maximizar o valor do produto e gerenciar eficazmente o Product Backlog.",
      "Programar sozinho todas as funcionalidades.",
      "Distribuir obrigatoriamente cada tarefa aos Developers.",
      "Executar todas as reuniões sem a participação da equipe."
    ],
    correct: 0,
    explanation:
      "O Product Owner é responsável por maximizar o valor do produto e pelo gerenciamento eficaz do Product Backlog."
  },
  {
    question: "Qual é o papel do Scrum Master?",
    options: [
      "Ser o chefe que controla individualmente cada integrante.",
      "Definir sozinho todas as funcionalidades do produto.",
      "Substituir os Developers durante o desenvolvimento.",
      "Ajudar todos a compreender e aplicar o Scrum, promovendo sua eficácia."
    ],
    correct: 3,
    explanation:
      "O Scrum Master ajuda o Scrum Team e a organização a compreender e aplicar o Scrum."
  },
  {
    question: "Para que serve o Daily Scrum?",
    options: [
      "Apresentar obrigatoriamente um relatório ao diretor.",
      "Inspecionar o progresso em direção à Sprint Goal e adaptar o plano de trabalho.",
      "Escolher o preço de venda do produto.",
      "Substituir todos os testes de software."
    ],
    correct: 1,
    explanation:
      "O Daily Scrum é um evento de 15 minutos para os Developers inspecionarem o progresso e adaptarem seu plano."
  },
  {
    question: "O que compõe o Sprint Backlog?",
    options: [
      "Somente uma lista de erros encontrados.",
      "Todas as solicitações de todas as áreas da empresa.",
      "A Sprint Goal, os itens selecionados do Product Backlog e um plano de trabalho.",
      "Apenas a versão final do software."
    ],
    correct: 2,
    explanation:
      "O Sprint Backlog reúne o objetivo da Sprint, os itens selecionados e o plano de trabalho dos Developers."
  },
  {
    question: "O que é um Incremento no Scrum?",
    options: [
      "Uma reunião para distribuir tarefas.",
      "Uma lista de funcionalidades não desenvolvidas.",
      "Um documento contendo os horários da equipe.",
      "Um resultado utilizável que atende à Definition of Done."
    ],
    correct: 3,
    explanation:
      "O Incremento é um resultado utilizável que atende à Definition of Done e pode ser combinado com incrementos anteriores."
  },
  {
    question: "Qual é o objetivo principal da Sprint Review?",
    options: [
      "Inspecionar o resultado da Sprint com os stakeholders e discutir as próximas adaptações.",
      "Avaliar individualmente os funcionários para promoções.",
      "Eliminar a necessidade de planejar novas Sprints.",
      "Impedir que os usuários sugiram mudanças."
    ],
    correct: 0,
    explanation:
      "Na Sprint Review, o Scrum Team e os stakeholders inspecionam o resultado e discutem adaptações futuras."
  },
  {
    question: "Qual evento ajuda a equipe a melhorar a forma como trabalha?",
    options: [
      "Product Backlog.",
      "Sprint Retrospective.",
      "Sprint Backlog.",
      "Definition of Done."
    ],
    correct: 1,
    explanation:
      "Na Sprint Retrospective, o Scrum Team identifica melhorias para aumentar sua qualidade e eficácia."
  }
];

// ------------------------------------------------
// 1. GERAR UMA TELA INDEPENDENTE PARA CADA PERGUNTA
// ------------------------------------------------

const placeholder = document.getElementById("quiz-placeholder");
const answers = Array(questions.length).fill(null);

const questionSlides = questions.map((question, index) => {
  const page = document.createElement("section");

  page.className = "slide quiz-page";
  page.id = `quiz-${index + 1}`;
  page.dataset.quizIndex = String(index);

  const optionsHTML = question.options.map((option, optionIndex) => `
    <button
      type="button"
      class="answer-option"
      data-option="${optionIndex}"
      aria-pressed="false"
    >
      <span class="option-letter">
        ${String.fromCharCode(65 + optionIndex)}
      </span>
      <span>${option}</span>
    </button>
  `).join("");

  page.innerHTML = `
    <div class="quiz-topline">
      <span class="quiz-counter">
        PERGUNTA ${String(index + 1).padStart(2, "0")}
        DE ${questions.length}
      </span>
      <span class="quiz-badge">1 ponto por acerto</span>
    </div>

    <h2>${question.question}</h2>
    <p class="quiz-instruction">Escolha uma única alternativa.</p>

    <div class="quiz-options" role="group"
         aria-label="Alternativas da pergunta ${index + 1}">
      ${optionsHTML}
    </div>

    <p class="quiz-help" aria-live="polite">
      Selecione uma resposta para liberar o botão Próximo.
    </p>
  `;

  const optionButtons = [...page.querySelectorAll(".answer-option")];

  optionButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.option);

      answers[index] = selected;

      optionButtons.forEach(option => {
        const isSelected = option === button;

        option.classList.toggle("selected", isSelected);
        option.setAttribute("aria-pressed", String(isSelected));
      });

      updateNavigation();
    });
  });

  return page;
});

// Insere todas as perguntas antes da tela de resultado.
placeholder.replaceWith(...questionSlides);

// ------------------------------------------------
// 2. CAPTURAR OS ELEMENTOS DA APRESENTAÇÃO
// ------------------------------------------------

const slides = [...document.querySelectorAll(".slide")];

const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progress = document.getElementById("progress");
const slideCount = document.getElementById("slide-count");
const dotsContainer = document.getElementById("dots");

const fullscreenButton = document.getElementById("fullscreen");
const startQuizButton = document.getElementById("start-quiz");
const retryButton = document.getElementById("retry-quiz");
const backToStartButton = document.getElementById("back-to-start");
const homeLink = document.getElementById("home-link");
const resultContent = document.getElementById("result-content");

let currentSlide = 0;

const quizStartIndex = slides.findIndex(slide =>
  slide.id === "quiz-1"
);

if (quizStartIndex === -1) {
  throw new Error("Não foi possível criar as páginas do questionário.");
}

// ------------------------------------------------
// 3. INDICADORES DE PROGRESSO
// ------------------------------------------------

slides.forEach((slide, index) => {
  const indicator = document.createElement("span");

  indicator.title = `Página ${index + 1}`;
  indicator.setAttribute("aria-hidden", "true");

  dotsContainer.appendChild(indicator);
});

const dots = [...dotsContainer.querySelectorAll("span")];

// ------------------------------------------------
// 4. ATUALIZAR A NAVEGAÇÃO
// ------------------------------------------------

function updateNavigation() {
  const activeSlide = slides[currentSlide];

  previousButton.disabled = currentSlide === 0;

  let unanswered = false;

  if (activeSlide.dataset.quizIndex !== undefined) {
    const questionIndex = Number(activeSlide.dataset.quizIndex);
    unanswered = answers[questionIndex] === null;
  }

  const isFinalSlide = currentSlide === slides.length - 1;

  nextButton.disabled = unanswered || isFinalSlide;

  if (activeSlide.id === "quiz-10") {
    nextButton.textContent = "Ver resultado →";
  } else if (activeSlide.id === "resultado") {
    nextButton.textContent = "Agradecimento →";
  } else if (isFinalSlide) {
    nextButton.textContent = "Fim da apresentação";
  } else {
    nextButton.textContent = "Próximo →";
  }

  slideCount.textContent =
    `${String(currentSlide + 1).padStart(2, "0")} / ` +
    `${String(slides.length).padStart(2, "0")}`;

  progress.style.width =
    `${((currentSlide + 1) / slides.length) * 100}%`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

// ------------------------------------------------
// 5. MOSTRAR UM ÚNICO SLIDE
// ------------------------------------------------

function showSlide(index) {
  const target = Math.max(0, Math.min(index, slides.length - 1));
  const activeSlide = slides[currentSlide];

  // Impede avançar quando a pergunta atual não foi respondida.
  if (target > currentSlide &&
      activeSlide.dataset.quizIndex !== undefined) {

    const questionIndex = Number(activeSlide.dataset.quizIndex);

    if (answers[questionIndex] === null) {
      return;
    }
  }

  currentSlide = target;

  slides.forEach((slide, i) => {
    const active = i === currentSlide;

    slide.classList.toggle("active", active);
    slide.setAttribute("aria-hidden", String(!active));
  });

  updateNavigation();

  // Não há scrollTo: a apresentação permanece na mesma tela.
}

previousButton.addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

nextButton.addEventListener("click", () => {
  if (slides[currentSlide].id === "quiz-10") {
    renderResult();
  }

  showSlide(currentSlide + 1);
});

// Começar pelos botões com destino explícito.
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showSlide(Number(button.dataset.go));
  });
});

startQuizButton.addEventListener("click", () => {
  showSlide(quizStartIndex);
});

homeLink.addEventListener("click", event => {
  event.preventDefault();
  showSlide(0);
});

// ------------------------------------------------
// 6. CALCULAR A PONTUAÇÃO E MOSTRAR O RESULTADO
// ------------------------------------------------

function renderResult() {
  const score = answers.reduce((total, answer, index) => {
    return total + (
      answer === questions[index].correct ? 1 : 0
    );
  }, 0);

  const approved = score >= 6;

  const heading = approved ? "Parabéns!" : "Tente de novo";

  const message = approved
    ? "Você acertou pelo menos 6 das 10 perguntas e demonstrou um bom entendimento dos conceitos do Scrum!"
    : "Você acertou 5 ou menos perguntas. Revise os conteúdos e tente novamente para melhorar sua pontuação.";

  const icon = approved ? "🏆" : "📚";

  resultContent.innerHTML = `
    <div class="result-icon">${icon}</div>

    <h2>${heading}</h2>

    <div class="result-score">
      <strong>${score}</strong>
      <span>de ${questions.length} pontos</span>
    </div>

    <p class="result-message">${message}</p>

    <p class="quiz-help">
      ${approved
        ? "Critério atingido: 6 ou mais acertos."
        : "Critério não atingido: é preciso conseguir pelo menos 6 acertos."}
    </p>
  `;

  resultContent.setAttribute("aria-live", "polite");

  return score;
}

// ------------------------------------------------
// 7. REFAZER O QUESTIONÁRIO
// ------------------------------------------------

retryButton.addEventListener("click", () => {
  answers.fill(null);

  questionSlides.forEach(page => {
    page.querySelectorAll(".answer-option").forEach(button => {
      button.classList.remove("selected");
      button.setAttribute("aria-pressed", "false");
    });
  });

  renderResult();
  showSlide(quizStartIndex);
});

// ------------------------------------------------
// 8. VOLTAR AO COMEÇO
// ------------------------------------------------

backToStartButton.addEventListener("click", () => {
  showSlide(0);
});

// ------------------------------------------------
// 9. MODO DE TELA CHEIA
// ------------------------------------------------

fullscreenButton.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error("Não foi possível ativar a tela cheia:", error);
  }
});

document.addEventListener("fullscreenchange", () => {
  fullscreenButton.textContent = document.fullscreenElement
    ? "⛶ Sair da tela cheia"
    : "⛶ Tela cheia";
});

// ------------------------------------------------
// 10. TECLAS DE NAVEGAÇÃO
// ------------------------------------------------

document.addEventListener("keydown", event => {
  const target = event.target;

  if (
    target.matches("input, textarea, select") ||
    target.closest(".quiz-options")
  ) {
    return;
  }

  if (event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    showSlide(currentSlide + 1);
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    showSlide(currentSlide - 1);
  }

  if (
    event.code === "Space" &&
    !target.closest("button") &&
    !event.ctrlKey &&
    !event.altKey
  ) {
    event.preventDefault();
    showSlide(currentSlide + 1);
  }

  if (event.key === "Home") {
    showSlide(0);
  }

  if (event.key === "End") {
    showSlide(slides.length - 1);
  }
});

// ------------------------------------------------
// 11. QUADRO DE TAREFAS INTERATIVO
// ------------------------------------------------

let draggedTask = null;

document.querySelectorAll(".task").forEach(task => {
  task.addEventListener("dragstart", event => {
    draggedTask = task;
    task.classList.add("dragging");

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", task.dataset.status);
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");

    document.querySelectorAll(".board-column").forEach(column => {
      column.classList.remove("drag-over");
    });

    draggedTask = null;
  });
});

document.querySelectorAll(".board-column").forEach(column => {
  column.addEventListener("dragover", event => {
    event.preventDefault();
    column.classList.add("drag-over");
  });

  column.addEventListener("dragleave", event => {
    if (!column.contains(event.relatedTarget)) {
      column.classList.remove("drag-over");
    }
  });

  column.addEventListener("drop", event => {
    event.preventDefault();
    column.classList.remove("drag-over");

    if (!draggedTask) return;

    column.appendChild(draggedTask);
    draggedTask.dataset.status = column.dataset.column;
  });
});

// ------------------------------------------------
// 12. INICIALIZAÇÃO
// ------------------------------------------------

showSlide(0);
