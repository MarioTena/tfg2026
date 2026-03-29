const API_URL = "http://localhost:3000/api/progress/python";
const token = localStorage.getItem("token");

const topicsContainer = document.getElementById("topics");
const progressCopyEl = document.getElementById("topic-progress-copy");
const progressFillEl = document.getElementById("topic-progress-fill");
const continueBtn = document.getElementById("continue-btn");

const topics = [
  {
    id: "4.1",
    title: "¿Qué es una lista?",
    file: "01-que-es-una-lista.html",
    type: "Concepto",
    time: "10 min"
  },
  {
    id: "4.2",
    title: "Acceso y modificación",
    file: "02-acceso-y-modificacion.html",
    type: "Concepto",
    time: "10 min"
  },
  {
    id: "4.3",
    title: "Recorrer listas",
    file: "03-recorrer-listas.html",
    type: "Concepto",
    time: "12 min"
  },
  {
    id: "4.4",
    title: "Métodos de listas",
    file: "04-metodos-listas.html",
    type: "Concepto",
    time: "10 min"
  },
  {
    id: "4.5",
    title: "Mini retos",
    file: "05-mini-retos.html",
    type: "Práctica",
    time: "12 min"
  },
  {
    id: "4.ejercicios",
    title: "Ejercicios del tema 4",
    file: "py-tema4-ejercicios.html",
    type: "Reto final",
    time: "20 min"
  }
];

async function loadProgress() {
  try {
    if (!token) {
      renderTopics([]);
      updateHeaderProgress([]);
      return;
    }

    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) {
      renderTopics([]);
      updateHeaderProgress([]);
      return;
    }

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    const completed = data?.progress?.completedTopics || [];

    renderTopics(completed);
    updateHeaderProgress(completed);
  } catch (error) {
    console.error("Error cargando progreso:", error);
    renderTopics([]);
    updateHeaderProgress([]);
  }
}

function getTopicState(topic, index, completed) {
  if (completed.includes(topic.id)) return "completed";
  if (index === 0 || completed.includes(topics[index - 1].id)) return "available";
  return "locked";
}

function getNextAvailableTopic(completed) {
  for (let i = 0; i < topics.length; i++) {
    const state = getTopicState(topics[i], i, completed);
    if (state === "available") return topics[i];
  }

  return topics[topics.length - 1];
}

function updateHeaderProgress(completed) {
  const total = topics.length;
  const done = topics.filter(topic => completed.includes(topic.id)).length;
  const percent = Math.round((done / total) * 100);

  if (progressCopyEl) {
    progressCopyEl.textContent = `${done}/${total} bloques completados · ${percent}% del tema`;
  }

  if (progressFillEl) {
    progressFillEl.style.width = `${percent}%`;
  }

  if (continueBtn) {
    const nextTopic = getNextAvailableTopic(completed);
    if (nextTopic) {
      continueBtn.href = `./${nextTopic.file}`;
      continueBtn.textContent = done === total ? "Revisar tema" : `Continuar con ${nextTopic.id}`;
    }
  }
}

function renderTopics(completed) {
  topicsContainer.innerHTML = "";

  topics.forEach((topic, index) => {
    const state = getTopicState(topic, index, completed);

    const card = document.createElement("article");
    card.className = `roadmap-card ${state}`;

    const stateLabel =
      state === "completed"
        ? "Completado"
        : state === "available"
        ? "Disponible"
        : "Bloqueado";

    card.innerHTML = `
      <div class="roadmap-top">
        <span class="mission-tag">${topic.id}</span>
        <span class="roadmap-state ${state}">${stateLabel}</span>
      </div>

      <h3>${topic.title}</h3>

      <div class="topic-meta">
        <span class="topic-chip">${topic.type}</span>
        <span class="topic-chip">${topic.time}</span>
      </div>

      <p class="roadmap-cta">
        ${
          state === "completed"
            ? "Repasar bloque"
            : state === "available"
            ? "Entrar ahora"
            : "Se desbloquea al completar el anterior"
        }
      </p>
    `;

    if (state !== "locked") {
      card.addEventListener("click", () => {
        window.location.href = `./${topic.file}`;
      });
    }

    topicsContainer.appendChild(card);
  });
}

loadProgress();