(function() {
 const logger = document.getElementById('sys-log');
 function log(msg) { logger.innerText = "SYS: " + msg; }
 
 log("INIT...");

 try {
  const $ = (id) => {
   const el = document.getElementById(id);
   if(!el) log("ERR: MISSING " + id);
   return el;
  };

  // UI Elements
  const sidebar = $('sys-sidebar');
  const overlay = $('sidebar-overlay');
  const modal = $('settings-modal');
  
  log("WIRING SIDEBAR...");

  $('btn-hamburger').addEventListener('click', () => {
   sidebar.classList.remove('closed');
   overlay.classList.remove('hidden');
   log("MENU OPEN");
  });

  overlay.addEventListener('click', () => {
   sidebar.classList.add('closed');
   overlay.classList.add('hidden');
  });

  $('btn-settings').onclick = () => {
   modal.classList.remove('hidden');
   sidebar.classList.add('closed');
   overlay.classList.add('hidden');
  };

  $('btn-close-settings').onclick = () => {
   modal.classList.add('hidden');
  };

  $('btn-copy').onclick = () => {
   $('prompt-box').select();
   document.execCommand('copy');
   $('btn-copy').innerText = 'COPIED!';
   setTimeout(() => {
    $('btn-copy').innerText = 'COPY PROMPT';
   }, 2000);
  };

  log("WIRING NAV...");

  const switchView = (v) => {
   if(v === 'vault') {
    $('library-view').classList.remove('hidden');
    $('game-container').classList.add('hidden');
    $('btn-vault').classList.add('active-key');
    $('btn-menu').classList.remove('active-key');
   } else {
    $('library-view').classList.add('hidden');
    $('game-container').classList.remove('hidden');
    $('btn-vault').classList.remove('active-key');
    $('btn-menu').classList.add('active-key');
   }
  };

  $('btn-vault').onclick = () => switchView('vault');
  $('btn-menu').onclick = () => switchView('menu');

  // Scanner check
  $('fab-add').onclick = () => {
   log("SCANNER REQ...");
   alert("Engine is ready. Please load fflate in next phase to unzip.");
  };

  log("BOOT_OK");
 } catch (e) {
  log("FATAL: " + e.message);
 }
})();
