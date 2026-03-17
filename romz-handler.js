import * as fflate from 'fflate';

export function unpackArchive(file, onComplete) {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const buffer = e.target.result;
    const uint8Array = new Uint8Array(buffer);
    
    fflate.unzip(uint8Array, (err, files) => {
      if (err) {
        console.error("Unpack Failed:", err);
        return;
      }
      onComplete(files);
    });
  };
  
  reader.readAsArrayBuffer(file);
}

export function bootCartridge(files) {
  let htmlContent = null;
  
  // Scan the unpacked files for the main entry
  for (const path in files) {
    if (path.endsWith('index.html')) {
      const fileData = files[path];
      const decoder = new TextDecoder();
      htmlContent = decoder.decode(fileData);
      break;
    }
  }

  if (!htmlContent) {
    alert("SYS_ERR: Missing index.html");
    return null;
  }

  // Project the HTML into a local memory object
  const blob = new Blob(
    [htmlContent], 
    { type: 'text/html' }
  );
  return URL.createObjectURL(blob);
}
