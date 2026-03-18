(function() {
 const log = (m) => document.getElementById('sys-log').innerText = "SYS: " + m;
 log("BOOTING...");

 document.addEventListener('DOMContentLoaded', () => {
  try {
   const sidebar = document.getElementById('sys-sidebar');
   const overlay = document.getElementById('sidebar-overlay');
   
   // Menu Controls
   document.getElementById('btn-hamburger').onclick = () => {
    sidebar.classList.remove('closed');
    overlay.classList.remove('hidden');
   };

   overlay.onclick = () => {
    sidebar.classList.add('closed');
    overlay.classList.add('hidden');
   };

   // View Switching
   const vault = document.getElementById('library-view');
   const game = document.getElementById('game-container');
   
   document.getElementById('btn-vault').onclick = () => {
    vault.classList.remove('hidden');
    game.classList.add('hidden');
   };

   document.getElementById('btn-menu').onclick = () => {
    vault.classList.add('hidden');
    game.classList.remove('hidden');
   };

   // ZIP Input Logic
   const input = document.createElement('input');
   input.type = 'file';
   input.accept = '.zip';
   
   document.getElementById('fab-add').onclick = () => {
    log("OPENING_SCANNER");
    input.click();
   };

   input.onchange = async (e) => {
    const file = e.target.files[0];
    log("FILE: " + file.name);
    // Unzip logic will go here in Phase 17 once buttons work
    alert("Logic Connected. Ready for fflate implementation.");
   };

   log("BOOT_OK");
  } catch (err) {
   log("FATAL: " + err.message);
  }
 });
})();
