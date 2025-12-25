/* =========================
   DOM ELEMENTS
========================= */
const selectView = document.getElementById("selectView");
const statusView = document.getElementById("statusView");
const resetBtn = document.getElementById("resetBtn");

const statusIcon = document.getElementById("statusIcon");
const statusTitle = document.getElementById("statusTitle");
const statusDesc = document.getElementById("statusDesc");

const buttonGroup = document.getElementById("buttonGroup");
const customWrapper = document.getElementById("customWrapper");
const customInput = document.getElementById("customInput");
const customSubmit = document.getElementById("customSubmit");

/* =========================
   INIT
========================= */
function init() {
  renderStatusButtons();
  bindEvents();
}

init();

/* =========================
   RENDER
========================= */
function renderStatusButtons() {
  buttonGroup.innerHTML = "";

  STATUS_LIST.forEach((status) => {
    const btn = document.createElement("button");
    btn.className = "status-btn";
    btn.type = "button";
    btn.textContent = `${status.icon} ${status.title}`;
    btn.addEventListener("click", () => handleSelect(status));

    buttonGroup.appendChild(btn);
  });
}

/* =========================
   HANDLER
========================= */
function handleSelect(status) {
  if (status.id === "custom") {
    showCustomInput();
    return;
  }

  showStatus(status.icon, status.title, status.desc);
}

function showCustomInput() {
  customWrapper.classList.remove("hidden");
  customInput.focus();
}

function submitCustom() {
  const value = customInput.value.trim();
  if (!value) return;

  showStatus("✍️", "IZIN", value);
}

/* =========================
   VIEW CONTROL
========================= */
function showStatus(icon, title, desc) {
  statusIcon.textContent = icon;
  statusTitle.textContent = title;
  statusDesc.textContent = desc;

  selectView.classList.add("hidden");
  statusView.classList.remove("hidden");
  resetBtn.classList.remove("hidden");

  document.body.classList.add("tv-mode");

  requestFullscreen();
}

function resetStatus() {
  statusView.classList.add("hidden");
  selectView.classList.remove("hidden");
  resetBtn.classList.add("hidden");

  customWrapper.classList.add("hidden");
  customInput.value = "";

  document.body.classList.remove("tv-mode");
}

/* =========================
   EVENTS
========================= */
function bindEvents() {
  resetBtn.addEventListener("click", resetStatus);

  customSubmit.addEventListener("click", submitCustom);

  customInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitCustom();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key.toLowerCase() === "r") {
      resetStatus();
    }
  });
}

/* =========================
   UTIL
========================= */
function requestFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }
}
