import Observable from '../lib/Observable';
import Arrow from './Arrow';

export default class World extends Observable {
  constructor(){
    super();
    this.className = "World";
    this.location = "office-entrance";
    this.chairs = [];
    this.consultants = [];
    this.walls = [];
    this.cubes = [];
    this.arrow = new Arrow();
    this.color = [Math.random(),Math.random(),Math.random()];
  }

  updateLocation(location){
    this.location = location;
    this.emit('LocationUpdated', location );
  }

  pointAt(direction) {
    this.arrow.direction = direction;
    this.arrow.visible = true;
  }

  addCube(cube){
      this.cubes.push(cube);
      this.emit('CubeAdded', { cube });
  }

  addWall(wall) {
    this.walls.push(wall);
    this.emit('WallAdded', { wall });
  }

  addChair(chair){
    this.chairs.push(chair);
    this.emit('ChairAdded', { chair });
  }

  addConsultants(consultant){
    this.chairs.push(consultant);
    this.emit('ConsultantAdded', { consultant });
  }

}
