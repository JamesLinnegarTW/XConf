import * as THREE from 'three';
import WorldViewMediator from "./WorldViewMediator";
import RenderingContext from '../lib/RenderingContext';
import ViewMediatorFactory from '../lib/ViewMediatorFactory';

export default class MainView {

  constructor(worldModel){

    this.worldModel = worldModel;
    this.mediator = new WorldViewMediator(worldModel, new ViewMediatorFactory());

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


  onWindowResize(){
    this.renderingContext.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderingContext.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderingContext.camera.updateProjectionMatrix();
  }

  render() {
    this.renderingContext.controls.update();
    this.mediator.onFrameRendered();
    this.renderingContext.renderer.render(this.renderingContext.scene,
                                          this.renderingContext.camera);
    requestAnimationFrame(()=>this.render());

  }

}
