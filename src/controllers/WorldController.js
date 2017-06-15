import MainView from '../views/MainView.js';
import World from '../models/World.js';

export default class WorldController {

  constructor(){
    this.world = new World();
    this.view = new MainView(this.world);
    this.view.initialize();
  }

  setLocation(location){
    this.world.updateLocation(location);
  }

}
