(() => {
  const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "https://tfg2026-backend.onrender.com";

  function getLoginPath() {
    const path = window.location.pathname;

    if (path.includes("/temas/python/")) {
      return "../../../login.html";
    }

    if (path.includes("/playground/")) {
      return "../login.html";
    }

    return "./login.html";
  }

  function clearSessionAndRedirect(message = "Tu sesión ya no es válida. Vuelve a iniciar sesión.") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.setItem("session-message", message);
    window.location.href = getLoginPath();
  }

  async function checkSession() {
    const token = localStorage.getItem("token");

    if (!token) {
      clearSessionAndRedirect("Debes iniciar sesión para continuar.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok || !data.user) {
        clearSessionAndRedirect(
          "Tu sesión ha caducado o el usuario ya no existe. Vuelve a iniciar sesión."
        );
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Error comprobando sesión:", error);
      clearSessionAndRedirect("No se ha podido comprobar tu sesión. Vuelve a iniciar sesión.");
    }
  }

  checkSession();
})();