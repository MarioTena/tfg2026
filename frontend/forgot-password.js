const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "http://localhost:3000";
const API_URL = `${API_BASE_URL}/api/auth/forgot-password`;

const emailInput = document.getElementById("email");
const sendBtn = document.getElementById("send-btn");
const statusMsg = document.getElementById("status-msg");

function showStatus(message = "", isError = true) {
  if (!statusMsg) return;

  statusMsg.textContent = message;
  statusMsg.style.display = message ? "block" : "none";
  statusMsg.classList.toggle("status-success", !isError && !!message);
  statusMsg.classList.toggle("status-error", isError && !!message);
}

async function sendResetLink() {
  showStatus("", true);
  sendBtn.disabled = true;
  sendBtn.textContent = "Enviando...";

  const email = emailInput.value.trim();

  if (!email) {
    showStatus("Introduce tu email para enviarte el enlace.");
    sendBtn.disabled = false;
    sendBtn.textContent = "Enviar enlace";
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      showStatus(data?.error || "No se pudo procesar la solicitud.");
      return;
    }

    showStatus(
      data.message || "Si el email existe, recibirás un enlace para cambiar tu contraseña.",
      false
    );
  } catch (error) {
    console.error(error);
    showStatus("No se ha podido conectar con la API.");
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Enviar enlace";
  }
}

sendBtn.addEventListener("click", sendResetLink);

emailInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendResetLink();
  }
});