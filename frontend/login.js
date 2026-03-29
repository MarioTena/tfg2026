// ============================================================================
// login.js
// Llama a /api/auth/login, guarda token en localStorage y redirige al playground
// ============================================================================

const API_LOGIN_URL = "http://localhost:3000/api/auth/login";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const statusMsg = document.getElementById("status-msg");



(function fillEmailFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  if (email) emailInput.value = email;
})();

async function doLogin() {
  statusMsg.textContent = "";
  loginBtn.disabled = true;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    statusMsg.textContent = "Rellena email y contraseña.";
    loginBtn.disabled = false;
    return;
  }

  try {
    const res = await fetch(API_LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data = null;
    try {
      data = await res.json();
    } catch {
      statusMsg.textContent = "Respuesta inválida del servidor (no es JSON).";
      loginBtn.disabled = false;
      return;
    }

    if (!res.ok || !data.ok) {
      statusMsg.textContent = data?.error || "No se ha podido iniciar sesión.";
      loginBtn.disabled = false;
      return;
    }

    // Guardamos token para usarlo luego en /api/run y /api/attempts
    localStorage.setItem("token", data.token);

    // (Opcional) Guardar info de usuario para mostrarla en UI más adelante
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    // ... redirige a la pantalla inicial (home)
    window.location.href = "menu.html";
  } catch (err) {
    console.error("Login error:", err);
    statusMsg.textContent = "No se ha podido conectar con la API.";
  } finally {
    loginBtn.disabled = false;
  }
}

loginBtn.addEventListener("click", doLogin);

// Enter para enviar
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doLogin();
});
