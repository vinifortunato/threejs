import * as THREE from 'three';

export default class Player extends THREE.Object3D {
  constructor() {
    super();

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.attach(cube);
  }
}
