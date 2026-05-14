const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "http://localhost:3000";
const statusMsg = document.getElementById("verify-status");

function showStatus(message = "", isError = true) {
  if (!statusMsg) return;

  statusMsg.textContent = message;
  statusMsg.style.display = message ? "block" : "none";
  statusMsg.classList.toggle("status-success", !isError && !!message);
  statusMsg.classList.toggle("status-error", isError && !!message);
}

async function verifyEmail() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (!token) {
    showStatus("Falta el token de verificación.", true);
    return;
  }

  showStatus("Verificando tu correo...", false);

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`);
    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      showStatus(data?.error || "No se ha podido verificar el correo.", true);
      return;
    }

    showStatus("Correo verificado correctamente. Ya puedes iniciar sesión.", false);
  } catch (error) {
    console.error("Verify email error:", error);
    showStatus("No se ha podido conectar con la API.", true);
  }
}

verifyEmail();