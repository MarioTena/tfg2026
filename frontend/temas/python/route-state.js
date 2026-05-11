function getCurrentUserIdForRoute() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.id ? String(user.id) : null;
  } catch {
    return null;
  }
}

function setLastPythonThemeForCurrentUser(themeId) {
  if (!themeId) return;

  const userId = getCurrentUserIdForRoute();
  if (!userId) return;

  localStorage.setItem(`lastPythonTheme:${userId}`, String(themeId));
}

function bindThemeLink(linkOrSelector, themeId) {
  const element =
    typeof linkOrSelector === "string"
      ? document.querySelector(linkOrSelector)
      : linkOrSelector;

  if (!element || !themeId) return;

  element.addEventListener("click", () => {
    setLastPythonThemeForCurrentUser(themeId);
  });
}

function bindThemeLinksFromDataAttribute() {
  const elements = document.querySelectorAll("[data-set-last-theme]");

  elements.forEach((element) => {
    const themeId = element.getAttribute("data-set-last-theme");
    if (!themeId) return;

    element.addEventListener("click", () => {
      setLastPythonThemeForCurrentUser(themeId);
    });
  });
}

function setNextPythonThemeForCurrentUser(currentThemeId, maxThemeId = 10) {
  const current = Number(currentThemeId);
  if (!Number.isFinite(current)) return;

  const nextThemeId = current >= maxThemeId ? maxThemeId : current + 1;
  setLastPythonThemeForCurrentUser(String(nextThemeId));
}