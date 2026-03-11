// Sandbox Touch Bridge Layer
export const Controls = {
  init() {
    const btns = document.querySelectorAll(
      '.d-btn, .a-btn'
    );
    
    btns.forEach(btn => {
      // Touch start (finger down)
      btn.addEventListener('touchstart', 
        (e) => this.sendInput(e, 'down'), 
        { passive: false }
      );
      // Touch end (finger up)
      btn.addEventListener('touchend', 
        (e) => this.sendInput(e, 'up'),
        { passive: false }
      );
      // Touch cancel (finger slid off)
      btn.addEventListener('touchcancel',
        (e) => this.sendInput(e, 'up'),
        { passive: false }
      );
    });
  },

  sendInput(e, state) {
    e.preventDefault(); 
    const key = e.target.dataset.key;
    if (!key) return;

    const screen = document.getElementById(
      'vibe-screen'
    );
    
    // Pierce the iframe sandbox securely
    if (screen && screen.contentWindow) {
      screen.contentWindow.postMessage({
        type: 'VIBE_INPUT',
        key: key,
        state: state
      }, '*');
    }
  }
};
