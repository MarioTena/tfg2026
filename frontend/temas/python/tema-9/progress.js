const API_URL = "http://localhost:3000/api/progress/python";
const token = localStorage.getItem("token");

const topicsContainer = document.getElementById("topics");

const topics = [
  { id: "9.1", title: "¿Qué es un archivo?", file: "01-que-es-un-archivo.html" },
  { id: "9.2", title: "Leer archivos", file: "02-leer-archivos.html" },
  { id: "9.3", title: "Escribir archivos", file: "03-escribir-archivos.html" },
  { id: "9.4", title: "Buenas prácticas y errores", file: "04-buenas-practicas-y-errores.html" },
  { id: "9.5", title: "Mini retos", file: "05-mini-retos.html" },
  { id: "9.ejercicios", title: "Ejercicios del tema 9", file: "py-tema9-ejercicios.html" }
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
    } else if (index === 0 || completed.includes(topics[index - 1].id)) {
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
