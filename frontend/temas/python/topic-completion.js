const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "http://localhost:3000";
const PROGRESS_API_URL = `${API_BASE_URL}/api/progress/python`;
const PROGRESS_COMPLETE_URL = `${API_BASE_URL}/api/progress/python/complete`;

function extractThemeId(topicId) {
  if (!topicId) return null;

  const normalized = String(topicId).trim();
  if (!normalized) return null;

  const match = normalized.match(/^(\d+)/);
  return match ? match[1] : null;
}

function saveLastThemeFromTopic(topicId) {
  const themeId = extractThemeId(topicId);
  if (!themeId) return;

  if (typeof setLastPythonThemeForCurrentUser === "function") {
    setLastPythonThemeForCurrentUser(themeId);
  }
}

function initTopicCompletion({
  topicId,
  nextUrl = null,
  nextBtnId = "nextBtn"
}) {
  const nextBtn = document.getElementById(nextBtnId);

  async function getCompletedTopics() {
    const token = localStorage.getItem("token");

    if (!token) {
      return [];
    }

    const res = await fetch(PROGRESS_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    return data?.progress?.completedTopics || [];
  }

  async function isCompleted() {
    const completedTopics = await getCompletedTopics();
    return completedTopics.includes(topicId);
  }

  async function unlockNextIfCompleted() {
    try {
      if (!nextBtn || !nextUrl) return false;

      const completed = await isCompleted();

      if (completed) {
        nextBtn.classList.remove("btn-disabled");
        nextBtn.href = nextUrl;
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error comprobando progreso:", error);
      return false;
    }
  }

  async function completeTopic() {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Debes iniciar sesión para guardar el progreso");
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

    saveLastThemeFromTopic(topicId);

    if (nextBtn && nextUrl) {
      nextBtn.classList.remove("btn-disabled");
      nextBtn.href = nextUrl;
    }

    return true;
  }

  if (nextBtn && nextUrl) {
    unlockNextIfCompleted();
  }

  return {
    completeTopic,
    unlockNextIfCompleted,
    isCompleted,
    getCompletedTopics
  };
}