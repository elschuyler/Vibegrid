import { unpackArchive } } from './romz-handler.js';

document.addEventListener('DOMContentLoaded', 
  () => {
    const fab = document.getElementById('fab-add');
    const libView = document.getElementById(
      'library-view'
    );
    
    // Create hidden file scanner
    const scanner = document.createElement('input');
    scanner.type = 'file';
    scanner.accept = '.zip,.pk3,.pak';
    scanner.style.display = 'none';
    document.body.appendChild(scanner);

    // Open hangar doors on click
    fab.addEventListener('click', () => {
      scanner.click();
    });

    // Handle incoming cargo
    scanner.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Update status node
      const status = document.getElementById(
        'title-node'
      );
      status.textContent = "SYS: SCANNING...";

      unpackArchive(file, (unpackedFiles) => {
        status.textContent = "SYS: ONLINE";
        
        // Convert each unpacked file into a node
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
