import * as THREE from 'three';
import DeviceOrientationControls from 'three-device-orientation';


export default class RenderingContext {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.controls = new DeviceOrientationControls( this.camera );
  }

  static getDefault(containerElement, color = [0, 0, 0]) {
    const width = window.innerWidth, height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, width / height, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  //  const ambientLight = new THREE.AmbientLight(0xffffff);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.target = new THREE.Vector3(-5, 0, 0);
    camera.lookAt(camera.target);
    console.log(color);
    const meshColor = new THREE.Color().fromArray(color);
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.1,0.1,0.1),
      new THREE.MeshBasicMaterial( {color:  meshColor } )
    );

    cube.position.z = -10;
    camera.add(cube);
    scene.add(camera);
    //scene.add(ambientLight);

    containerElement.appendChild(renderer.domElement);

    return new RenderingContext(scene, camera, renderer);
  }
}
