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
  const blobMap = {};

  // 1. Separate HTML and map assets to Blobs
  for (const path in files) {
    if (path.endsWith('index.html')) {
      const decoder = new TextDecoder();
      htmlContent = decoder.decode(files[path]);
    } else {
      // Determine basic file types
      let mime = 'application/octet-stream';
      if (path.endsWith('.css')) {
        mime = 'text/css';
      } else if (path.endsWith('.js')) {
        mime = 'application/javascript';
      }
      
      const fileBlob = new Blob(
        [files[path]], 
        { type: mime }
      );
      blobMap[path] = URL.createObjectURL(
        fileBlob
      );
    }
  }

  if (!htmlContent) {
    alert("SYS_ERR: Missing index.html");
    return null;
  }

  // 2. Rewire HTML links to point to Memory Blobs
  for (const [path, url] of Object.entries(
    blobMap
  )) {
    const filename = path.split('/').pop();
    
    // Swap full paths
    htmlContent = htmlContent
      .split(path).join(url);
      
    // Swap isolated filenames just in case
    if (path !== filename) {
      htmlContent = htmlContent
        .split(filename).join(url);
    }
  }

  // 3. Project the final rewired HTML
  const finalBlob = new Blob(
    [htmlContent], 
    { type: 'text/html' }
  );
  return URL.createObjectURL(finalBlob);
    }
