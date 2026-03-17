import { unpackArchive, bootCartridge } 
  from './romz-handler.js';

document.addEventListener('DOMContentLoaded', 
  () => {
    const fab = document.getElementById('fab-add');
    const libView = document.getElementById(
      'library-view'
    );
    const gameContainer = document.getElementById(
      'game-container'
    );
    const gameScreen = document.getElementById(
      'game-screen'
    );
    const statusNode = document.getElementById(
      'title-node'
    );
    
    const btnVault = document.getElementById(
      'btn-vault'
    );
    const btnMenu = document.getElementById(
      'btn-menu'
    );

    const hamburger = document.getElementById(
      'btn-hamburger'
    );
    const sidebar = document.getElementById(
      'sys-sidebar'
    );
    const overlay = document.getElementById(
      'sidebar-overlay'
    );
    const clearBtn = document.getElementById(
      'btn-clear-history'
    );

    function switchView(view) {
      if (view === 'vault') {
        libView.classList.remove('hidden');
        gameContainer.classList.add('hidden');
        fab.classList.remove('hidden');
        
        btnVault.classList.add('active-key');
        btnMenu.classList.remove('active-key');
        statusNode.textContent = "SYS: VAULT";
      } else {
        libView.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        fab.classList.add('hidden'); 
        
        btnVault.classList.remove('active-key');
        btnMenu.classList.add('active-key');
        statusNode.textContent = "SYS: PLAYING";
      }
    }

    btnVault.addEventListener('click', () => 
      switchView('vault')
    );
    btnMenu.addEventListener('click', () => 
      switchView('menu')
    );

    switchView('vault');

    function toggleMenu() {
      sidebar.classList.toggle('closed');
      overlay.classList.toggle('hidden');
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    clearBtn.addEventListener('click', () => {
      libView.innerHTML = ''; 
      gameScreen.src = ''; // Kill running game
      statusNode.textContent = "SYS: CLEARED";
      toggleMenu(); 
    });

    const scanner = document.createElement('input');
    scanner.type = 'file';
    scanner.accept = '.zip,.pk3,.pak';
    scanner.style.display = 'none';
    document.body.appendChild(scanner);

    fab.addEventListener('click', () => {
      scanner.click();
    });

    scanner.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      statusNode.textContent = "SYS: UNPACKING...";

      unpackArchive(file, (unpackedFiles) => {
        statusNode.textContent = "SYS: READY";
        createGameNode(file.name, unpackedFiles);
      });
    });

    function createGameNode(name, filesData) {
      const item = document.createElement('div');
      item.className = 'lib-item';
      
      const icon = document.createElement('div');
      icon.className = 'lib-icon';
      icon.textContent = "[G]";
      
      const details = document.createElement('div');
      details.style.marginLeft = '15px';
      details.innerHTML = `
        <div style="font-weight: bold; 
             font-size: 12px;">${name}</div>
        <div style="font-size: 10px; 
             opacity: 0.7;">CART: LOADED</div>
      `;
      
      // Tap the node to inject the hologram
      item.addEventListener('click', () => {
        const gameUrl = bootCartridge(filesData);
        if (gameUrl) {
          gameScreen.src = gameUrl;
          switchView('menu');
        }
      });
      
      item.appendChild(icon);
      item.appendChild(details);
      libView.appendChild(item);
    }
});
