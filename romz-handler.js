import * as fflate from 'fflate';

const state = {
  activeUrls: []
};

export async function loadRomz(file) {
  const buf = await file.arrayBuffer();
  const u8 = new Uint8Array(buf);
  
  cleanupMemory();

  fflate.unzip(u8, (err, unzipped) => {
    if (err) {
      console.error("VibeGrid: ROMZ Error", err);
      return;
    }
    injectGame(unzipped);
  });
}

function injectGame(files) {
  let indexHtml = '';
  const blobMap = {};

  for (const [path, data] of 
    Object.entries(files)) {
    if (data.length === 0) continue; 
    
    const ext = path.split('.').pop();
    const mime = getMime(ext);
    const blob = new Blob([data], {type: mime});
    const url = URL.createObjectURL(blob);
    
    state.activeUrls.push(url);
    blobMap[path] = url;

    if (path.endsWith('index.html')) {
      indexHtml = fflate.strFromU8(data);
    }
  }

  const inputBridge = `
    <script>
      window.addEventListener('message', e => {
        if(e.data && e.data.type==='VIBE_INPUT'){
          const ev = new KeyboardEvent(
            e.data.state === 'down' ? 
            'keydown' : 'keyup', 
            { key: e.data.key }
          );
          window.dispatchEvent(ev);
        }
      });
    </script>
  `;

  let patchedHtml = indexHtml;
  
  // Sort paths longest first to prevent 
  // partial substring replacement bugs
  const sortedPaths = Object.keys(blobMap)
    .sort((a, b) => b.length - a.length);

  for (const path of sortedPaths) {
    // Escape special regex characters in path
    const safePath = path.replace(
      /[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'
    );
    const regex = new RegExp(safePath, 'g');
    patchedHtml = patchedHtml.replace(
      regex, blobMap[path]
    );
  }

  patchedHtml = patchedHtml.replace(
    '</head>', 
    `${inputBridge}</head>`
  );

  const screen = document.getElementById(
    'vibe-screen'
  );
  if (screen) {
    screen.srcdoc = patchedHtml;
    console.log("Game Mounted via fflate.");
  }
}

function getMime(ext) {
  const types = {
    'html': 'text/html', 'js': 'text/javascript',
    'css': 'text/css', 'png': 'image/png',
    'jpg': 'image/jpeg', 'ogg': 'audio/ogg',
    'glb': 'model/gltf-binary'
  };
  return types[ext] || 
    'application/octet-stream';
}

function cleanupMemory() {
  state.activeUrls.forEach(url => 
    URL.revokeObjectURL(url)
  );
  state.activeUrls = [];
  const screen = document.getElementById(
    'vibe-screen'
  );
  if(screen) screen.srcdoc = '';
}

window.toggleLibrary = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.romz,.zip';
  input.onchange = (e) => {
    if(e.target.files[0]) {
      loadRomz(e.target.files[0]);
    }
  };
  input.click();
};
