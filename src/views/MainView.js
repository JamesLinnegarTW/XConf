import * as THREE from 'three';
import ViewMediator from "./ViewMediator";
import RenderingContext from '../lib/RenderingContext';

export default class MainView {

  constructor(worldModel){

    this.worldModel = worldModel;
    this.mediator = new ViewMediator(worldModel);

    this.renderingContext = this.createRenderingContext();
    window.addEventListener( 'resize' , (e) => this.onWindowResize(), false);
  }

  initialize() {
    const scene = this.renderingContext.scene;
    scene.add(this.mediator.object3D);
    this.render();
  }

  createRenderingContext() {
    const domContainer = document.createElement('div');
    document.body.appendChild(domContainer);
    return RenderingContext.getDefault(domContainer);
  }

  onFrameRendered() {
    this.mediator.onFrameRendered();
  }

  onWindowResize(){
    this.renderingContext.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderingContext.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderingContext.camera.updateProjectionMatrix();
  }

  render() {
    //this.renderingContext.controls.update();
    this.onFrameRendered();
    this.renderingContext.renderer.render(this.renderingContext.scene,
                                          this.renderingContext.camera);
    requestAnimationFrame(()=>this.render());

  }

}
