import * as THREE from 'three';
import ViewMediator from './ViewMediator';

export default class ArrowViewMediator extends ViewMediator {
  constructor(arrow, viewMediator){
    super(arrow, viewMediator)
  }

  makeObject3D() {
    const container = new THREE.Object3D();

    new THREE.ObjectLoader().load('/data/objects/arrow.json', function(arrow){
      arrow.scale.multiplyScalar(0.5);
      arrow.rotation.x = THREE.Math.degToRad(90);
      arrow.position.z = -2;
      arrow.position.y = -1;
      container.add(arrow);
    });

    return container;
  }

  onFrameRendered(){
    super.onFrameRendered();
    this.object3D.rotation.y = THREE.Math.degToRad(this.model.direction);
    this.object3D.visible = this.model.visible;
  }

}
