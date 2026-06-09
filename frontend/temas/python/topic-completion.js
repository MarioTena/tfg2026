(() => {
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

function saveLastTopicActivity(topicId) {
  try {
    const themeId = extractThemeId(topicId);
    if (!themeId || !topicId) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id || user?._id;

    if (!userId) return;

    localStorage.setItem(
      `lastPythonTopicActivity:${userId}`,
      JSON.stringify({
        topicId,
        themeId,
        updatedAt: Date.now()
      })
    );
  } catch {}
}

function getLoginPath() {
  const path = window.location.pathname;

  if (path.includes("/temas/python/")) {
    return "../../../login.html";
  }

  if (path.includes("/playground/")) {
    return "../login.html";
  }

  return "./login.html";
}

function clearSessionAndRedirect(message = "Tu sesión ya no es válida. Vuelve a iniciar sesión.") {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.setItem("session-message", message);
  window.location.href = getLoginPath();
}

async function readJsonSafely(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function isAuthError(status, data) {
  const errorText = String(data?.error || "").toLowerCase();

  return (
    status === 401 ||
    status === 403 ||
    errorText.includes("token") ||
    errorText.includes("usuario no existe") ||
    errorText.includes("usuario no encontrado") ||
    errorText.includes("sesión")
  );
}

function getReadableError(status, data, fallbackMessage) {
  if (status === 400) {
    return data?.error || "La petición no es válida.";
  }

  if (status === 404) {
    return data?.error || "No se ha encontrado la información solicitada.";
  }

  if (status >= 500) {
    return "Ha ocurrido un error en el servidor. Inténtalo de nuevo más tarde.";
  }

  return data?.error || data?.message || fallbackMessage;
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
      clearSessionAndRedirect("Debes iniciar sesión para continuar.");
      return [];
    }

    const res = await fetch(PROGRESS_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await readJsonSafely(res);

    if (!res.ok) {
      if (isAuthError(res.status, data)) {
        clearSessionAndRedirect(
          "Tu sesión ha caducado o el usuario ya no existe. Vuelve a iniciar sesión."
        );
        return [];
      }

      throw new Error(
        getReadableError(
          res.status,
          data,
          "No se ha podido consultar tu progreso."
        )
      );
    }

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
      clearSessionAndRedirect("Debes iniciar sesión para guardar el progreso.");
      return false;
    }

    const res = await fetch(PROGRESS_COMPLETE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ topic: topicId })
    });

    const data = await readJsonSafely(res);

    if (!res.ok) {
      if (isAuthError(res.status, data)) {
        clearSessionAndRedirect(
          "Tu sesión ha caducado o el usuario ya no existe. Vuelve a iniciar sesión."
        );
        return false;
      }

      throw new Error(
        getReadableError(
          res.status,
          data,
          "No se ha podido guardar el progreso."
        )
      );
    }

    saveLastThemeFromTopic(topicId);
    saveLastTopicActivity(topicId);

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
window.initTopicCompletion = initTopicCompletion;
})();