import MainView from '../views/MainView.js';
import World from '../models/World.js';
import Chair from '../models/Chair.js';
import Consultant from '../models/Consultant';
import Wall from '../models/Wall';
import Cube from '../models/Cube';
import Alexa from '../lib/Alexa';

export default class WorldController {

  constructor(){
    this.world = new World();
    this.view = new MainView(this, this.world);
    this.view.initialize();

    this.alexa = new Alexa();

    this.alexa.addObserver('scene', (data)=>this.setLocation(data));
    this.alexa.addObserver('box', (data)=>this.addCube(data));
    this.alexa.connect();

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

  addChair(){
    this.world.addWall(new Wall());
  }

  addCube(data){
    this.world.addCube(new Cube(data.vector, data.color));
  }

  onClick(vector){
    this.world.addCube(new Cube(vector, this.world.color));
    this.alexa.send(JSON.stringify({"type":"box", "data":{"vector":vector, "color": this.world.color}}));
  }

}
