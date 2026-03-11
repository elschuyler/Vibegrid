// GBA-Style Input Handler
export const Controls = {
  up: false, down: false,
  left: false, right: true,
  a: false, b: false,
  
  init() {
    // Keyboard Listeners
    window.addEventListener('keydown', 
      e => this.update(e.key, true));
    window.addEventListener('keyup', 
      e => this.update(e.key, false));
  },

  update(key, isPressed) {
    switch(key.toLowerCase()) {
      case 'w': case 'arrowup': 
        this.up = isPressed; break;
      case 's': case 'arrowdown': 
        this.down = isPressed; break;
      case 'a': case 'arrowleft': 
        this.left = isPressed; break;
      case 'd': case 'arrowright': 
        this.right = isPressed; break;
      case 'z': case 'j': 
        this.a = isPressed; break;
      case 'x': case 'k': 
        this.b = isPressed; break;
    }
  }
};
