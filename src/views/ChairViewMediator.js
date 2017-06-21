import ViewMediator from './ViewMediator';

export default class ChairViewMediator extends ViewMediator {
  constructor(chair, viewMediator){
    super(chair, viewMediator);
  }

  makeObject3D() {
    const container = new THREE.Object3D();

    var loader = new THREE.ObjectLoader();
    loader.load('/data/objects/chair.json', function(object){
      container.add(object);
    });

    container.scale.multiplyScalar(0.20);
    container.position.set(2, -11, 30);
    container.rotateY(THREE.Math.degToRad(270));

    return container;
  }

    onFrameRendered() {
      super.onFrameRendered();
    }
}
