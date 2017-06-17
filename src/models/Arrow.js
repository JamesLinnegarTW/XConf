import Observable from '../lib/Observable';

export default class Arrow extends Observable {

  constructor(){
    super();
    this.className = "Arrow";
    this.direction = 0;
    this.visible = false;
  }
}
