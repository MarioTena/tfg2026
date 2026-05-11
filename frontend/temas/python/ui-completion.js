function showCompletionMessage(messageEl, text) {
  if (!messageEl) return;
  messageEl.textContent = text;
  messageEl.style.display = "block";
}

function hideElement(el) {
  if (!el) return;
  el.style.display = "none";
}

function showBadge({
  parent,
  badgeId,
  text,
  className = "btn btn-secondary"
}) {
  if (!parent) return null;

  let badge = document.getElementById(badgeId);

  if (!badge) {
    badge = document.createElement("span");
    badge.id = badgeId;
    badge.className = className;
    badge.textContent = text;
    parent.appendChild(badge);
  }

  return badge;
}

function hideButtonAndShowBadge(buttonEl, badgeId, badgeText) {
  if (!buttonEl) return;

  buttonEl.style.display = "none";

  showBadge({
    parent: buttonEl.parentNode,
    badgeId,
    text: badgeText
  });
}

function unlockNextButton(nextBtn, nextUrl, unlockedLabel = "Ir al siguiente bloque") {
  if (!nextBtn || !nextUrl) return;

  nextBtn.textContent = unlockedLabel;
  nextBtn.classList.remove("btn-disabled");
  nextBtn.href = nextUrl;
}