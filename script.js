const countdownEl = document.getElementById('countdown');
const countdownPanelEl = document.getElementById('countdownCenter');
const newYearLetter = document.getElementById('newYearLetter');
const targetDate = new Date('January 1, 2026 0:00:00').getTime();
const enterBtn = document.getElementById('enterBtn');
const mainContent = document.getElementById('mainContent');
const openingScreen = document.getElementById('openingScreen');

let countdownInterval = null;

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if(distance <= 0) {
    countdownPanelEl.style.display = 'none';
    newYearLetter.style.display = 'block';
    countdownEl.textContent = "Happy New Year!";
    clearInterval(countdownInterval);
  } else {
    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);

    const text = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    countdownEl.textContent = text;
    countdownPanelEl.textContent = text;
    countdownPanelEl.style.display = 'block';
    newYearLetter.style.display = 'none';
  }
}

// Open main content
enterBtn.addEventListener('click', () => {
  openingScreen.style.opacity = 0;
  setTimeout(() => {
    openingScreen.style.display = 'none';
    mainContent.style.display = 'block';
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    showPanel(null);
  }, 800);
});

// Panels
const actionButtons = document.getElementById('actionButtons');
const homeBtn = document.getElementById('homeBtn');

const panels = {
  lettersBtn: 'lettersPanel',
  musicBtn: 'musicPanel',
  videosBtn: 'videosPanel',
  countdownBtn: 'countdownPanel'
};

function showPanel(panelId) {
  document.querySelectorAll('.fullscreenPanel').forEach(p => {
    p.style.display = 'none';
  });

  if(panelId) {
    const panel = document.getElementById(panelId);
    panel.style.display = 'flex';
    actionButtons.style.top = '10px';
  } else {
    actionButtons.style.top = '500px';
  }
}

// Button click events
Object.keys(panels).forEach(btnId => {
  document.getElementById(btnId).addEventListener('click', () => {
    showPanel(panels[btnId]);
  });
});

homeBtn.addEventListener('click', () => {
  showPanel(null);
});
