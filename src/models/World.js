import Observable from '../lib/Observable';

export default class World extends Observable {
  constructor(){
    super();
    this.className = "World";
    this.location = "office-entrance";
    this.chairs = [];
    this.consultants = [];
  }

  updateLocation(location){
    this.location = location;
    this.emit('LocationUpdated', location );
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
