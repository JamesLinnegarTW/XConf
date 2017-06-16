import MainView from '../views/MainView.js';
import World from '../models/World.js';
import Chair from '../models/Chair.js';
import Consultant from '../models/Consultant';
import Wall from '../models/Wall';

export default class WorldController {

  constructor(){
    this.world = new World();
    this.view = new MainView(this.world);
    this.view.initialize();
  }

  setLocation(location){
    this.world.updateLocation(location);
  }

  addChair(){
    const c = new Chair();
    this.world.addChair(c);
    this.world.addWall(new Wall());
    this.world.addConsultants(new Consultant());

  }

}
