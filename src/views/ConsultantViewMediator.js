import * as THREE from 'three';
import ViewMediator from './ViewMediator';

export default class ConsultantViewMediator extends ViewMediator {
  constructor(consultant, viewMediator){
    super(consultant, viewMediator);
  }

  makeObject3D() {
    const container = new THREE.Object3D();

    var loader = new THREE.ObjectLoader();
    loader.load('/data/objects/office-guy/office-guy.json', function(object){
      container.add(object);
    });

    container.scale.multiplyScalar(0.08);
    container.position.set(10, -11, -20);
    container.rotateY(THREE.Math.degToRad(185));

    return container;
  }

  onFrameRendered() {
    super.onFrameRenderered();
  }
}
