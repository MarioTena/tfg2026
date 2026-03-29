const API_URL = "http://localhost:3000/api/progress/python";
const token = localStorage.getItem("token");

const topicsContainer = document.getElementById("topics");

const topics = [
  { id: "3.1", title: "¿Qué es un bucle?", file: "01-que-es-un-bucle.html" },
  { id: "3.2", title: "Bucle for", file: "02-for.html" },
  { id: "3.3", title: "Bucle while", file: "03-while.html" },
  { id: "3.4", title: "break y continue", file: "04-break-continue.html" },
  { id: "3.5", title: "Mini retos", file: "05-mini-retos.html" },
  { id: "3.ejercicios", title: "Ejercicios del tema 3", file: "py-tema3-ejercicios.html" }
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