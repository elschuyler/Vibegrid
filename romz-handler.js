// Local ROMZ Processing logic
export function initFilePicker() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.romz,.zip';
  
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log(`Loading: ${file.name}`);
    // Logic for unzipping and 
    // passing to Three.js scene
    // will go here in Phase 3.
  };

  return input;
}

// Trigger via UI Library button
window.toggleLibrary = () => {
  const picker = initFilePicker();
  picker.click();
};
