const API_ME_URL = "http://localhost:3000/api/auth/me";
const API_PROFILE_URL = "http://localhost:3000/api/auth/profile";

const nameInput = document.getElementById("config-name");
const emailEl = document.getElementById("config-email");
const themeToggle = document.getElementById("theme-toggle");
const saveNameBtn = document.getElementById("save-name-btn");
const logoutCard = document.getElementById("logout-card");
const statusMsg = document.getElementById("config-status-msg");
const configUserCopy = document.getElementById("config-user-copy");

function getToken() {
  return localStorage.getItem("token");
}

function saveUserLocally(user) {
  localStorage.setItem("user", JSON.stringify(user));
  if (user?.theme) {
    localStorage.setItem("theme", user.theme);
  }
}

function applyTheme(theme) {
  const finalTheme = theme === "light" ? "light" : "dark";
  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(finalTheme === "light" ? "theme-light" : "theme-dark");
  localStorage.setItem("theme", finalTheme);

  try {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    user.theme = finalTheme;
    localStorage.setItem("user", JSON.stringify(user));
  } catch {}
}

function setStatusMessage(message = "", isError = false) {
  if (!statusMsg) return;

  statusMsg.textContent = message;
  statusMsg.style.display = message ? "block" : "none";
  statusMsg.classList.toggle("status-success", !isError && !!message);
  statusMsg.classList.toggle("status-error", isError && !!message);
}

async function loadProfile() {
  const token = getToken();

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(API_ME_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      throw new Error(data.error || "No se pudo cargar el perfil.");
    }

    const user = data.user;
    saveUserLocally(user);

    if (nameInput) nameInput.value = user.name || "";
    if (emailEl) emailEl.textContent = user.email || "No disponible";

    if (configUserCopy) {
      configUserCopy.textContent = user.name
        ? `Estás usando la plataforma como ${user.name}.`
        : "Estás usando tu perfil personal.";
    }

    const currentTheme = user.theme || "dark";
    if (themeToggle) {
      themeToggle.checked = currentTheme === "light";
    }
    applyTheme(currentTheme);
  } catch (error) {
    console.error(error);
    setStatusMessage(error.message || "Error cargando configuración.", true);
  }
}

async function saveProfile(updates) {
  const token = getToken();

  const res = await fetch(API_PROFILE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  const data = await res.json();

  if (!res.ok || !data.ok) {
    throw new Error(data.error || "No se pudo guardar la configuración.");
  }

  saveUserLocally(data.user);
  applyTheme(data.user.theme || "dark");
  return data.user;
}

saveNameBtn?.addEventListener("click", async () => {
  setStatusMessage("");

  try {
    const user = await saveProfile({
      name: nameInput?.value.trim() || "",
    });

    if (nameInput) {
      nameInput.value = user.name;
    }

    if (configUserCopy) {
      configUserCopy.textContent = user.name
        ? `Estás usando la plataforma como ${user.name}.`
        : "Estás usando tu perfil personal.";
    }

    setStatusMessage("Nombre actualizado correctamente.");
  } catch (error) {
    console.error(error);
    setStatusMessage(error.message || "No se pudo actualizar el nombre.", true);
  }
});

themeToggle?.addEventListener("change", async () => {
  setStatusMessage("");

  const nextTheme = themeToggle.checked ? "light" : "dark";

  try {
    const user = await saveProfile({
      theme: nextTheme,
    });

    themeToggle.checked = user.theme === "light";
    setStatusMessage("Tema actualizado correctamente.");
  } catch (error) {
    console.error(error);
    setStatusMessage(error.message || "No se pudo actualizar el tema.", true);
    themeToggle.checked = !themeToggle.checked;
  }
});

logoutCard?.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("theme");
  window.location.href = "login.html";
});

loadProfile();