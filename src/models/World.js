import Observable from '../lib/Observable';
import Arrow from './Arrow';

export default class World extends Observable {
  constructor(){
    super();
    this.className = "World";
    this.location = "office-entrance";
    this.objects = [];
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

  addObject(object){
      this.objects.push(object);
      this.emit('ObjectAdded', object );
  }

  clearObjects(){
    this.arrow.visible = false;
    this.objects.forEach((object)=>{
      this.emit('ObjectRemoved', object);
    })
    this.objects = [];
  }

}
