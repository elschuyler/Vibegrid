document.addEventListener('DOMContentLoaded', 
  () => {
    const fab = document.getElementById('fab-add');
    const libView = document.getElementById(
      'library-view'
    );
    let nodeCount = 0;

    fab.addEventListener('click', () => {
      nodeCount++;
      
      // Create the glowing container
      const item = document.createElement('div');
      item.className = 'lib-item';
      
      // Create the terminal icon
      const icon = document.createElement('div');
      icon.className = 'lib-icon';
      icon.textContent = `[${nodeCount}]`;
      
      // Create the node data text
      const details = document.createElement('div');
      details.style.marginLeft = '15px';
      details.innerHTML = `
        <div style="font-weight: bold;">
          DATA_NODE_${nodeCount}
        </div>
        <div style="font-size: 10px; 
             opacity: 0.7; 
             margin-top: 4px;">
          SYS_STATUS: ACTIVE
        </div>
      `;
      
      // Assemble and inject
      item.appendChild(icon);
      item.appendChild(details);
      libView.appendChild(item);
    });
});
