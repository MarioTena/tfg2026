const API_URL = "http://localhost:3000/api/progress/python";
const token = localStorage.getItem("token");

const topicsContainer = document.getElementById("topics");

const topics = [
  { id: "2.1", title: "Condicionales", file: "01-condicionales.html" },
  { id: "2.2", title: "Comparaciones y booleanos", file: "02-comparaciones-booleanos.html" },
  { id: "2.3", title: "Operadores lógicos", file: "03-operadores-logicos.html" },
  { id: "2.4", title: "Mini reto", file: "04-mini-reto.html" },
  { id: "2.ejercicios", title: "Ejercicios del tema 2", file: "py-tema2-ejercicios.html" }
];

async function loadProgress() {
  try {
    if (!token) {
      renderTopics([]);
      return;
    }

    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) {
      renderTopics([]);
      return;
    }

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    const completed = data?.progress?.completedTopics || [];

    renderTopics(completed);
  } catch (error) {
    console.error("Error cargando progreso:", error);
    renderTopics([]);
  }
}

function renderTopics(completed) {
  topicsContainer.innerHTML = "";

  topics.forEach((topic, index) => {
    let state = "locked";

    if (completed.includes(topic.id)) {
      state = "completed";
    } else if (
      index === 0 ||
      completed.includes(topics[index - 1].id)
    ) {
      state = "available";
    }

    const card = document.createElement("div");
    card.className = `topic-card ${state}`;

    card.innerHTML = `
      <h3>${topic.id} · ${topic.title}</h3>
      ${state === "completed" ? "<p>✓ Completado</p>" : ""}
      ${state === "locked" ? "<p>🔒 Bloqueado</p>" : ""}
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