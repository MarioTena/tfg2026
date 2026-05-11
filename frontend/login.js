const API_LOGIN_URL = "http://localhost:3000/api/auth/login";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const statusMsg = document.getElementById("status-msg");

let isSubmitting = false;

function showStatus(message = "", isError = true) {
  if (!statusMsg) return;

  statusMsg.textContent = message;
  statusMsg.style.display = message ? "block" : "none";
  statusMsg.classList.toggle("status-success", !isError && !!message);
  statusMsg.classList.toggle("status-error", isError && !!message);
}

(function fillEmailFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  if (email && emailInput) emailInput.value = email;
})();

async function doLogin() {
  if (isSubmitting) return;

  showStatus("");
  isSubmitting = true;
  loginBtn.disabled = true;
  loginBtn.textContent = "Entrando...";

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showStatus("Rellena email y contraseña.");
    isSubmitting = false;
    loginBtn.disabled = false;
    loginBtn.textContent = "Entrar";
    return;
  }

  try {
    const startedAt = performance.now();

    const res = await fetch(API_LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data = null;
    try {
      data = await res.json();
    } catch {
      showStatus("Respuesta inválida del servidor (no es JSON).");
      return;
    }

    const elapsedMs = Math.round(performance.now() - startedAt);
    console.log(`Login completado en ${elapsedMs} ms`);

    if (!res.ok || !data.ok) {
      if (data?.code === "EMAIL_NOT_VERIFIED") {
        showStatus("Debes verificar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.", true);
      } else {
        showStatus(data?.error || "No se ha podido iniciar sesión.");
      }
      return;
    }

    localStorage.setItem("token", data.token);

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    showStatus("Acceso correcto. Redirigiendo...", false);

    const onboardingCompleted = data.user?.onboardingCompleted === true;
    window.location.href = onboardingCompleted ? "menu.html" : "bienvenida.html";
  } catch (err) {
    console.error("Login error:", err);
    showStatus("No se ha podido conectar con la API.");
  } finally {
    isSubmitting = false;
    loginBtn.disabled = false;
    loginBtn.textContent = "Entrar";
  }
}

loginBtn?.addEventListener("click", doLogin);

[emailInput, passwordInput].forEach((input) => {
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      doLogin();
    }
  });
});