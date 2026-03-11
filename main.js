import { Controls } from './controls.js';
import { Vault } from './vault.js';
import { loadRomz } from './romz-handler.js';

await Vault.init();
renderLibrary();
Controls.init();

function renderLibrary() {
  Vault.getAll().then(apps => {
    const list = document.getElementById(
      'lib-list');
    list.innerHTML = apps.map(app => `
      <div class="lib-item" 
      onclick="launchApp('${app.id}')">
        <div class="lib-icon"></div>
        <div class="lib-info">
          <div class="lib-name">
          ${app.name}</div>
          <div class="lib-meta">
          ROMZ Package</div>
        </div>
        <button class="lib-del" 
        onclick="event.stopPropagation(); 
        deleteApp('${app.id}')">×</button>
      </div>
    `).join('');
  });
}

window.launchApp = async (id) => {
  const apps = await Vault.getAll();
  const app = apps.find(a => a.id === id);
  if (app) {
    loadRomz(app.blob);
    document.getElementById('library-view')
      .classList.add('hidden');
  }
};

window.deleteApp = async (id) => {
  if (confirm('Delete app?')) {
    await Vault.remove(id);
    renderLibrary();
  }
};

window.showLibrary = () => {
  document.getElementById('library-view')
    .classList.toggle('hidden');
};

window.pickNewRomz = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.romz,.zip';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const id = Date.now().toString();
      await Vault.save(id, file.name, file);
      renderLibrary();
    }
  };
  input.click();
};

window.toggleMenu = () => {
  document.getElementById('vibe-menu')
    .classList.toggle('hidden');
};

window.quitGame = () => {
  document.getElementById('vibe-screen')
    .srcdoc = '';
  window.toggleMenu();
};
