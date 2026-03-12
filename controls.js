export const Controls = {
  init() {
    // Select all buttons including numpad
    const btns = document.querySelectorAll(
      '.d-btn, .a-btn, .n-btn'
    );
    
    btns.forEach(btn => {
      btn.addEventListener('touchstart', 
        (e) => this.sendInput(e, 'down'), 
        { passive: false }
      );
      btn.addEventListener('touchend', 
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
    
    if (screen && screen.contentWindow) {
      screen.contentWindow.postMessage({
        type: 'VIBE_INPUT',
        key: key,
        state: state
      }, '*');
    }
  }
};
