import { Controls } from './controls.js';
import { Vault } from './vault.js';
import { loadRomz } from './romz-handler.js';

await Vault.init();
renderLibrary();
Controls.init();

// Toggle the Numpad Grid
window.toggleNumpad = () => {
  const num = document.getElementById(
    'numpad-overlay'
  );
  num.classList.toggle('hidden');
};

// ... (Rest of previous main.js logic)
