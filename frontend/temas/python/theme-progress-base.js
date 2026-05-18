const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "http://localhost:3000";
const API_URL = `${API_BASE_URL}/api/progress/python`;
const token = localStorage.getItem("token");

function initThemeProgress(config) {
  const topics = config.topics || [];

  const topicsContainer = document.getElementById("topics");
  const progressCopyEl = document.getElementById("topic-progress-copy");
  const progressFillEl = document.getElementById("topic-progress-fill");
  const continueBtn = document.getElementById("continue-btn");

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

    const firstPending = topics.find(t => !completed.includes(t.id));
    if (firstPending && firstPending.id === topic.id) return "current";

    if (index === 0 || completed.includes(topics[index - 1].id)) return "available";
    return "locked";
  }

  function getNextAvailableTopic(completed) {
    const firstPending = topics.find(t => !completed.includes(t.id));
    return firstPending || topics[topics.length - 1];
  }

  function updateHeaderProgress(completed) {
    const total = topics.length;
    const done = topics.filter(topic => completed.includes(topic.id)).length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;

    if (progressCopyEl) {
      progressCopyEl.textContent = `${done}/${total} bloques completados · ${percent}% del tema`;
    }

    if (progressFillEl) {
      progressFillEl.style.width = `${percent}%`;
    }

    if (continueBtn) {
      if (done === total && total > 0) {
        continueBtn.href = config.nextTheme?.href || "../index.html";
        continueBtn.textContent = config.nextTheme?.label || "Volver a la ruta Python";
      } else {
        const nextTopic = getNextAvailableTopic(completed);
        if (nextTopic) {
          continueBtn.href = `./${nextTopic.file}`;
          continueBtn.textContent = `Continuar con ${nextTopic.id}`;
        }
      }
    }
  }

  function renderTopics(completed) {
    if (!topicsContainer) return;

    topicsContainer.innerHTML = "";

    topics.forEach((topic, index) => {
      const state = getTopicState(topic, index, completed);

      const card = document.createElement("article");
      card.className = `roadmap-card ${state}`;

      const stateLabel =
        state === "completed"
          ? "Completado"
          : state === "current"
          ? "Sigue aquí"
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
          <span class="topic-chip">${topic.type || "Concepto"}</span>
          <span class="topic-chip">${topic.time || "-"}</span>
        </div>

        <p class="roadmap-cta">
          ${
            state === "completed"
              ? "Repasar bloque"
              : state === "current"
              ? "Este es tu siguiente bloque recomendado"
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
}