const API_URL = "http://localhost:3000/api/progress/python";
const token = localStorage.getItem("token");

const progressCopyEl = document.getElementById("python-route-progress-copy");
const progressFillEl = document.getElementById("python-route-progress-fill");
const continueBtn = document.getElementById("python-continue-btn");
const routeMapEl = document.getElementById("python-route-map");

const LAST_THEME_STORAGE_KEY = "lastPythonTheme";

const routeTopics = [
  {
    id: "1",
    title: "Introducción al lenguaje",
    file: "./tema-1/index.html",
    chip1: "Base",
    chip2: "Primeros pasos",
    description: "Qué es Python, variables, tipos, operaciones, mini-retos, checkpoint y primeros ejercicios.",
    requiredTopics: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.quiz", "1.ejercicios"]
  },
  {
    id: "2",
    title: "Condicionales",
    file: "./tema-2/index.html",
    chip1: "Base",
    chip2: "if / else",
    description: "Condiciones, comparaciones, operadores lógicos y toma de decisiones.",
    requiredTopics: ["2.1", "2.2", "2.3", "2.4", "2.quiz", "2.ejercicios"]
  },
  {
    id: "3",
    title: "Bucles",
    file: "./tema-3/index.html",
    chip1: "Base",
    chip2: "for / while",
    description: "Repetición con for/while, control con break/continue y ejercicios.",
    requiredTopics: ["3.1", "3.2", "3.3", "3.4", "3.5", "3.quiz", "3.ejercicios"]
  },
  {
    id: "4",
    title: "Listas",
    file: "./tema-4/index.html",
    chip1: "Core",
    chip2: "Práctica",
    description: "Creación de listas, acceso, modificación, recorrido y métodos básicos.",
    requiredTopics: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.quiz", "4.ejercicios"]
  },
  {
    id: "5",
    title: "Funciones",
    file: "./tema-5/index.html",
    chip1: "Core",
    chip2: "return",
    description: "Definición de funciones, parámetros, return, ámbito y reutilización de código.",
    requiredTopics: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.quiz", "5.ejercicios"]
  },
  {
    id: "6",
    title: "Diccionarios",
    file: "./tema-6/index.html",
    chip1: "Core",
    chip2: "Datos",
    description: "Claves y valores, acceso, modificación, recorrido y métodos útiles.",
    requiredTopics: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.quiz", "6.ejercicios"]
  },
  {
    id: "7",
    title: "Strings",
    file: "./tema-7/index.html",
    chip1: "Advanced",
    chip2: "Métodos",
    description: "Strings como secuencias, slicing, métodos y análisis de texto.",
    requiredTopics: ["7.1", "7.2", "7.3", "7.4", "7.5", "7.quiz", "7.ejercicios"]
  },
  {
    id: "8",
    title: "Tuplas y sets",
    file: "./tema-8/index.html",
    chip1: "Advanced",
    chip2: "Comparación",
    description: "Tuplas inmutables, sets sin duplicados y elección correcta de estructuras.",
    requiredTopics: ["8.1", "8.2", "8.3", "8.4", "8.5", "8.quiz", "8.ejercicios"]
  },
  {
    id: "9",
    title: "Manejo de archivos",
    file: "./tema-9/index.html",
    chip1: "Advanced",
    chip2: "Lectura / escritura",
    description: "Lectura, escritura, modos de apertura y trabajo básico con archivos.",
    requiredTopics: ["9.1", "9.2", "9.3", "9.4", "9.5", "9.quiz", "9.ejercicios"]
  },
  {
    id: "10",
    title: "Errores y excepciones",
    file: "./tema-10/index.html",
    chip1: "Advanced",
    chip2: "try / except",
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

function getStoredLastThemeId() {
  const value = localStorage.getItem(LAST_THEME_STORAGE_KEY);
  return value || null;
}

function setStoredLastThemeId(themeId) {
  if (!themeId) return;
  localStorage.setItem(LAST_THEME_STORAGE_KEY, String(themeId));
}

function getFirstNotCompletedTheme(completedTopics) {
  return routeTopics.find(theme => !getThemeProgress(theme, completedTopics).completed)
    || routeTopics[routeTopics.length - 1];
}

function getNextRecommendedTheme(completedTopics) {
  const lastThemeId = getStoredLastThemeId();

  if (lastThemeId) {
    const lastTheme = routeTopics.find(theme => theme.id === lastThemeId);

    if (lastTheme) {
      const progress = getThemeProgress(lastTheme, completedTopics);

      if (!progress.completed) {
        return lastTheme;
      }
    }
  }

  return getFirstNotCompletedTheme(completedTopics);
}

function renderRoute(completedTopics) {
  routeMapEl.innerHTML = "";

  const nextRecommended = getNextRecommendedTheme(completedTopics);

  routeTopics.forEach(theme => {
    const progress = getThemeProgress(theme, completedTopics);
    const state = progress.completed ? "completed" : (nextRecommended.id === theme.id ? "current" : "available");

    const stateLabel =
      state === "completed" ? "Completado" :
      state === "current" ? "Sigue aquí" :
      progress.started ? "En progreso" : "Disponible";

    const progressText = `${progress.completedCount}/${progress.total} bloques`;

    const card = document.createElement("article");
    card.className = `roadmap-card ${state}`;

    card.innerHTML = `
      <div class="roadmap-top">
        <span class="mission-tag">Tema ${theme.id}</span>
        <span class="roadmap-state ${state}">${stateLabel}</span>
      </div>

      <h3>${theme.title}</h3>

      <div class="topic-meta">
        <span class="topic-chip">${theme.chip1}</span>
        <span class="topic-chip">${theme.chip2}</span>
        <span class="topic-chip">${progressText}</span>
      </div>

      <p class="roadmap-cta">
        ${
          state === "completed"
            ? "Tema completado · puedes repasarlo"
            : state === "current"
            ? "Este es tu siguiente tema recomendado"
            : progress.started
            ? "Ya has empezado este tema"
            : "Disponible para entrar directamente"
        }
      </p>

      <p class="roadmap-desc">${theme.description}</p>
    `;

    card.addEventListener("click", () => {
      setStoredLastThemeId(theme.id);
      window.location.href = theme.file;
    });

    routeMapEl.appendChild(card);
  });
}

function updateRouteHeader(completedTopics) {
  const total = routeTopics.length;
  const done = routeTopics.filter(theme => getThemeProgress(theme, completedTopics).completed).length;
  const percent = Math.round((done / total) * 100);

  if (progressCopyEl) {
    progressCopyEl.textContent = `${done}/${total} temas completados · ${percent}% de la ruta`;
  }

  if (progressFillEl) {
    progressFillEl.style.width = `${percent}%`;
  }

  if (continueBtn) {
    const nextTheme = getNextRecommendedTheme(completedTopics);
    continueBtn.href = nextTheme.file;
    continueBtn.textContent = done === total ? "Revisar ruta" : `Continuar con Tema ${nextTheme.id}`;

    continueBtn.addEventListener("click", () => {
      setStoredLastThemeId(nextTheme.id);
    });
  }
}

async function loadRouteProgress() {
  try {
    if (!token) {
      renderRoute([]);
      updateRouteHeader([]);
      return;
    }

    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) {
      renderRoute([]);
      updateRouteHeader([]);
      return;
    }

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    const completedTopics = data?.progress?.completedTopics || [];

    renderRoute(completedTopics);
    updateRouteHeader(completedTopics);
  } catch (error) {
    console.error("Error cargando progreso de la ruta:", error);
    renderRoute([]);
    updateRouteHeader([]);
  }
}

loadRouteProgress();