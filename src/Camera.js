import * as THREE from 'three';

// Orbit
// https://github.com/mrdoob/three.js/blob/361490339a377cf65ad078cc6ff30123f9b4b217/examples/js/controls/OrbitControls.js

export default class Camera extends THREE.PerspectiveCamera {
  constructor() {
    const settings = {
      aspect: window.innerWidth / window.innerHeight,
      far: 30000,
      fov: 55,
      moveSpeed: 100.0,
      near: 1,
      rollSpeed: 5.0,
    };

    super(settings.fov, settings.aspect, settings.near, settings.far);

    this.moveState = {
      back: 0,
      down: 0,
      forward: 0,
      left: 0,
      mouse: 0,
      pitchDown: 0,
      pitchUp: 0,
      right: 0,
      rollLeft: 0,
      rollRight: 0,
      up: 0,
      yawLeft: 0,
      yawRight: 0,
    };

    const movement = new THREE.Vector3(0, 0, 0);
    const rotation = new THREE.Vector3(0, 0, 0);

    const updateMovement = () => {
      movement.x = -this.moveState.left + this.moveState.right;
      movement.y = -this.moveState.down + this.moveState.up;
      movement.z = -this.moveState.forward + this.moveState.back;
    }

    const updateRotation = () => {
      rotation.x = -this.moveState.pitchDown + this.moveState.pitchUp;
      rotation.y = -this.moveState.yawRight + this.moveState.yawLeft;
      rotation.z = -this.moveState.rollRight + this.moveState.rollLeft;
    };

    this.update = (deltaTime) => {
      // Movement
      const movementMultiplier = deltaTime * settings.moveSpeed;
      this.translateX(movement.x * movementMultiplier);
      this.translateY(movement.y * movementMultiplier);
      this.translateZ(movement.z * movementMultiplier);

      // Rotation
      const rotationMultiplier = deltaTime * settings.rollSpeed;
      const tempQuaternion = new THREE.Quaternion(
        rotation.x * rotationMultiplier,
        rotation.y * rotationMultiplier,
        rotation.z * rotationMultiplier,
        1
      );
      this.quaternion.multiply(tempQuaternion);

      this.dispatchEvent({
        type: 'change',
      });
    };

    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'ShiftLeft':
          this.movementSpeedMultiplier = 0.1;
          break;
        case 'ShiftRight':
          this.movementSpeedMultiplier = 0.1;
          break;
        case 'KeyW':
          this.moveState.forward = 1;
          break;
        case 'KeyS':
          this.moveState.back = 1;
          break;
        case 'KeyA':
          this.moveState.left = 1;
          break;
        case 'KeyD':
          this.moveState.right = 1;
          break;
        case 'KeyQ':
          this.moveState.rollLeft = 1;
          break;
        case 'KeyE':
          this.moveState.rollRight = 1;
          break;
      }

      updateMovement();
      updateRotation();
    };

    const handleKeyUp = (event) => {
      switch (event.code) {
        case 'ShiftLeft':
          this.movementSpeedMultiplier = 1;
          break;
        case 'ShiftRight':
          this.movementSpeedMultiplier = 1;
          break;
        case 'KeyW':
            this.moveState.forward = 0;
            break;
        case 'KeyS':
          this.moveState.back = 0;
          break;
        case 'KeyA':
          this.moveState.left = 0;
          break;
        case 'KeyD':
          this.moveState.right = 0;
          break;
        case 'KeyQ':
          this.moveState.rollLeft = 0;
          break;
        case 'KeyE':
          this.moveState.rollRight = 0;
          break;
      }

      updateMovement();
      updateRotation();
    };

    const handleMouseMove = (event) => {
      if (!this.moveState.mouse) {
        return;
      }

      const halfHeight = window.innerHeight / 2;
      const halfWidth = window.innerWidth / 2;
      const pageX = event.pageX;
      const pageY = event.pageY;
      const xOffset = 0;
      const yOffset = 0;

      this.moveState.yawLeft = -(pageX - xOffset - halfWidth) / halfWidth;
      this.moveState.pitchDown = (pageY - yOffset - halfHeight) / halfHeight;

      updateRotation();
    };

    const handleMouseDown = (event) => {
      if (event.button == 0) {
        this.moveState.mouse = 1;
      }
    }

    const handleMouseUp = (event) => {
      if (event.button == 0) {
        this.moveState.mouse = 0;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    this.dispose = () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }
}
