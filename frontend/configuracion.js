const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "http://localhost:3000";
const API_ME_URL = `${API_BASE_URL}/api/auth/me`;
const API_PROFILE_URL = `${API_BASE_URL}/api/auth/profile`;
const API_AVATAR_URL = `${API_BASE_URL}/api/auth/avatar`;

const nameInput = document.getElementById("config-name");
const emailEl = document.getElementById("config-email");
const themeToggle = document.getElementById("theme-toggle");
const saveNameBtn = document.getElementById("save-name-btn");
const logoutCard = document.getElementById("logout-card");
const statusMsg = document.getElementById("config-status-msg");
const configUserCopy = document.getElementById("config-user-copy");

const avatarPreview = document.getElementById("config-avatar-preview");
const avatarPreviewWrap = document.getElementById("config-avatar-preview-wrap");
const avatarFallback = document.getElementById("config-avatar-fallback");
const avatarInput = document.getElementById("config-avatar-input");
const saveAvatarBtn = document.getElementById("save-avatar-btn");
const resetAvatarBtn = document.getElementById("reset-avatar-btn");
const avatarCropImage = document.getElementById("avatar-crop-image");
const avatarZoomRange = document.getElementById("avatar-zoom-range");
const avatarCropPanel = document.getElementById("avatar-crop-panel");
const avatarEditorGrid = document.getElementById("avatar-editor-grid");

let avatarCropper = null;
let selectedAvatarObjectUrl = null;
let avatarMinZoom = 1;
let avatarMaxZoom = 3;

function getToken() {
  return localStorage.getItem("token");
}

function saveUserLocally(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function applyTheme(theme) {
  const finalTheme = theme === "light" ? "light" : "dark";
  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(finalTheme === "light" ? "theme-light" : "theme-dark");

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

function showCropPanel() {
  if (avatarCropPanel) {
    avatarCropPanel.style.display = "block";
  }
  if (avatarEditorGrid) {
    avatarEditorGrid.classList.remove("avatar-editor-grid--single");
  }
}

function hideCropPanel() {
  if (avatarCropPanel) {
    avatarCropPanel.style.display = "none";
  }
  if (avatarEditorGrid) {
    avatarEditorGrid.classList.add("avatar-editor-grid--single");
  }
}

function destroyCropper() {
  if (avatarCropper) {
    avatarCropper.destroy();
    avatarCropper = null;
  }
}

function cleanupObjectUrl() {
  if (selectedAvatarObjectUrl) {
    URL.revokeObjectURL(selectedAvatarObjectUrl);
    selectedAvatarObjectUrl = null;
  }
}

function renderAvatar(user) {
  const avatarUrl = user?.avatarUrl || "";

  if (avatarUrl) {
    if (avatarPreview) {
      avatarPreview.src = avatarUrl;
    }
    if (avatarPreviewWrap) {
      avatarPreviewWrap.style.display = "block";
    }
    if (avatarFallback) {
      avatarFallback.style.display = "none";
    }
    return;
  }

  if (avatarPreview) {
    avatarPreview.src = "";
  }
  if (avatarPreviewWrap) {
    avatarPreviewWrap.style.display = "none";
  }

  if (avatarFallback) {
    const name = (user?.name || "").trim();
    const initial = name ? name.charAt(0).toUpperCase() : ":)";
    avatarFallback.textContent = initial;
    avatarFallback.style.display = "flex";
  }
}

function updateProfileUI(user) {
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
  renderAvatar(user);
}

function getCurrentCropperZoom() {
  if (!avatarCropper) return 1;

  const imageData = avatarCropper.getImageData();
  if (!imageData || !imageData.naturalWidth) return 1;

  return imageData.width / imageData.naturalWidth;
}

function syncZoomRangeToCropper() {
  if (!avatarCropper || !avatarZoomRange) return;

  const currentZoom = getCurrentCropperZoom();
  avatarZoomRange.value = String(currentZoom);
}

function initZoomRange(minZoom) {
  if (!avatarZoomRange) return;

  avatarMinZoom = minZoom;
  avatarZoomRange.min = String(avatarMinZoom);
  avatarZoomRange.max = String(avatarMaxZoom);
  avatarZoomRange.step = "0.01";
  avatarZoomRange.value = String(avatarMinZoom);
}

function initCropperWithImage(src) {
  destroyCropper();

  if (!avatarCropImage) return;

  avatarCropImage.onload = () => {
    destroyCropper();

    avatarCropper = new Cropper(avatarCropImage, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: "move",
      guides: false,
      center: true,
      highlight: false,
      background: false,
      autoCropArea: 0.92,
      movable: true,
      zoomable: true,
      scalable: false,
      rotatable: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,

      ready() {
        const minZoom = getCurrentCropperZoom();
        initZoomRange(minZoom);
      },

      zoom(event) {
        const nextZoom = event.detail?.ratio;

        if (typeof nextZoom === "number" && nextZoom < avatarMinZoom) {
          event.preventDefault();
          return;
        }

        requestAnimationFrame(() => {
          syncZoomRangeToCropper();
        });
      }
    });
  };

  avatarCropImage.src = src;
  avatarCropImage.style.display = "block";
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

    updateProfileUI(data.user);
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

  updateProfileUI(data.user);
  return data.user;
}

function getCroppedAvatarBlob() {
  return new Promise((resolve, reject) => {
    if (!avatarCropper) {
      reject(new Error("Primero debes seleccionar una imagen."));
      return;
    }

    const canvas = avatarCropper.getCroppedCanvas({
      width: 400,
      height: 400,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
    });

    if (!canvas) {
      reject(new Error("No se pudo preparar el recorte."));
      return;
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("No se pudo generar la imagen recortada."));
        return;
      }
      resolve(blob);
    }, "image/jpeg", 0.92);
  });
}

async function uploadAvatar() {
  const token = getToken();
  const blob = await getCroppedAvatarBlob();

  const formData = new FormData();
  formData.append("avatar", blob, "avatar.jpg");

  const res = await fetch(API_AVATAR_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data.ok) {
    throw new Error(data.error || "No se pudo subir el avatar.");
  }

  updateProfileUI(data.user);
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

avatarInput?.addEventListener("change", () => {
  setStatusMessage("");

  const file = avatarInput.files?.[0];
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    setStatusMessage("Formato no válido. Usa JPG, PNG o WEBP.", true);
    avatarInput.value = "";
    hideCropPanel();
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    setStatusMessage("La imagen no puede superar 2 MB.", true);
    avatarInput.value = "";
    hideCropPanel();
    return;
  }

  cleanupObjectUrl();
  selectedAvatarObjectUrl = URL.createObjectURL(file);
  showCropPanel();
  initCropperWithImage(selectedAvatarObjectUrl);
});

avatarZoomRange?.addEventListener("input", () => {
  if (!avatarCropper) return;

  const zoomValue = Number(avatarZoomRange.value || avatarMinZoom);
  avatarCropper.zoomTo(zoomValue);
});

resetAvatarBtn?.addEventListener("click", () => {
  if (!avatarCropper) return;

  avatarCropper.reset();

  requestAnimationFrame(() => {
    const minZoom = getCurrentCropperZoom();
    initZoomRange(minZoom);
  });
});

saveAvatarBtn?.addEventListener("click", async () => {
  setStatusMessage("");

  try {
    saveAvatarBtn.disabled = true;
    saveAvatarBtn.textContent = "Guardando...";

    await uploadAvatar();

    hideCropPanel();
    destroyCropper();

    if (avatarCropImage) {
      avatarCropImage.src = "";
      avatarCropImage.style.display = "none";
    }

    if (avatarZoomRange) {
      avatarZoomRange.value = "1";
    }

    if (avatarInput) {
      avatarInput.value = "";
    }

    cleanupObjectUrl();

    setStatusMessage("Avatar actualizado correctamente.");
  } catch (error) {
    console.error(error);
    setStatusMessage(error.message || "No se pudo actualizar el avatar.", true);
  } finally {
    saveAvatarBtn.disabled = false;
    saveAvatarBtn.textContent = "Guardar imagen";
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
  destroyCropper();
  cleanupObjectUrl();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

window.addEventListener("beforeunload", () => {
  destroyCropper();
  cleanupObjectUrl();
});

hideCropPanel();
loadProfile();