import ViewMediator from './ViewMediator';

export default class ChairViewMediator extends ViewMediator {
  constructor(chair, viewMediator){
    super(chair, viewMediator);
  }

  makeObject3D() {
    const container = new THREE.Object3D();

    var loader = new THREE.ObjectLoader();
    loader.load('/data/objects/chair.json', function(object){
      object.scale.multiplyScalar(0.7);
      object.position.set(0, -50, -150);
      object.rotateY(THREE.Math.degToRad(45));

      container.add(object);
    });

    return container;
  }

    onFrameRendered() {
      super.onFrameRendered();
      //this.object3D.children[0].rotation.y += 0.01;
    }
}
