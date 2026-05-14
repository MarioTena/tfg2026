const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "http://localhost:3000";
const API_ONBOARDING_URL = `${API_BASE_URL}/api/auth/onboarding`;

const startBtn = document.getElementById("start-btn");
const statusMsg = document.getElementById("status-msg");

function showStatus(message, isError = true) {
  if (!statusMsg) return;

  statusMsg.textContent = message;
  statusMsg.style.display = message ? "block" : "none";
  statusMsg.classList.toggle("status-success", !isError && !!message);
  statusMsg.classList.toggle("status-error", !!isError);
}

async function completeOnboarding() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  showStatus("", true);
  startBtn.disabled = true;
  startBtn.textContent = "Entrando...";

  try {
    const res = await fetch(API_ONBOARDING_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      throw new Error(data?.error || "No se pudo completar la bienvenida.");
    }

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    setTimeout(() => {
      window.location.href = "menu.html";
    }, 600);
  } catch (error) {
    console.error(error);
    showStatus(error.message || "No se pudo completar la bienvenida.");
  } finally {
    startBtn.disabled = false;
    startBtn.textContent = "Entendido, empezar";
  }
}

startBtn?.addEventListener("click", completeOnboarding);