function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
}

function getStoredTheme() {
  const user = getStoredUser();

  if (user?.theme === "light" || user?.theme === "dark") {
    return user.theme;
  }

  return "dark";
}

function applyTheme(theme) {
  const finalTheme = theme === "light" ? "light" : "dark";

  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(finalTheme === "light" ? "theme-light" : "theme-dark");

  const user = getStoredUser();
  if (user) {
    user.theme = finalTheme;
    localStorage.setItem("user", JSON.stringify(user));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getStoredTheme());
});