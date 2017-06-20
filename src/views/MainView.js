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


    //var options = {}
    //var enterVR = new webvrui.EnterVRButton(this.renderingContext.renderer.domElement, options);
    //document.body.appendChild(enterVR.domElement);

    this.controls = new Controls(this.mediator, this.renderingContext);
    window.addEventListener( 'resize' , (e) => this.onWindowResize(), true);
    window.addEventListener('vrdisplaypresentchange', (e) => this.onWindowResize(), true);
    window.addEventListener( 'orientationchange' , (e) => this.onWindowResize(), true);
  }

  initialize() {

    this.controls.initialize();
    this.controls.addObserver('click', (e)=>this.controller.onClick(e));

    const scene = this.renderingContext.scene;
    scene.add(this.mediator.object3D);
    // Get the VRDisplay and save it for later.
    this.vrDisplay = null;
    navigator.getVRDisplays().then((displays)=> {
      if (displays.length > 0) {
        this.vrDisplay = displays[0];
        console.log(this);
        // Kick off the render loop.
        this.vrDisplay.requestAnimationFrame(()=>{ this.render() });
      }
    });


  }

  createRenderingContext() {
    const domContainer = document.createElement('div');
    document.body.appendChild(domContainer);
    return RenderingContext.getDefault(domContainer, this.worldModel.color);
  }


  onWindowResize(){

    console.log('Resizing to %s x %s.', window.innerWidth, window.innerHeight);

    this.renderingContext.effect.setSize(window.innerWidth, window.innerHeight);
    this.renderingContext.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderingContext.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderingContext.camera.updateProjectionMatrix();
  }

  render(timestamp) {

    this.renderingContext.controls.update();
    this.mediator.onFrameRendered();

    this.renderingContext.effect.render(this.renderingContext.scene,
                                        this.renderingContext.camera,
                                        timestamp);
    this.vrDisplay.requestAnimationFrame(()=>{this.render()});
  }

}
