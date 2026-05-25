let deferredInstallPrompt = null;

function createInstallButton() {
  if (document.getElementById("install-app-btn")) return;

  const button = document.createElement("button");
  button.id = "install-app-btn";
  button.type = "button";
  button.className = "btn btn-secondary btn-sm install-app-btn";
  button.textContent = "Instalar AprendeCode";

  button.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;

    deferredInstallPrompt = null;
    button.remove();
  });

  document.body.appendChild(button);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.error("No se pudo registrar el service worker:", error);
    });
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  createInstallButton();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;

  const button = document.getElementById("install-app-btn");
  if (button) button.remove();
});