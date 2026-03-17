(function() {
 const $ = (id) => document.getElementById(id);
 
 // UI Elements
 const sidebar = $('sys-sidebar');
 const overlay = $('sidebar-overlay');
 const modal = $('settings-modal');
 
 // --- Sidebar Logic ---
 $('btn-hamburger').onclick = () => {
  sidebar.classList.remove('closed');
  overlay.classList.remove('hidden');
 };
 
 overlay.onclick = () => {
  sidebar.classList.add('closed');
  overlay.classList.add('hidden');
 };
 
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

 // --- Navigation ---
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

 // --- ROM Engine ---
 const scanner = document.createElement('input');
 scanner.type = 'file';
 scanner.accept = '.zip';
 $('fab-add').onclick = () => scanner.click();

 scanner.onchange = (e) => {
  const file = e.target.files[0];
  if(!file) return;
  
  const reader = new FileReader();
  reader.onload = (ev) => {
   const data = new Uint8Array(ev.target.result);
   fflate.unzip(data, (err, files) => {
    if(err) return alert("ZIP FAIL");
    boot(files, file.name);
   });
  };
  reader.readAsArrayBuffer(file);
 };

 function boot(files, name) {
  let html = null;
  const blobs = {};
  
  for (const path in files) {
   const type = path.endsWith('.js') ? 
    'text/javascript' : path.endsWith('.css') ? 
    'text/css' : 'text/html';
   const b = new Blob([files[path]], {type});
   const url = URL.createObjectURL(b);
   if(path.endsWith('index.html')) html = files[path];
   blobs[path] = url;
  }

  if(!html) return alert("NO INDEX.HTML");
  
  let content = new TextDecoder().decode(html);
  for (const p in blobs) {
   content = content.split(p).join(blobs[p]);
  }
  
  const finalUrl = URL.createObjectURL(
   new Blob([content], {type:'text/html'})
  );
  
  $('game-screen').src = finalUrl;
  addToList(name, finalUrl);
  switchView('menu');
 }

 function addToList(name, url) {
  const div = document.createElement('div');
  div.style.padding = '20px';
  div.style.borderBottom = '1px solid #111';
  div.innerText = `> ${name.toUpperCase()}`;
  div.onclick = () => {
   $('game-screen').src = url;
   switchView('menu');
  };
  $('library-view').appendChild(div);
 }
})();
