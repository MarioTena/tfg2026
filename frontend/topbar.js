function getStoredTopbarUser() {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
}

function buildTopbarHref(root, path) {
  return `${root || ""}${path}`;
}

function getTopbarAvatarMarkup(user) {
  const name = (user?.name || "").trim();
  const avatarUrl = (user?.avatarUrl || "").trim();
  const initial = name ? name.charAt(0).toUpperCase() : ":)";

  if (avatarUrl) {
    return `
      <span class="topbar-user-avatar-wrap">
        <img class="topbar-user-avatar-img" src="${avatarUrl}" alt="Avatar del usuario" />
      </span>
    `;
  }

  return `<span class="topbar-user-avatar-fallback">${initial}</span>`;
}

function renderAppTopbar() {
  const mount = document.getElementById("app-topbar");
  if (!mount) return;

  const root = mount.dataset.root || "";
  const title = mount.dataset.title || "Plataforma";
  const subtitle = mount.dataset.subtitle || "";
  const routeHref = mount.dataset.routeHref || buildTopbarHref(root, "temas/python/index.html");
  const topicHref = mount.dataset.topicHref || "";
  const showBack = mount.dataset.showBack === "true";
  const backHref = mount.dataset.backHref || "";
  const backLabel = mount.dataset.backLabel || "Volver";

  const hideMenu = mount.dataset.hideMenu === "true";
  const hideRoute = mount.dataset.hideRoute === "true";
  const hideTopic = mount.dataset.hideTopic === "true";

  const user = getStoredTopbarUser();

  const menuHref = buildTopbarHref(root, "menu.html");
  const progressHref = buildTopbarHref(root, "progreso.html");
  const returnTo = encodeURIComponent(window.location.href);
  const playgroundHref = buildTopbarHref(root, `playground/index.html?lang=python&returnTo=${returnTo}`);
  const configHref = buildTopbarHref(root, "configuracion.html");
  const loginHref = buildTopbarHref(root, "login.html");

  mount.className = "topbar";
  mount.innerHTML = `
    <div class="topbar-inner">
      <div class="topbar-title">
        <h1>${title}</h1>
        <p id="app-topbar-subtitle">${subtitle}</p>
      </div>

      <div class="topbar-actions">
        ${hideMenu ? "" : `<a class="btn btn-secondary btn-sm" href="${menuHref}">Menú</a>`}
        ${hideRoute ? "" : `<a class="btn btn-secondary btn-sm" href="${routeHref}">Ruta Python</a>`}
        ${topicHref && !hideTopic ? `<a class="btn btn-secondary btn-sm" href="${topicHref}">Volver al tema</a>` : ""}
        ${showBack ? `<a id="app-topbar-back-btn" class="btn btn-secondary btn-sm" href="${backHref || "#"}">${backLabel}</a>` : ""}

        <div class="topbar-user-menu">
          <button id="topbar-user-trigger" class="topbar-user-trigger" type="button" aria-expanded="false">
            ${getTopbarAvatarMarkup(user)}
          </button>

          <div id="topbar-user-dropdown" class="topbar-user-dropdown">
            <a class="topbar-user-link" href="${progressHref}">Mi progreso</a>
            <a class="topbar-user-link" href="${playgroundHref}">Playground</a>
            <a class="topbar-user-link" href="${configHref}">Configuración</a>
            <button id="topbar-logout-btn" class="topbar-user-link topbar-user-link-button" type="button">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const trigger = document.getElementById("topbar-user-trigger");
  const dropdown = document.getElementById("topbar-user-dropdown");
  const logoutBtn = document.getElementById("topbar-logout-btn");

  function closeDropdown() {
    if (!trigger || !dropdown) return;
    trigger.setAttribute("aria-expanded", "false");
    dropdown.classList.remove("is-open");
  }

  function toggleDropdown() {
    if (!trigger || !dropdown) return;
    const isOpen = dropdown.classList.contains("is-open");

    if (isOpen) {
      closeDropdown();
      return;
    }

    trigger.setAttribute("aria-expanded", "true");
    dropdown.classList.add("is-open");
  }

  trigger?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  document.addEventListener("click", (e) => {
    if (!mount.contains(e.target)) {
      closeDropdown();
    }
  });

  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = loginHref;
  });
}

window.setAppTopbarSubtitle = function setAppTopbarSubtitle(text) {
  const subtitleEl = document.getElementById("app-topbar-subtitle");
  if (subtitleEl) {
    subtitleEl.textContent = text || "";
  }
};

window.setAppTopbarBackLink = function setAppTopbarBackLink(href, label = "Volver") {
  const backBtn = document.getElementById("app-topbar-back-btn");
  if (!backBtn) return;

  if (!href) {
    backBtn.style.display = "none";
    backBtn.removeAttribute("href");
    return;
  }

  backBtn.style.display = "inline-flex";
  backBtn.href = href;
  backBtn.textContent = label;
};

document.addEventListener("DOMContentLoaded", renderAppTopbar);