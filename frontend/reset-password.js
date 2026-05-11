const API_URL = "http://localhost:3000/api/auth/reset-password";

const passwordInput = document.getElementById("password");
const resetBtn = document.getElementById("reset-btn");
const statusMsg = document.getElementById("status-msg");

function getToken() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
}

function showStatus(message = "", isError = true) {
  if (!statusMsg) return;

  statusMsg.textContent = message;
  statusMsg.style.display = message ? "block" : "none";
  statusMsg.classList.toggle("status-success", !isError && !!message);
  statusMsg.classList.toggle("status-error", isError && !!message);
}

async function resetPassword() {
  const token = getToken();
  const password = passwordInput.value;

  showStatus("", true);
  resetBtn.disabled = true;
  resetBtn.textContent = "Guardando...";

  if (!token) {
    showStatus("El enlace no es válido o ha caducado.");
    resetBtn.disabled = false;
    resetBtn.textContent = "Guardar contraseña";
    return;
  }

  if (!password) {
    showStatus("Introduce tu nueva contraseña.");
    resetBtn.disabled = false;
    resetBtn.textContent = "Guardar contraseña";
    return;
  }

  if (password.length < 6) {
    showStatus("La contraseña debe tener al menos 6 caracteres.");
    resetBtn.disabled = false;
    resetBtn.textContent = "Guardar contraseña";
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      showStatus(data?.error || "No se pudo actualizar la contraseña.");
      return;
    }

    showStatus("Contraseña actualizada correctamente. Ya puedes iniciar sesión.", false);

    setTimeout(() => {
      window.location.href = "./login.html";
    }, 1000);
  } catch (error) {
    console.error(error);
    showStatus("No se ha podido conectar con la API.");
  } finally {
    resetBtn.disabled = false;
    resetBtn.textContent = "Guardar contraseña";
  }
}

resetBtn.addEventListener("click", resetPassword);

passwordInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    resetPassword();
  }
});