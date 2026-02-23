// ============================================================================
// home.js
// Pantalla inicial tras login: elegir lenguaje y redirigir al índice de temas
// ============================================================================

(function requireLogin() {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "./login.html";
})();

const sessionInfo = document.getElementById("session-info");
const goPython = document.getElementById("go-python");
const goC = document.getElementById("go-c");
const logoutBtn = document.getElementById("logout-btn");

try {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (sessionInfo && user?.email) {
    sessionInfo.textContent = `Sesión activa: ${user.email}`;
  }
} catch {}

// Al elegir lenguaje, vamos a la página principal de ese lenguaje (lista de temas)
goPython.addEventListener("click", () => {
  window.location.href = "./temas/python/index.html";
});

goC.addEventListener("click", () => {
  window.location.href = "./temas/c/index.html";
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "./login.html";
});
