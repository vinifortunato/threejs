import * as THREE from 'three';
import Stats from 'stats.js';

// Settings
const settings = {
  stepsPerFrame: 5,
}

// Clock
const clock = new THREE.Clock();


// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Grid
const grid = new THREE.GridHelper(50, 50, 0xffffff, 0x555555);
scene.add(grid);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
document.body.appendChild(renderer.domElement);

// Stats
const stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

// Keys
const keyStates = {};
document.addEventListener('keydown', (event) => {
  keyStates[event.code] = true;
});
document.addEventListener('keyup', (event) => {
  keyStates[event.code] = false;
});

// Window
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// Player
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const handleControls = () => {}

const update = () => {
  const deltaTime = Math.min(0.05, clock.getDelta()) / settings.stepsPerFrame;

  for (let i=0; i<settings.stepsPerFrame; i++) {
    handleControls(deltaTime);
  }

  renderer.render(scene, camera);

  stats.update();

  requestAnimationFrame(update);
}

update();
