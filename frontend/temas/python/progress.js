const API_URL = "http://localhost:3000/api/progress/python";
const token = localStorage.getItem("token");

const topicsContainer = document.getElementById("topics");

const topics = [
  { id: "1.1", title: "¿Qué es Python?", file: "01-que-es-python.html" },
  { id: "1.2", title: "Primer programa", file: "02-primer-programa.html" },
  { id: "1.3", title: "Variables y tipos de datos", file: "03-variables-y-tipos-de-datos.html" },
  { id: "1.4", title: "Operaciones", file: "04-operaciones.html" },
  { id: "1.5", title: "Strings", file: "05-strings.html" },
  { id: "1.6", title: "Errores", file: "06-errores.html" },
  { id: "1.7", title: "Mini proyecto", file: "07-mini-proyecto.html" }
];

async function loadProgress() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  const completed = data.progress.completedTopics || [];

  renderTopics(completed);
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
