const API_URL = "http://localhost:3000/api/progress/python";
const token = localStorage.getItem("token");

const profileProgressCopyEl = document.getElementById("profile-progress-copy");
const profileProgressFillEl = document.getElementById("profile-progress-fill");
const profileContinueBtn = document.getElementById("profile-continue-btn");

const statCompletedTopicsEl = document.getElementById("stat-completed-topics");
const statInProgressTopicsEl = document.getElementById("stat-in-progress-topics");
const statCompletedBlocksEl = document.getElementById("stat-completed-blocks");

const nextStepCard = document.getElementById("next-step-card");
const nextStepTag = document.getElementById("next-step-tag");
const nextStepTitle = document.getElementById("next-step-title");
const nextStepChip1 = document.getElementById("next-step-chip-1");
const nextStepChip2 = document.getElementById("next-step-chip-2");
const nextStepCta = document.getElementById("next-step-cta");
const nextStepDesc = document.getElementById("next-step-desc");

const pythonRouteState = document.getElementById("python-route-state");
const pythonRouteChipProgress = document.getElementById("python-route-chip-progress");
const pythonRouteCta = document.getElementById("python-route-cta");

const pythonRoute = [
  {
    id: "1",
    title: "Tema 1 · Introducción al lenguaje",
    file: "temas/python/tema-1/index.html",
    chip1: "Python",
    chip2: "Base",
    description: "Qué es Python, variables, tipos, operaciones y primeros programas.",
    requiredTopics: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.quiz", "1.ejercicios"]
  },
  {
    id: "2",
    title: "Tema 2 · Condicionales",
    file: "temas/python/tema-2/index.html",
    chip1: "Python",
    chip2: "Base",
    description: "Condiciones, comparaciones, operadores lógicos y toma de decisiones.",
    requiredTopics: ["2.1", "2.2", "2.3", "2.4", "2.quiz", "2.ejercicios"]
  },
  {
    id: "3",
    title: "Tema 3 · Bucles",
    file: "temas/python/tema-3/index.html",
    chip1: "Python",
    chip2: "Base",
    description: "Repetición con for/while, control con break/continue y ejercicios.",
    requiredTopics: ["3.1", "3.2", "3.3", "3.4", "3.5", "3.quiz", "3.ejercicios"]
  },
  {
    id: "4",
    title: "Tema 4 · Listas",
    file: "temas/python/tema-4/index.html",
    chip1: "Python",
    chip2: "Core",
    description: "Creación de listas, acceso, modificación, recorrido y métodos básicos.",
    requiredTopics: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.quiz", "4.ejercicios"]
  },
  {
    id: "5",
    title: "Tema 5 · Funciones",
    file: "temas/python/tema-5/index.html",
    chip1: "Python",
    chip2: "Core",
    description: "Definición de funciones, parámetros, return, ámbito y reutilización de código.",
    requiredTopics: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.quiz", "5.ejercicios"]
  },
  {
    id: "6",
    title: "Tema 6 · Diccionarios",
    file: "temas/python/tema-6/index.html",
    chip1: "Python",
    chip2: "Core",
    description: "Claves y valores, acceso, modificación, recorrido y métodos útiles.",
    requiredTopics: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.quiz", "6.ejercicios"]
  },
  {
    id: "7",
    title: "Tema 7 · Strings intermedios",
    file: "temas/python/tema-7/index.html",
    chip1: "Python",
    chip2: "Advanced",
    description: "Strings como secuencias, slicing, métodos y análisis de texto.",
    requiredTopics: ["7.1", "7.2", "7.3", "7.4", "7.5", "7.quiz", "7.ejercicios"]
  },
  {
    id: "8",
    title: "Tema 8 · Tuplas y sets",
    file: "temas/python/tema-8/index.html",
    chip1: "Python",
    chip2: "Advanced",
    description: "Tuplas inmutables, sets sin duplicados y elección correcta de estructuras.",
    requiredTopics: ["8.1", "8.2", "8.3", "8.4", "8.5", "8.quiz", "8.ejercicios"]
  },
  {
    id: "9",
    title: "Tema 9 · Manejo de archivos",
    file: "temas/python/tema-9/index.html",
    chip1: "Python",
    chip2: "Advanced",
    description: "Lectura, escritura, modos de apertura y trabajo básico con archivos.",
    requiredTopics: ["9.1", "9.2", "9.3", "9.4", "9.5", "9.quiz", "9.ejercicios"]
  },
  {
    id: "10",
    title: "Tema 10 · Errores y excepciones",
    file: "temas/python/tema-10/index.html",
    chip1: "Python",
    chip2: "Advanced",
    description: "try/except, else/finally, raise, validaciones y control de errores.",
    requiredTopics: ["10.1", "10.2", "10.3", "10.4", "10.5", "10.quiz", "10.ejercicios"]
  }
];

function getThemeProgress(theme, completedTopics) {
  const required = theme.requiredTopics || [];
  const completedCount = required.filter(id => completedTopics.includes(id)).length;

  return {
    total: required.length,
    completedCount,
    started: completedCount > 0,
    completed: required.length > 0 && completedCount === required.length
  };
}

function getNextRecommendedTheme(completedTopics) {
  return pythonRoute.find(theme => !getThemeProgress(theme, completedTopics).completed)
    || pythonRoute[pythonRoute.length - 1];
}

function updateGlobalProgress(completedTopics) {
  const totalThemes = pythonRoute.length;
  const completedThemes = pythonRoute.filter(theme => getThemeProgress(theme, completedTopics).completed).length;
  const inProgressThemes = pythonRoute.filter(theme => {
    const p = getThemeProgress(theme, completedTopics);
    return p.started && !p.completed;
  }).length;

  const totalBlocks = pythonRoute.reduce((acc, theme) => acc + theme.requiredTopics.length, 0);
  const completedBlocks = completedTopics.filter(id => {
    return pythonRoute.some(theme => theme.requiredTopics.includes(id));
  }).length;

  const percent = Math.round((completedThemes / totalThemes) * 100);

  if (profileProgressCopyEl) {
    profileProgressCopyEl.textContent = `${completedThemes}/${totalThemes} temas completados · ${percent}% de ruta`;
  }

  if (profileProgressFillEl) {
    profileProgressFillEl.style.width = `${percent}%`;
  }

  if (statCompletedTopicsEl) {
    statCompletedTopicsEl.textContent = completedThemes;
  }

  if (statInProgressTopicsEl) {
    statInProgressTopicsEl.textContent = inProgressThemes;
  }

  if (statCompletedBlocksEl) {
    statCompletedBlocksEl.textContent = `${completedBlocks}/${totalBlocks}`;
  }

  if (pythonRouteChipProgress) {
    pythonRouteChipProgress.textContent = `${completedThemes}/${totalThemes} temas`;
  }

  if (pythonRouteState) {
    pythonRouteState.textContent =
      completedThemes === totalThemes ? "Completada" :
      completedThemes > 0 || inProgressThemes > 0 ? "En progreso" :
      "Disponible";

    pythonRouteState.className =
      completedThemes === totalThemes
        ? "roadmap-state completed"
        : (completedThemes > 0 || inProgressThemes > 0)
        ? "roadmap-state current"
        : "roadmap-state available";
  }

  if (pythonRouteCta) {
    pythonRouteCta.textContent =
      completedThemes === totalThemes
        ? "Has completado la ruta Python. Puedes repasar cualquier tema."
        : "Consulta el avance completo de la ruta y entra directamente en el siguiente tema recomendado.";
  }
}

function updateNextStep(completedTopics) {
  const nextTheme = getNextRecommendedTheme(completedTopics);
  const progress = getThemeProgress(nextTheme, completedTopics);

  if (nextStepCard) {
    nextStepCard.onclick = () => {
      window.location.href = nextTheme.file;
    };
  }

  if (nextStepTag) {
    nextStepTag.textContent = progress.started ? "Retomar" : "Siguiente paso";
  }

  if (nextStepTitle) {
    nextStepTitle.textContent = nextTheme.title;
  }

  if (nextStepChip1) {
    nextStepChip1.textContent = nextTheme.chip1;
  }

  if (nextStepChip2) {
    nextStepChip2.textContent = `${progress.completedCount}/${progress.total} bloques`;
  }

  if (nextStepCta) {
    nextStepCta.textContent =
      progress.started
        ? "Este es el siguiente tema pendiente de completar según tu progreso actual."
        : "Este es el siguiente tema recomendado para avanzar en la ruta.";
  }

  if (nextStepDesc) {
    nextStepDesc.textContent = nextTheme.description;
  }

  if (profileContinueBtn) {
    profileContinueBtn.href = nextTheme.file;
    profileContinueBtn.textContent =
      progress.started
        ? `Retomar Tema ${nextTheme.id}`
        : `Continuar con Tema ${nextTheme.id}`;
  }
}

async function loadProfileProgress() {
  try {
    if (!token) {
      updateGlobalProgress([]);
      updateNextStep([]);
      return;
    }

    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) {
      updateGlobalProgress([]);
      updateNextStep([]);
      return;
    }

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    const completedTopics = data?.progress?.completedTopics || [];

    updateGlobalProgress(completedTopics);
    updateNextStep(completedTopics);
  } catch (error) {
    console.error("Error cargando progreso del perfil:", error);
    updateGlobalProgress([]);
    updateNextStep([]);
  }
}

loadProfileProgress();