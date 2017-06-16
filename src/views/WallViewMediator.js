import * as THREE from 'three';
import ViewMediator from './ViewMediator';

export default class WallViewMediator extends ViewMediator {

  constructor(wall, viewMediator) {
    super(wall, viewMediator);
  }

  makeObject3D(){
    const container = new THREE.Object3D();

    var cube_geometry = new THREE.BoxGeometry( 0.1, 8, 11 );
    var cube_material = new THREE.MeshBasicMaterial( {color: 0xf4f0d7} );


    var cube = new THREE.Mesh( cube_geometry, cube_material );
    cube.position.set(-9,0,-12);
    container.add(cube);


    var cube = new THREE.Mesh( cube_geometry, cube_material );
    cube.position.set(-9,0,-29);
    container.add(cube);

    var cube = new THREE.Mesh( cube_geometry, cube_material );
    cube.position.set(8,0,-27);
    container.add(cube);

    var cube = new THREE.Mesh( cube_geometry, cube_material );
    cube.position.set(8,0,-27);
    container.add(cube);


    var cube = new THREE.Mesh( cube_geometry, cube_material );
    cube.position.set(8,0,-12);
    container.add(cube);

    return container;
  }
}
