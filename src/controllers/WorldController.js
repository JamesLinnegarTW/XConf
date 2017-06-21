import MainView from '../views/MainView.js';
import World from '../models/World.js';
import Chair from '../models/Chair.js';
import Consultant from '../models/Consultant';
import Wall from '../models/Wall';
import Cube from '../models/Cube';
import Table from '../models/Table';
import Alexa from '../lib/Alexa';

export default class WorldController {

  constructor(){
    this.world = new World();
    this.view = new MainView(this, this.world);
    this.view.initialize();

    this.alexa = new Alexa();

    this.alexa.addObserver('scene', (data)=>this.setLocation(data));
    this.alexa.addObserver('box', (data)=>this.addCube(data));
    this.alexa.addObserver('connect', ()=>{console.log('connected')});
    this.alexa.addObserver('object', (message, data)=>{ });
    this.alexa.addObserver('clear', this.clear);

    this.alexa.connect();

    this.addWall();
    this.addTable();
    this.addConsultant();

  }

  setLocation(location){
    this.world.updateLocation(location);
  }

  pointAt(direction){
    this.world.pointAt(direction);
  }

  hideArrow(){
    this.world.arrow.visible = false;
  }

  addWall(){
    this.world.addObject(new Wall());
  }

  addTable(){
    this.world.addObject(new Table());
  }

  addCube(data = { "vector":undefined, "color":undefined}){
    this.world.addObject(new Cube(data.vector, data.color));
  }

  addConsultant(){
    this.world.addObject(new Consultant());
  }
  clear(){
    this.world.clearObjects();
  }

  onClick(vector){
    this.world.addObject(new Cube(vector, this.world.color));
    this.alexa.send(JSON.stringify({"type":"box", "data":{"vector":vector, "color": this.world.color}}));
  }

}
