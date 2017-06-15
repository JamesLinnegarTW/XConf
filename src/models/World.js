import Observable from '../lib/Observable';

export default class World extends Observable {
  constructor(){
    super();
    this.location = "office-entrance";
  }

  updateLocation(location){
    this.location = location;
    this.emit('LocationUpdated', location );
  }

}
