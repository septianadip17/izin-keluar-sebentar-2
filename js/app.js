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

const marqueeText = document.querySelector(".marquee-text");

/* =========================
   CONFIG
========================= */
const WA_NUMBER = window.APP_CONFIG?.WA_NUMBER ?? "-";
const { STATUS_LIST } = window.APP_CONFIG;


/* =========================
   INIT
========================= */
init();

function init() {
  renderStatusButtons();
  bindEvents();
  updateMarquee();
}

/* =========================
   RENDER
========================= */
function renderStatusButtons() {
  buttonGroup.innerHTML = "";

  STATUS_LIST.forEach((status) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "status-btn";
    btn.textContent = `${status.icon} ${status.title}`;
    btn.onclick = () => handleSelect(status);

    buttonGroup.appendChild(btn);
  });
}

/* =========================
   HANDLER
========================= */
function handleSelect(status) {
  hideCustomInput();

  if (status.id === "custom") {
    showCustomInput();
    return;
  }

  showStatus({
    icon: status.icon,
    title: status.title,
    desc: status.desc,
  });
}

function showCustomInput() {
  customWrapper.classList.remove("hidden");
  customInput.value = "";
  customInput.focus();
}

function hideCustomInput() {
  customWrapper.classList.add("hidden");
}

function submitCustom() {
  const value = customInput.value.trim();
  if (!value) return;

  showStatus({
    icon: "✍️",
    title: "IZIN",
    desc: value,
  });
}

/* =========================
   VIEW CONTROL
========================= */
function showStatus({ icon, title, desc }) {
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

  hideCustomInput();
  customInput.value = "";

  document.body.classList.remove("tv-mode");
}

/* =========================
   EVENTS
========================= */
function bindEvents() {
  resetBtn.onclick = resetStatus;
  customSubmit.onclick = submitCustom;

  customInput.onkeydown = (e) => {
    if (e.key === "Enter") submitCustom();
  };

  document.onkeydown = (e) => {
    if (e.key === "Escape" || e.key.toLowerCase() === "r") {
      resetStatus();
    }
  };
}

/* =========================
   UTIL
========================= */
function requestFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }
}

function updateMarquee() {
  marqueeText.textContent = `Terima kasih 🙏 Jika urgent silakan hubungi WhatsApp ${WA_NUMBER}`;
}
