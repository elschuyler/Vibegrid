import * as THREE from 'three';
import { Controls } from './controls.js';

const state = {
  fps: 0,
  player: { x: 0, z: 0, speed: 0.1 }
};

// 1. Setup Renderer
const canvas = document.querySelector(
  '#vibe-canvas'
);
const renderer = new THREE.WebGLRenderer({ 
  canvas, antialias: false 
});
renderer.setSize(320, 240);

// 2. Scene & Grid Overlay
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);

// The "Technical Grid" visual
const grid = new THREE.GridHelper(20, 20, 
  0x00ff41, 0x002200);
scene.add(grid);

// 3. Camera (Fixed Top-Down GBA Style)
const camera = new THREE.PerspectiveCamera(
  60, 320/240, 0.1, 1000
);
camera.position.set(0, 10, 10);
camera.lookAt(0, 0, 0);

// 4. Player Placeholder (Cube)
const geo = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshBasicMaterial({ 
  color: 0x00ff41, wireframe: true 
});
const playerObj = new THREE.Mesh(geo, mat);
scene.add(playerObj);

// 5. Logic & Movement
Controls.init();

function animate() {
  requestAnimationFrame(animate);
  
  // GBA 4-Directional Movement
  if (Controls.up) state.player.z -= 
    state.player.speed;
  if (Controls.down) state.player.z += 
    state.player.speed;
  if (Controls.left) state.player.x -= 
    state.player.speed;
  if (Controls.right) state.player.x += 
    state.player.speed;

  playerObj.position.set(
    state.player.x, 0.5, state.player.z
  );
  
  // Keep camera locked on player
  camera.position.x = state.player.x;
  camera.position.z = state.player.z + 10;
  camera.lookAt(
    state.player.x, 0, state.player.z
  );

  renderer.render(scene, camera);
}

animate();
