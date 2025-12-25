const selectView = document.getElementById('selectView');
const statusView = document.getElementById('statusView');
const resetBtn = document.getElementById('resetBtn');

const statusIcon = document.getElementById('statusIcon');
const statusTitle = document.getElementById('statusTitle');
const statusDesc = document.getElementById('statusDesc');

const buttonGroup = document.getElementById('buttonGroup');
const customInput = document.getElementById('customInput');

/* ===== RENDER BUTTON ===== */
STATUS_LIST.forEach(status => {
  const btn = document.createElement('button');
  btn.className = 'status-btn';
  btn.textContent = `${status.icon} ${status.title}`;
  btn.onclick = () => onSelect(status);
  buttonGroup.appendChild(btn);
});

/* ===== SELECT ===== */
function onSelect(status) {
  if (status.id === 'custom') {
    customInput.classList.remove('hidden');
    customInput.focus();
    return;
  }

  showStatus(status.icon, status.title, status.desc);
}

/* ===== CUSTOM ===== */
customInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && customInput.value.trim()) {
    showStatus('✍️', 'CUSTOM', customInput.value);
  }
});

/* ===== SHOW STATUS ===== */
function showStatus(icon, title, desc) {
  statusIcon.textContent = icon;
  statusTitle.textContent = title;
  statusDesc.textContent = desc;

  selectView.classList.add('hidden');
  statusView.classList.remove('hidden');
  resetBtn.classList.remove('hidden');

  document.body.classList.add('tv-mode');

  document.documentElement.requestFullscreen?.().catch(() => {});
}

/* ===== RESET ===== */
resetBtn.onclick = () => {
  statusView.classList.add('hidden');
  selectView.classList.remove('hidden');
  resetBtn.classList.add('hidden');

  customInput.classList.add('hidden');
  customInput.value = '';

  document.body.classList.remove('tv-mode');
};

/* ===== SHORTCUT ===== */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' || e.key.toLowerCase() === 'r') {
    resetBtn.click();
  }
});
