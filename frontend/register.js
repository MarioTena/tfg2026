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

async function doRegister() {
  statusMsg.textContent = "";
  registerBtn.disabled = true;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!name || !email || !password) {
    statusMsg.textContent = "Rellena nombre, email y contraseña.";
    registerBtn.disabled = false;
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
      statusMsg.textContent = data?.error || "No se ha podido crear el usuario.";
      registerBtn.disabled = false;
      return;
    }

    // Registro OK → vamos a login y pre-rellenamos el email
    const url = `./login.html?email=${encodeURIComponent(email)}`;
    window.location.href = url;
  } catch (err) {
    console.error("Register error:", err);
    statusMsg.textContent = "No se ha podido conectar con la API.";
  } finally {
    registerBtn.disabled = false;
  }
}

registerBtn.addEventListener("click", doRegister);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doRegister();
});
