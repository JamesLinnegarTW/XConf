import * as THREE from 'three';
import DeviceOrientationControls from 'three-device-orientation';


export default class RenderingContext {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.controls = new DeviceOrientationControls( this.camera );
  }

  static getDefault(containerElement) {
    const width = window.innerWidth, height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, width / height, 1, 1100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.target = new THREE.Vector3(0, 0, 0);
    camera.lookAt(camera.target);


    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);


    containerElement.appendChild(renderer.domElement);

    return new RenderingContext(scene, camera, renderer);
  }
}
