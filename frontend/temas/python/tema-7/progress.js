const API_URL = "http://localhost:3000/api/progress/python";
const token = localStorage.getItem("token");

const topicsContainer = document.getElementById("topics");

const topics = [
  { id: "7.1", title: "Strings como secuencias", file: "01-strings-como-secuencias.html" },
  { id: "7.2", title: "Indexación y slicing", file: "02-indexacion-y-slicing.html" },
  { id: "7.3", title: "Métodos de strings", file: "03-metodos-de-strings.html" },
  { id: "7.4", title: "Recorrer y analizar texto", file: "04-recorrer-y-analizar-texto.html" },
  { id: "7.5", title: "Mini retos", file: "05-mini-retos.html" },
  { id: "7.ejercicios", title: "Ejercicios del tema 7", file: "py-tema7-ejercicios.html" }
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
