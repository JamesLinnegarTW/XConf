import Observable from './Observable';

export default class Controls extends Observable {
  constructor(mediator, renderingContext){
    super();
    this.mediator = mediator;
    this.renderingContext = renderingContext;
    this.down = false;
  }

  initialize(){
    this.renderingContext.renderer.domElement.addEventListener('mousedown', (e) => this.onStart(e));
    this.renderingContext.renderer.domElement.addEventListener('mouseup', (e) => this.onEnd(e));
    this.renderingContext.renderer.domElement.addEventListener('mousemove', (e) => this.onMove(e));

    this.renderingContext.renderer.domElement.addEventListener('touchstart', (e) => this.onStart(e));
    this.renderingContext.renderer.domElement.addEventListener('touchend', (e) => this.onEnd(e));
    this.renderingContext.renderer.domElement.addEventListener('touchmove', (e) => this.onMove(e));


  }

  onStart(){
    this.down = true;
  }

  onMove(){
    this.down = false;
  }

  onEnd(){
    if(this.down){
      this.handleClick();
    }
  }

  handleClick() {
    const camera = this.renderingContext.camera;
    const vector = new THREE.Vector3( 0, 0, -20 );
    vector.applyQuaternion( camera.quaternion );
    const vectorArray =  vector.toArray();
    this.emit('click', vectorArray )
  }
}
