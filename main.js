import { unpackArchive } from './romz-handler.js';

document.addEventListener('DOMContentLoaded', 
  () => {
    // Core Elements
    const fab = document.getElementById('fab-add');
    const libView = document.getElementById(
      'library-view'
    );
    const statusNode = document.getElementById(
      'title-node'
    );
    
    // Sidebar Elements
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

    // Sidebar Logic
    function toggleMenu() {
      sidebar.classList.toggle('closed');
      overlay.classList.toggle('hidden');
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    clearBtn.addEventListener('click', () => {
      libView.innerHTML = ''; // Wipe nodes
      statusNode.textContent = "SYS: CLEARED";
      toggleMenu(); // Close sidebar
    });

    // File Scanner Logic
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

      statusNode.textContent = "SYS: SCANNING...";

      unpackArchive(file, (unpackedFiles) => {
        statusNode.textContent = "SYS: ONLINE";
        
        Object.keys(unpackedFiles).forEach(name => {
          createGridNode(name, libView);
        });
      });
    });

    function createGridNode(name, container) {
      const item = document.createElement('div');
      item.className = 'lib-item';
      
      const icon = document.createElement('div');
      icon.className = 'lib-icon';
      icon.textContent = "[]";
      
      const details = document.createElement('div');
      details.style.marginLeft = '15px';
      details.innerHTML = `
        <div style="font-weight: bold; 
             font-size: 12px;">${name}</div>
        <div style="font-size: 10px; 
             opacity: 0.7;">MEM_BLOCK: OK</div>
      `;
      
      item.appendChild(icon);
      item.appendChild(details);
      container.appendChild(item);
    }
});
