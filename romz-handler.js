import * as fflate from 'fflate';

export function unpackArchive(file, onComplete) {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const buffer = e.target.result;
    const uint8Array = new Uint8Array(buffer);
    
    // Background extraction prevents UI freezing
    fflate.unzip(uint8Array, (err, files) => {
      if (err) {
        console.error("Unpack Failed:", err);
        return;
      }
      
      // 'files' is an object containing every
      // piece of data found in the archive
      onComplete(files);
    });
  };
  
  // Start reading the vacuum-sealed file
  reader.readAsArrayBuffer(file);
}
