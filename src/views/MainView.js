import * as THREE from 'three';
import WorldViewMediator from "./WorldViewMediator";
import RenderingContext from '../lib/RenderingContext';
import ViewMediatorFactory from '../lib/ViewMediatorFactory';
import Controls from '../lib/Controls';
import * as webvrui from 'webvr-ui';

export default class MainView {

  constructor(controller, worldModel){
    this.controller = controller;
    this.worldModel = worldModel;
    this.mediator = new WorldViewMediator(worldModel, new ViewMediatorFactory());
    this.renderingContext = this.createRenderingContext();


    var options = {}
    var enterVR = new webvrui.EnterVRButton(this.renderingContext.renderer.domElement, options);
    document.body.appendChild(enterVR.domElement);

    this.controls = new Controls(this.mediator, this.renderingContext);
    window.addEventListener( 'resize' , (e) => this.onWindowResize(), false);
    window.addEventListener( 'orientationchange' , (e) => this.onWindowResize(), false);
  }

  initialize() {
    this.controls.initialize();
    this.controls.addObserver('click', (e)=>this.controller.onClick(e));

    const scene = this.renderingContext.scene;
    scene.add(this.mediator.object3D);
    this.render();
  }

  createRenderingContext() {
    const domContainer = document.createElement('div');
    document.body.appendChild(domContainer);
    console.log(this.worldModel.color);
    return RenderingContext.getDefault(domContainer, this.worldModel.color);
  }


  onWindowResize(){
    this.renderingContext.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderingContext.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderingContext.camera.updateProjectionMatrix();
  }

  render(timestamp) {
    this.renderingContext.controls.update();
    this.mediator.onFrameRendered();


    this.renderingContext.manager.render(this.renderingContext.scene,
                                        this.renderingContext.camera,
                                        timestamp);
    requestAnimationFrame(()=>this.render());

  }

}
