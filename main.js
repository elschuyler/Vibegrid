import { Controls } from './controls.js';

const state = {
  gameLoaded: false
};

// Initialize Controls
Controls.init();

// Overlay Menu Logic
window.toggleMenu = () => {
  const menu = document.getElementById(
    'vibe-menu'
  );
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
};

window.saveState = () => {
  console.log("Saving to Scribe's Ledger...");
  // Will connect to scribe-ledger.js later
  window.toggleMenu();
};

window.loadState = () => {
  console.log("Loading from Ledger...");
  // Will connect to scribe-ledger.js later
  window.toggleMenu();
};

window.quitGame = () => {
  const screen = document.getElementById(
    'vibe-screen'
  );
  // Destroy iframe content to free RAM
  screen.srcdoc = '';
  
  // Close menu
  window.toggleMenu();
  console.log("Game Quit. RAM Purged.");
};

// RAM Monitor
function updateStats() {
  const ramMeter = document.getElementById(
    'ram-meter'
  );
  if (performance && performance.memory) {
    const used = Math.round(
      performance.memory.usedJSHeapSize 
      / 1024 / 1024
    );
    ramMeter.style.color = used > 80 ? 
      "red" : "var(--glow-green)";
    ramMeter.innerText = `RAM: ${used}/100MB`;
  }
  setTimeout(() => {
    requestAnimationFrame(updateStats);
  }, 500);
}

updateStats();
