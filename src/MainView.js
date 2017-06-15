import * as THREE from 'three';


import RenderingContext from './RenderingContext';

export default class MainView {
  constructor(){
    this.renderingContext = this.createRenderingContext();
    window.addEventListener( 'resize' , (e) => this.onWindowResize(), false);
  }

  initialize() {
    const scene = this.renderingContext.scene;
    scene.add(this.createWorld());
    scene.add(this.createCube());
    this.render();
  }

  createCube(){
    const geometry = new THREE.BoxGeometry(1, 3, 1);
    const material = new THREE.MeshNormalMaterial();

    const cube = new THREE.Mesh(geometry, material);
    cube.position.z = -5;
    return cube;
  }

  createWorld(){
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    const texture = new THREE.TextureLoader().load('/pano1.jpg');
    const material = new THREE.MeshLambertMaterial(
      { map: texture,
        side: THREE.DoubleSide }
      );
    let material_color = new THREE.MeshBasicMaterial( {color: 0xffff00,   side: THREE.DoubleSide} );

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z= -5;
    return mesh;
  }


  createRenderingContext() {
    const domContainer = document.createElement('div');
    document.body.appendChild(domContainer);
    return RenderingContext.getDefault(domContainer);
  }

  onFrameRendered() {
    // something
  }

  onWindowResize(){
    this.renderingContext.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderingContext.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderingContext.camera.updateProjectionMatrix();
  }

  render() {
    this.renderingContext.controls.update();
    this.onFrameRendered();
    this.renderingContext.renderer.render(this.renderingContext.scene,
                                          this.renderingContext.camera);
    requestAnimationFrame(()=>this.render());

  }

}
