const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "http://localhost:3000";
const API_REGISTER_URL = `${API_BASE_URL}/api/auth/register`;

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("register-btn");
const statusMsg = document.getElementById("status-msg");

let isSubmitting = false;

function showStatus(message = "", isError = true) {
  if (!statusMsg) return;

  statusMsg.textContent = message;
  statusMsg.style.display = message ? "block" : "none";
  statusMsg.classList.toggle("status-success", !isError && !!message);
  statusMsg.classList.toggle("status-error", isError && !!message);
}

function getFieldWrapper(input) {
  return input?.closest(".field") || null;
}

function clearFieldErrors() {
  [nameInput, emailInput, passwordInput].forEach((input) => {
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

function validateRegisterForm() {
  clearFieldErrors();

  let isValid = true;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    showFieldError(nameInput, "Introduce tu nombre.");
    isValid = false;
  } else if (name.length < 2) {
    showFieldError(nameInput, "El nombre debe tener al menos 2 caracteres.");
    isValid = false;
  }


  if (!email) {
    showFieldError(emailInput, "Introduce tu email.");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showFieldError(emailInput, "Introduce un email válido.");
    isValid = false;
  }

  if (!password) {
    showFieldError(passwordInput, "Introduce una contraseña.");
    isValid = false;
  } else if (password.length < 8) {
    showFieldError(passwordInput, "La contraseña debe tener al menos 8 caracteres.");
    isValid = false;
  }

  if (!isValid) {
    showStatus("Revisa los campos marcados.", true);
  }

  return isValid;
}

function showGoToLoginButton(email) {
  let loginBtn = document.getElementById("go-to-login-btn");

  if (!loginBtn) {
    loginBtn = document.createElement("a");
    loginBtn.id = "go-to-login-btn";
    loginBtn.className = "btn btn-primary";
    loginBtn.textContent = "Ir a login";

    registerBtn.parentNode.appendChild(loginBtn);
  }

  loginBtn.href = `./login.html?email=${encodeURIComponent(email)}`;
  loginBtn.style.display = "inline-flex";
}

function lockRegisterFormAfterSuccess() {
  if (nameInput) nameInput.disabled = true;
  if (emailInput) emailInput.disabled = true;
  if (passwordInput) passwordInput.disabled = true;
  if (registerBtn) registerBtn.style.display = "none";
}

async function doRegister() {
  if (isSubmitting) return;

  showStatus("");
  isSubmitting = true;
  registerBtn.disabled = true;
  registerBtn.textContent = "Creando cuenta...";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!validateRegisterForm()) {
    isSubmitting = false;
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
      return;
    }

    showStatus(
      "Cuenta creada correctamente. Revisa tu correo y verifica la cuenta antes de iniciar sesión.",
      false
    );

    lockRegisterFormAfterSuccess();
    showGoToLoginButton(email);
  } catch (err) {
    console.error("Register error:", err);
    showStatus("No se ha podido conectar con la API.");
  } finally {
    isSubmitting = false;

    if (registerBtn && registerBtn.style.display !== "none") {
      registerBtn.disabled = false;
      registerBtn.textContent = "Crear cuenta";
    }
  }
}

registerBtn?.addEventListener("click", doRegister);

[nameInput, emailInput, passwordInput].forEach((input) => {
  input?.addEventListener("input", () => {
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
      doRegister();
    }
  });
});