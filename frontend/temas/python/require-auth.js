(function requireAuth() {
  const token = localStorage.getItem("token");

  if (token) return;

  const currentPath = window.location.pathname;
  const isInsideFrontend = currentPath.includes("/frontend/");
  const loginPath = isInsideFrontend ? "/frontend/login.html" : "/login.html";

  window.location.href = loginPath;
})();