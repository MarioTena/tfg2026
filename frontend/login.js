const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "http://localhost:3000";
const API_LOGIN_URL = `${API_BASE_URL}/api/auth/login`;
const API_RESEND_VERIFICATION_URL = `${API_BASE_URL}/api/auth/resend-verification`;

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

let resendVerificationBtn = null;

function hideResendVerificationButton() {
  if (resendVerificationBtn) {
    resendVerificationBtn.remove();
    resendVerificationBtn = null;
  }
}

function showResendVerificationButton(email) {
  hideResendVerificationButton();

  resendVerificationBtn = document.createElement("button");
  resendVerificationBtn.type = "button";
  resendVerificationBtn.className = "btn btn-secondary btn-sm";
  resendVerificationBtn.textContent = "Reenviar correo de verificación";
  resendVerificationBtn.style.marginTop = "12px";

  resendVerificationBtn.addEventListener("click", async () => {
    await resendVerificationEmail(email);
  });

  statusMsg?.insertAdjacentElement("afterend", resendVerificationBtn);
}

async function resendVerificationEmail(email) {
  if (!email) {
    showStatus("Introduce tu email para poder reenviar la verificación.", true);
    return;
  }

  try {
    resendVerificationBtn.disabled = true;
    resendVerificationBtn.textContent = "Reenviando...";

    const res = await fetch(API_RESEND_VERIFICATION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      showStatus(data?.error || "No se ha podido reenviar el correo de verificación.", true);
      return;
    }

    showStatus(data.message || "Te hemos reenviado el correo de verificación.", false);
  } catch (error) {
    console.error("Resend verification error:", error);
    showStatus("No se ha podido conectar con la API.", true);
  } finally {
    if (resendVerificationBtn) {
      resendVerificationBtn.disabled = false;
      resendVerificationBtn.textContent = "Reenviar correo de verificación";
    }
  }
}

function getFieldWrapper(input) {
  return input?.closest(".field") || null;
}

function clearFieldErrors() {
  [emailInput, passwordInput].forEach((input) => {
    const field = getFieldWrapper(input);
    if (!field) return;

    field.classList.remove("field-error");

    const oldError = field.querySelector(".field-error-message");
    if (oldError) oldError.remove();
  });
}

function showFieldError(input, message) {
  const field = getFieldWrapper(input);
  if (!field) return;

  field.classList.add("field-error");

  let errorEl = field.querySelector(".field-error-message");
  if (!errorEl) {
    errorEl = document.createElement("p");
    errorEl.className = "field-error-message";
    field.appendChild(errorEl);
  }

  errorEl.textContent = message;
}

function validateLoginForm() {
  clearFieldErrors();

  let isValid = true;

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    showFieldError(emailInput, "Introduce tu email.");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showFieldError(emailInput, "Introduce un email válido.");
    isValid = false;
  }

  if (!password) {
    showFieldError(passwordInput, "Introduce tu contraseña.");
    isValid = false;
  }

  if (!isValid) {
    showStatus("Revisa los campos marcados.", true);
  }

  return isValid;
}

(function fillEmailFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  if (email && emailInput) emailInput.value = email;
})();

async function doLogin() {
  if (isSubmitting) return;

  showStatus("");
  hideResendVerificationButton();
  isSubmitting = true;
  loginBtn.disabled = true;
  loginBtn.textContent = "Entrando...";

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!validateLoginForm()) {
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
        showStatus(
          "Debes verificar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada o reenvía el correo de verificación.",
          true
        );
        showResendVerificationButton(email);
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
  input?.addEventListener("input", () => {
    hideResendVerificationButton();

    const field = getFieldWrapper(input);
    if (!field) return;

    field.classList.remove("field-error");

    const oldError = field.querySelector(".field-error-message");
    if (oldError) oldError.remove();

    if (statusMsg?.textContent === "Revisa los campos marcados.") {
      showStatus("");
    }
  });

  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      doLogin();
    }
  });
});