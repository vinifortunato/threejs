import * as THREE from 'three';
import Stats from 'stats.js';
import Camera from './Camera';
import Player from './Player';
import Skybox from './Skybox';

// Settings
const settings = {
  stepsPerFrame: 5,
};

// Clock
const clock = new THREE.Clock();

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Grid
const grid = new THREE.GridHelper(50, 50, 0xffffff, 0x555555);
scene.add(grid);

// Camera
const camera = new Camera();
camera.position.set(0, 0, 50);

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
};
window.addEventListener('resize', onWindowResize);

// Player
const player = new Player();
scene.add(player);

// Skybox
const skybox = new Skybox();
scene.add(skybox);

// Update
const update = () => {
  const deltaTime = Math.min(0.05, clock.getDelta()) / settings.stepsPerFrame;

  camera.update(deltaTime);
  renderer.render(scene, camera);
  stats.update();

  requestAnimationFrame(update);
};

update();
