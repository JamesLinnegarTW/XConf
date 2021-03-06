import ViewMediator from './ViewMediator';

export default class WorldViewMediator extends ViewMediator {

  constructor(world, mediatorFactory) {
    super(world, mediatorFactory);
    this.world = world;

    this.object3D = this.makeObject3D();

    this.arrowViewMediator = this.mediatorFactory.getMediator(world.arrow);
    this.addChild(world.arrow);

    this.world.addObserver("LocationUpdated", (e) => this.loadBackground(e));
    this.world.addObserver("ChairAdded", (e) => this.onChairAdded(e));
    this.world.addObserver("ConsultantAdded", (e) => this.onConsultantAdded(e));
    this.world.addObserver("WallAdded", (e) => this.onWallAdded(e));
    this.world.addObserver("ObjectAdded", (e) => this.onObjectAdded(e));
    this.world.addObserver("ObjectRemoved", (e) => this.onObjectRemoved(e));

  }

  makeObject3D() {
    const container = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    const texture = new THREE.TextureLoader().load('/images/office-entrance.jpeg');
    const material = new THREE.MeshBasicMaterial(
      { map: texture,
        side: THREE.DoubleSide }
      );

    const mesh = new THREE.Mesh(geometry, material);
    container.add(mesh);
    return container;
  }

  loadBackground(background) {
    this.model.arrow.visible = false;
    const worldSphere = this.object3D.children[0];
    const location = this.world.loction
    const texture = new THREE.TextureLoader().load('/images/' + background + '.jpeg');
    worldSphere.material.map = texture;
  }

  onChairAdded(e){
    this.addChild(e.chair);
  }

  onObjectRemoved(e){
    console.log(e);
    this.removeChild(e)
  }

  onConsultantAdded(e){
    this.addChild(e.consultant);
  }

  onObjectAdded(object){
    this.addChild(object);
  }

  onWallAdded(e) {
    this.addChild(e.wall);
  }

}
