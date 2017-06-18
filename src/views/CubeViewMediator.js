import * as THREE from 'three';
import ViewMediator from './ViewMediator';

export default class CubeViewMediator extends ViewMediator {
  constructor(cube, viewMediator){
    super(cube, viewMediator);
  }

  makeObject3D(){

    const container = new THREE.Object3D();

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshBasicMaterial( { color: 0xFF00FF })
    );

    const vec = new THREE.Vector3();

    vec.fromArray(this.model.vectorArray)
    cube.position.copy( vec );
    container.add(cube);

    return container;
  }

  onFrameRendered(){
    super.onFrameRendered();
  }
}
