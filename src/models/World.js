import Observable from '../lib/Observable';

export default class World extends Observable {
  constructor(){
    super();
    this.className = "World";
    this.location = "office-entrance";
    
  }

  updateLocation(location){
    this.location = location;
    this.emit('LocationUpdated', location );
  }

}
