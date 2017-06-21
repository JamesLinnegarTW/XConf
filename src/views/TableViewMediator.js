import ViewMediator from './ViewMediator';

export default class TableViewMediator extends ViewMediator {
  constructor(table, viewMediator){
    super(table, viewMediator);
  }

  makeObject3D() {
    const container = new THREE.Object3D();

    var loader = new THREE.ObjectLoader();
    loader.load('/data/objects/table.json', function(object){
      container.add(object);
    });

    container.scale.multiplyScalar(6);
    container.position.set(6, -11, 30);
    container.rotateY(THREE.Math.degToRad(85));

    return container;
  }

  onFrameRendered() {
    super.onFrameRenderered();
  }
}
