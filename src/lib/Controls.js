import Observable from './Observable';

export default class Controls extends Observable {
  constructor(mediator, renderingContext){
    super();
    this.mediator = mediator;
    this.renderingContext = renderingContext;
  }

  initialize(){
    this.renderingContext.renderer.domElement.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(){
    const camera = this.renderingContext.camera;
    const vec = new THREE.Vector3( 0, 0, -20 );
    vec.applyQuaternion( camera.quaternion );
    const vectorArray =  vec.toArray();
    this.emit('click', vectorArray )
  }
}
