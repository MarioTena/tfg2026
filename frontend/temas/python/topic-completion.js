const PROGRESS_API_URL = "http://localhost:3000/api/progress/python";
const PROGRESS_COMPLETE_URL = "http://localhost:3000/api/progress/python/complete";

function initTopicCompletion({
  topicId,
  nextUrl,
  nextBtnId = "nextBtn",
  successMessage = "Tema completado 🎉"
}) {
  const nextBtn = document.getElementById(nextBtnId);

  async function unlockNextIfCompleted() {
    try {
      const token = localStorage.getItem("token");

      if (!token || !nextBtn) return;

      const res = await fetch(PROGRESS_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) return;

      const data = await res.json();
      const completed = data?.progress?.completedTopics || [];

      if (completed.includes(topicId)) {
        nextBtn.classList.remove("btn-disabled");
        nextBtn.href = nextUrl;
      }
    } catch (error) {
      console.error("Error comprobando progreso:", error);
    }
  }

  async function completeTopic() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Debes iniciar sesión para guardar el progreso");
        return;
      }

      const res = await fetch(PROGRESS_COMPLETE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ topic: topicId })
      });

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      alert(successMessage);

      if (nextBtn) {
        nextBtn.classList.remove("btn-disabled");
        nextBtn.href = nextUrl;
      }
    } catch (error) {
      console.error("Error marcando tema como completado:", error);
      alert("No se pudo guardar el progreso");
    }
  }

  unlockNextIfCompleted();

  return {
    completeTopic
  };
}