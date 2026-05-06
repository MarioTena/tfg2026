const API_URL = "http://localhost:3000/api/auth/forgot-password";

const emailInput = document.getElementById("email");
const sendBtn = document.getElementById("send-btn");
const statusMsg = document.getElementById("status-msg");

function showStatus(message, isError = true) {
  statusMsg.textContent = message;
  statusMsg.classList.toggle("status-success", !isError);
  statusMsg.classList.toggle("status-error", isError);
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

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendResetLink();
});