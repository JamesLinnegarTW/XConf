import MainView from '../views/MainView.js';
import World from '../models/World.js';
import Chair from '../models/Chair.js';
import Consultant from '../models/Consultant';
import Wall from '../models/Wall';
import Cube from '../models/Cube';

export default class WorldController {

  constructor(){
    this.world = new World();
    this.view = new MainView(this, this.world);
    this.view.initialize();
  }

  setLocation(location){
    this.world.updateLocation(location);
  }

  pointAt(direction){
    this.world.pointAt(direction);
  }

  addCube(){

  }

  hideArrow(){
    this.world.arrow.visible = false;
  }

  addChair(){
  //  this.world.addChair(new Chair());
    this.world.addWall(new Wall());
  //  this.world.addConsultants(new Consultant());
  }

  onClick(vector){
      this.world.addCube(new Cube(vector));
  }

}
