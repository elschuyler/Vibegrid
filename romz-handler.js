import * as fflate from 'fflate';

const state = {
  activeUrls: []
};

export async function loadRomz(file) {
  const buf = await file.arrayBuffer();
  const u8 = new Uint8Array(buf);
  
  // 1. Wipe previous game from RAM
  cleanupMemory();

  // 2. Unzip file contents
  fflate.unzip(u8, (err, unzipped) => {
    if (err) {
      console.error("ROMZ Error");
      return;
    }
    injectGame(unzipped);
  });
}

function injectGame(files) {
  let indexHtml = '';
  const blobMap = {};

  // 3. Create Blob URLs for all assets
  for (const [path, data] of 
    Object.entries(files)) {
    
    // Skip directories
    if (data.length === 0) continue; 
    
    const ext = path.split('.').pop();
    const mime = getMime(ext);
    const blob = new Blob([data], {type: mime});
    const url = URL.createObjectURL(blob);
    
    state.activeUrls.push(url);
    blobMap[path] = url;

    // Isolate the main HTML file
    if (path.endsWith('index.html')) {
      indexHtml = fflate.strFromU8(data);
    }
  }

  // 4. Patch HTML asset paths
  let patchedHtml = indexHtml;
  for (const [path, url] of 
    Object.entries(blobMap)) {
    // Replace relative paths with Blob URLs
    // so AI code finds the assets
    const regex = new RegExp(path, 'g');
    patchedHtml = patchedHtml.replace(
      regex, url
    );
  }

  // 5. Mount to Iframe Sandbox
  const screen = document.getElementById(
    'vibe-screen'
  );
  screen.srcdoc = patchedHtml;
  console.log("Game Mounted. RAM secure.");
}

function getMime(ext) {
  const types = {
    'html': 'text/html',
    'js': 'text/javascript',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'glb': 'model/gltf-binary',
    'ogg': 'audio/ogg'
  };
  return types[ext] || 
    'application/octet-stream';
}

function cleanupMemory() {
  // Free device RAM aggressively
  state.activeUrls.forEach(url => 
    URL.revokeObjectURL(url)
  );
  state.activeUrls = [];
  
  const screen = document.getElementById(
    'vibe-screen'
  );
  if(screen) screen.srcdoc = '';
}

// Global hook for the UI
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
