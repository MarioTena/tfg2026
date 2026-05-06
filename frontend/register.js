// ============================================================================
// register.js
// Crea usuario en /api/auth/register y redirige a login.html
// ============================================================================

const API_REGISTER_URL = "http://localhost:3000/api/auth/register";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("register-btn");
const statusMsg = document.getElementById("status-msg");

function showStatus(message, isError = true) {
  statusMsg.textContent = message;
  statusMsg.classList.toggle("status-success", !isError);
  statusMsg.classList.toggle("status-error", isError);
}

async function doRegister() {
  showStatus("", true);
  registerBtn.disabled = true;
  registerBtn.textContent = "Creando cuenta...";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!name || !email || !password) {
    showStatus("Completa nombre, email y contraseña.");
    registerBtn.disabled = false;
    registerBtn.textContent = "Crear cuenta";
    return;
  }

  if (password.length < 6) {
    showStatus("La contraseña debe tener al menos 6 caracteres.");
    registerBtn.disabled = false;
    registerBtn.textContent = "Crear cuenta";
    return;
  }

  try {
    const res = await fetch(API_REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      showStatus(data?.error || "No se ha podido crear la cuenta.");
      registerBtn.disabled = false;
      registerBtn.textContent = "Crear cuenta";
      return;
    }

    const url = `./login.html?email=${encodeURIComponent(email)}`;
    setTimeout(() => {
      window.location.href = url;
    }, 700);
  } catch (err) {
    console.error("Register error:", err);
    showStatus("No se ha podido conectar con la API.");
  } finally {
    registerBtn.disabled = false;
    registerBtn.textContent = "Crear cuenta";
  }
}

registerBtn.addEventListener("click", doRegister);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doRegister();
});