import * as THREE from 'three';
import Observable from '../lib/Observable';

export default class ViewMediator extends Observable {

  constructor(world) {
    super();
    this.world = world;

    this.world.addObserver("LocationUpdated", (e) => this.loadBackground(e));
    this.object3D = this.makeObject3D();

  }

  makeObject3D() {
    const container = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    const texture = new THREE.TextureLoader().load('/images/office-entrance.jpeg');
    const material = new THREE.MeshLambertMaterial(
      { map: texture,
        side: THREE.DoubleSide }
      );

    const mesh = new THREE.Mesh(geometry, material);
    container.add(mesh);
    window.test = mesh;
    return container;
  }

  loadBackground(background) {
    const worldSphere = this.object3D.children[0];
    const location = this.world.loction
    const texture = new THREE.TextureLoader().load('/images/' + background + '.jpeg');
    worldSphere.material.map = texture;
  }

  onFrameRendered() {
    // dont do anything yet
  }


}
