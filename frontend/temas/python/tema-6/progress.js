const API_URL = "http://localhost:3000/api/progress/python";
const token = localStorage.getItem("token");

const topicsContainer = document.getElementById("topics");

const topics = [
  { id: "6.1", title: "¿Qué es un diccionario?", file: "01-que-es-un-diccionario.html" },
  { id: "6.2", title: "Acceso y modificación", file: "02-acceso-y-modificacion.html" },
  { id: "6.3", title: "Recorrer diccionarios", file: "03-recorrer-diccionarios.html" },
  { id: "6.4", title: "Métodos y buenas prácticas", file: "04-metodos-y-buenas-practicas.html" },
  { id: "6.5", title: "Mini retos", file: "05-mini-retos.html" },
  { id: "6.ejercicios", title: "Ejercicios del tema 6", file: "py-tema6-ejercicios.html" }
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
