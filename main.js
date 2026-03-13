import { Controls } from './controls.js';
import { Vault } from './vault.js';
import { loadRomz } from './romz-handler.js';

// ... [Keep all your existing 800+ lines of logic here] ...

/**
 * BOOTSTRAPPER
 * We wrap this in an async function to prevent 
 * the 'Top-Level Await' build error.
 */
async function bootSystem() {
  try {
    // 1. Load Secure Vault
    await Vault.init();
    
    // 2. Build Library UI
    renderLibrary();
    
    // 3. Start Input Listeners
    Controls.init();
    
    console.log("VibeGrid: Core Online.");
  } catch (e) {
    console.error("VibeGrid: Boot Error", e);
  }
}

// Fire the boot sequence
bootSystem();

// UI Global Methods
window.toggleNumpad = () => {
  const num = document.getElementById(
    'numpad-overlay'
  );
  num.classList.toggle('hidden');
};
