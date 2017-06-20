

export default class RenderingContext {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.controls = new THREE.VRControls(this.camera);

    this.effect = new THREE.VREffect(this.renderer);
    this.effect.setSize(window.innerWidth, window.innerHeight);
  }

  static getDefault(containerElement, color = [0, 0, 0]) {
    const width = window.innerWidth, height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, width / height, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const ambientLight = new THREE.AmbientLight(0xffffff);

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(width, height);

    camera.target = new THREE.Vector3(-5, 0, 0);
    camera.lookAt(camera.target);
    console.log(color);
    const meshColor = new THREE.Color().fromArray(color);
    const pointer = new THREE.Mesh(
      new THREE.SphereGeometry(0.05,16,16),
      new THREE.MeshBasicMaterial( {color:  meshColor } )
    );

    pointer.position.z = -5;
    camera.add(pointer);
    scene.add(camera);
    scene.add(ambientLight);

    containerElement.appendChild(renderer.domElement);

    return new RenderingContext(scene, camera, renderer);
  }
}
