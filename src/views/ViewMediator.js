import * as THREE from 'three';
import Observable from '../lib/Observable';

export default class ViewMediator extends Observable {

  constructor(world) {
    super();
    this.object3D = this.makeObject3D();
  }

  makeObject3D() {
    const container = new THREE.Object3D();
    container.add(new THREE.Object3D());
    return container;
  }

  onFrameRendered() {
    // dont do anything yet
  }


}
