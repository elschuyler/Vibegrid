import * as fflate from 'fflate';

export async function loadRomz(file) {
  const buffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(buffer);
  
  // Memory-efficient decompression
  fflate.unzip(uint8, (err, unzipped) => {
    if (err) {
      console.error("ROMZ Corrupt");
      return;
    }

    // Look for manifest.json
    const manifestData = unzipped['manifest.json'];
    if (manifestData) {
      const manifest = JSON.parse(
        fflate.strFromU8(manifestData)
      );
      console.log("Loading:", manifest.title);
      // Pass unzipped assets to Three.js
      setupGame(unzipped, manifest);
    }
  });
}

function setupGame(assets, manifest) {
  // Logic to inject game.js 
  // and load assets will be 
  // in Phase 4.
}
