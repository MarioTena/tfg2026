const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "http://localhost:3000";
const API_URL = `${API_BASE_URL}/api/progress/python`;
const token = localStorage.getItem("token");

const LAST_THEME_STORAGE_KEY_PREFIX = "lastPythonTheme";

const menuProgressCopyEl = document.getElementById("menu-progress-copy");
const menuProgressFillEl = document.getElementById("menu-progress-fill");
const continueLearningBtn = document.getElementById("continue-learning-btn");

const recommendedCard = document.getElementById("recommended-card");
const recommendedTag = document.getElementById("recommended-tag");
const recommendedTitle = document.getElementById("recommended-title");
const recommendedChip1 = document.getElementById("recommended-chip-1");
const recommendedChip2 = document.getElementById("recommended-chip-2");
const recommendedCta = document.getElementById("recommended-cta");

const welcomeUserCopyEl = document.getElementById("welcome-user-copy");

const pythonRoute = [
  {
    id: "1",
    title: "Tema 1 · Introducción al lenguaje",
    file: "temas/python/tema-1/index.html",
    chip1: "Python",
    chip2: "Base",
    requiredTopics: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.quiz", "1.ejercicios"]
  },
  {
    id: "2",
    title: "Tema 2 · Condicionales",
    file: "temas/python/tema-2/index.html",
    chip1: "Python",
    chip2: "Base",
    requiredTopics: ["2.1", "2.2", "2.3", "2.4", "2.quiz", "2.ejercicios"]
  },
  {
    id: "3",
    title: "Tema 3 · Bucles",
    file: "temas/python/tema-3/index.html",
    chip1: "Python",
    chip2: "Base",
    requiredTopics: ["3.1", "3.2", "3.3", "3.4", "3.5", "3.quiz", "3.ejercicios"]
  },
  {
    id: "4",
    title: "Tema 4 · Listas",
    file: "temas/python/tema-4/index.html",
    chip1: "Python",
    chip2: "Core",
    requiredTopics: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.quiz", "4.ejercicios"]
  },
  {
    id: "5",
    title: "Tema 5 · Funciones",
    file: "temas/python/tema-5/index.html",
    chip1: "Python",
    chip2: "Core",
    requiredTopics: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.quiz", "5.ejercicios"]
  },
  {
    id: "6",
    title: "Tema 6 · Diccionarios",
    file: "temas/python/tema-6/index.html",
    chip1: "Python",
    chip2: "Core",
    requiredTopics: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.quiz", "6.ejercicios"]
  },
  {
    id: "7",
    title: "Tema 7 · Strings intermedios",
    file: "temas/python/tema-7/index.html",
    chip1: "Python",
    chip2: "Advanced",
    requiredTopics: ["7.1", "7.2", "7.3", "7.4", "7.5", "7.quiz", "7.ejercicios"]
  },
  {
    id: "8",
    title: "Tema 8 · Tuplas y sets",
    file: "temas/python/tema-8/index.html",
    chip1: "Python",
    chip2: "Advanced",
    requiredTopics: ["8.1", "8.2", "8.3", "8.4", "8.5", "8.quiz", "8.ejercicios"]
  },
  {
    id: "9",
    title: "Tema 9 · Manejo de archivos",
    file: "temas/python/tema-9/index.html",
    chip1: "Python",
    chip2: "Advanced",
    requiredTopics: ["9.1", "9.2", "9.3", "9.4", "9.5", "9.quiz", "9.ejercicios"]
  },
  {
    id: "10",
    title: "Tema 10 · Errores y excepciones",
    file: "temas/python/tema-10/index.html",
    chip1: "Python",
    chip2: "Advanced",
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

function getCurrentUserId() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.id ? String(user.id) : null;
  } catch {
    return null;
  }
}

function getStoredLastThemeId() {
  const userId = getCurrentUserId();
  if (!userId) return null;

  return localStorage.getItem(`${LAST_THEME_STORAGE_KEY_PREFIX}:${userId}`) || null;
}

function setStoredLastThemeId(themeId) {
  if (!themeId) return;

  const userId = getCurrentUserId();
  if (!userId) return;

  localStorage.setItem(`${LAST_THEME_STORAGE_KEY_PREFIX}:${userId}`, String(themeId));
}

function getFirstNotCompletedTheme(completedTopics) {
  return pythonRoute.find(theme => !getThemeProgress(theme, completedTopics).completed)
    || pythonRoute[pythonRoute.length - 1];
}

function getNextRecommendedTheme(completedTopics) {
  const lastThemeId = getStoredLastThemeId();

  if (lastThemeId) {
    const lastTheme = pythonRoute.find(theme => theme.id === lastThemeId);

    if (lastTheme) {
      const progress = getThemeProgress(lastTheme, completedTopics);

      if (!progress.completed) {
        return lastTheme;
      }
    }
  }

  return getFirstNotCompletedTheme(completedTopics);
}

function updateWelcomeUser() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const name = (user?.name || "").trim();

    if (!welcomeUserCopyEl) return;

    if (name) {
      welcomeUserCopyEl.textContent = `Bienvenida, ${name}. Aquí tienes tu punto de continuación recomendado.`;
    } else {
      welcomeUserCopyEl.textContent = "Aquí tienes tu punto de continuación recomendado.";
    }
  } catch {
    if (welcomeUserCopyEl) {
      welcomeUserCopyEl.textContent = "Aquí tienes tu punto de continuación recomendado.";
    }
  }
}

function updateMenuProgress(completedTopics) {
  const total = pythonRoute.length;
  const done = pythonRoute.filter(theme => getThemeProgress(theme, completedTopics).completed).length;
  const percent = Math.round((done / total) * 100);

  if (menuProgressCopyEl) {
    menuProgressCopyEl.textContent = `${done}/${total} temas completados en Python · ${percent}% de ruta`;
  }

  if (menuProgressFillEl) {
    menuProgressFillEl.style.width = `${percent}%`;
  }
}

function isPythonRouteCompleted(completedTopics) {
  return pythonRoute.every(theme => getThemeProgress(theme, completedTopics).completed);
}

function updateCompletedRouteBlock() {
  if (menuProgressCopyEl) {
    menuProgressCopyEl.textContent = `Ruta Python completada · ${pythonRoute.length}/${pythonRoute.length} temas`;
  }

  if (menuProgressFillEl) {
    menuProgressFillEl.style.width = "100%";
  }

  if (recommendedCard) {
    recommendedCard.classList.remove("current");
    recommendedCard.classList.add("completed");
    recommendedCard.onclick = () => {
      window.location.href = "temas/python/index.html";
    };
  }

  if (recommendedTag) {
    recommendedTag.textContent = "Ruta completada";
  }

  if (recommendedTitle) {
    recommendedTitle.textContent = "Has completado todos los temas de Python";
  }

  if (recommendedChip1) {
    recommendedChip1.textContent = `${pythonRoute.length}/${pythonRoute.length} temas`;
  }

  if (recommendedChip2) {
    recommendedChip2.textContent = "Completado";
  }

  if (recommendedCta) {
    recommendedCta.textContent =
      "Puedes repasar la ruta, volver a los ejercicios, resolver retos acumulativos o practicar proyectos finales.";
  }

  if (continueLearningBtn) {
    continueLearningBtn.href = "temas/python/index.html";
    continueLearningBtn.textContent = "Repasar ruta Python";
    continueLearningBtn.onclick = null;
  }
}

function updateRecommendedBlock(nextTheme, completedTopics) {
  if (!nextTheme) return;

  const progress = getThemeProgress(nextTheme, completedTopics);

  if (recommendedCard) {
    recommendedCard.onclick = () => {
      setStoredLastThemeId(nextTheme.id);
      window.location.href = nextTheme.file;
    };
  }

  if (recommendedTag) {
    recommendedTag.textContent = progress.started ? "Retomar" : "Empieza aquí";
  }

  if (recommendedTitle) {
    recommendedTitle.textContent = nextTheme.title;
  }

  if (recommendedChip1) {
    recommendedChip1.textContent = nextTheme.chip1;
  }

  if (recommendedChip2) {
    recommendedChip2.textContent = `${progress.completedCount}/${progress.total} bloques`;
  }

  if (recommendedCta) {
    recommendedCta.textContent =
      progress.started
        ? "Este es el tema que tienes actualmente en curso según tu actividad reciente."
        : "Este es el siguiente tema recomendado para avanzar en tu ruta.";
  }

  if (continueLearningBtn) {
    continueLearningBtn.href = nextTheme.file;
    continueLearningBtn.textContent =
      progress.started
        ? `Retomar Tema ${nextTheme.id}`
        : `Continuar con Tema ${nextTheme.id}`;

    continueLearningBtn.onclick = () => {
      setStoredLastThemeId(nextTheme.id);
    };
  }
}

async function loadMenuProgress() {
  try {
    if (!token) {
      updateWelcomeUser();
      updateMenuProgress([]);
      updateRecommendedBlock(pythonRoute[0], []);
      return;
    }

    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) {
      updateWelcomeUser();
      updateMenuProgress([]);
      updateRecommendedBlock(pythonRoute[0], []);
      return;
    }

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    const completedTopics = data?.progress?.completedTopics || [];

    updateWelcomeUser();
    updateMenuProgress(completedTopics);

    if (isPythonRouteCompleted(completedTopics)) {
      updateCompletedRouteBlock();
      return;
    }

    const nextTheme = getNextRecommendedTheme(completedTopics);
    updateRecommendedBlock(nextTheme, completedTopics);
  } catch (error) {
    console.error("Error cargando progreso del menú:", error);
    updateWelcomeUser();
    updateMenuProgress([]);
    updateRecommendedBlock(pythonRoute[0], []);
  }
}

loadMenuProgress();