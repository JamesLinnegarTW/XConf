import Observable from '../lib/Observable';

export default class ViewMediator extends Observable {

  constructor(model, mediatorFactory) {
    super();
    this.model = model;
    this.mediatorFactory = mediatorFactory;
    this.object3D = this.makeObject3D();
    this.childMediators = new Map();
  }

  makeObject3D() {
    const container = new THREE.Object3D();
    container.add(new THREE.Object3D());
    return container;
  }

  onFrameRendered() {
    try {
      for (const childMediator of this.childMediators.values()) {
        childMediator.onFrameRendered();
      }
    }catch(e){
      //console.warn(e);
    }
  }

  addChild(child){
    const mediator = this.mediatorFactory.getMediator(child);
    this.childMediators.set(child, mediator);
    this.object3D.children[0].add(mediator.object3D);
  }
}
