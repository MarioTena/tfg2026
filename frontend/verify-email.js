const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "http://localhost:3000";
const API_VERIFY_EMAIL_URL = `${API_BASE_URL}/api/auth/verify-email`;
const API_RESEND_VERIFICATION_URL = `${API_BASE_URL}/api/auth/resend-verification`;

const statusMsg = document.getElementById("verify-status");
const resendPanel = document.getElementById("resend-verification-panel");
const resendEmailInput = document.getElementById("resend-email");
const resendBtn = document.getElementById("resend-verification-btn");
const resendStatusMsg = document.getElementById("resend-status");

function showStatus(message = "", isError = true) {
  if (!statusMsg) return;

  statusMsg.textContent = message;
  statusMsg.style.display = message ? "block" : "none";
  statusMsg.classList.toggle("status-success", !isError && !!message);
  statusMsg.classList.toggle("status-error", isError && !!message);
}

function showResendStatus(message = "", isError = true) {
  if (!resendStatusMsg) return;

  resendStatusMsg.textContent = message;
  resendStatusMsg.style.display = message ? "block" : "none";
  resendStatusMsg.classList.toggle("status-success", !isError && !!message);
  resendStatusMsg.classList.toggle("status-error", isError && !!message);
}

function showResendPanel() {
  if (resendPanel) {
    resendPanel.style.display = "block";
  }
}

function hideResendPanel() {
  if (resendPanel) {
    resendPanel.style.display = "none";
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function resendVerificationEmail() {
  const email = resendEmailInput?.value.trim() || "";

  showResendStatus("");

  if (!email) {
    showResendStatus("Introduce tu email para reenviar la verificación.", true);
    return;
  }

  if (!isValidEmail(email)) {
    showResendStatus("Introduce un email válido.", true);
    return;
  }

  try {
    if (resendBtn) {
      resendBtn.disabled = true;
      resendBtn.textContent = "Reenviando...";
    }

    const res = await fetch(API_RESEND_VERIFICATION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      showResendStatus(data?.error || "No se ha podido reenviar el correo de verificación.", true);
      return;
    }

    showResendStatus(data.message || "Te hemos reenviado el correo de verificación.", false);
  } catch (error) {
    console.error("Resend verification error:", error);
    showResendStatus("No se ha podido conectar con la API.", true);
  } finally {
    if (resendBtn) {
      resendBtn.disabled = false;
      resendBtn.textContent = "Reenviar correo de verificación";
    }
  }
}

async function verifyEmail() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const email = params.get("email");

  if (email && resendEmailInput) {
    resendEmailInput.value = email;
  }

  if (!token) {
    showStatus("Falta el token de verificación. Puedes solicitar un nuevo correo de verificación.", true);
    showResendPanel();
    return;
  }

  hideResendPanel();
  showStatus("Verificando tu correo...", false);

  try {
    const res = await fetch(`${API_VERIFY_EMAIL_URL}?token=${encodeURIComponent(token)}`);
    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      showStatus(
        data?.error || "No se ha podido verificar el correo. Puedes solicitar un nuevo enlace.",
        true
      );
      showResendPanel();
      return;
    }

    showStatus("Correo verificado correctamente. Ya puedes iniciar sesión.", false);
    hideResendPanel();
  } catch (error) {
    console.error("Verify email error:", error);
    showStatus("No se ha podido conectar con la API. Puedes intentarlo de nuevo o solicitar otro enlace.", true);
    showResendPanel();
  }
}

resendBtn?.addEventListener("click", resendVerificationEmail);

resendEmailInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    resendVerificationEmail();
  }
});

verifyEmail();