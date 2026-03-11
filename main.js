import * as THREE from 'three';

// VibeGrid Engine State
const state = {
  fps: 0,
  memory: 0,
  clock: new THREE.Clock()
};

// 1. Initialize Renderer
const canvas = document.querySelector('#vibe-canvas');
const renderer = new THREE.WebGLRenderer({ 
  canvas, 
  antialias: false 
});
renderer.setSize(320, 240);

// 2. Scene Setup (Technical Grid)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);

const grid = new THREE.GridHelper(100, 20, 
  0x00ff41, 0x002200);
scene.add(grid);

// 3. Camera
const camera = new THREE.PerspectiveCamera(
  75, 320/240, 0.1, 1000
);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// 4. Optimization: Memory Cleanup
function cleanup() {
  scene.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(m => m.dispose());
      } else {
        obj.material.dispose();
      }
    }
  });
}

// 5. Render Loop
function animate() {
  requestAnimationFrame(animate);
  const delta = state.clock.getDelta();
  
  // Rotate grid for "vibe"
  grid.rotation.y += 0.1 * delta;
  
  renderer.render(scene, camera);
  
  // Update UI Stats
  document.getElementById('fps-counter')
    .innerText = `FPS: ${Math.round(1/delta)}`;
}

animate();
