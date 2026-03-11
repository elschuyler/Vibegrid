import { Controls } from './controls.js';

// Global VibeGrid Shell State
const state = {
  gameLoaded: false,
  memoryInterval: null
};

// 1. Initialize Virtual D-Pad & Buttons
Controls.init();

// 2. Placeholder for Scribe's Ledger
// (Save States / Load / Quit Menu)
window.toggleMenu = () => {
  console.log(
    "Menu Toggled: Save State Placeholder"
  );
  // Phase 7 will build the overlay UI
  // for saving and exiting the ROMZ.
};

// 3. Shell Performance Monitoring
// Keeps an eye on the 100MB RAM limit
function updateStats() {
  const ramMeter = document.getElementById(
    'ram-meter'
  );
  
  // Measure WebView memory if available
  if (performance && performance.memory) {
    const used = Math.round(
      performance.memory.usedJSHeapSize 
      / 1024 / 1024
    );
    // Alert if approaching 3GB device limits
    if (used > 80) {
      ramMeter.style.color = "red";
    } else {
      ramMeter.style.color = "var(--glow-green)";
    }
    
    ramMeter.innerText = `RAM: ${used}/100MB`;
  }
  
  // Update twice a second to save CPU
  setTimeout(() => {
    requestAnimationFrame(updateStats);
  }, 500);
}

// Start monitoring the shell
updateStats();
