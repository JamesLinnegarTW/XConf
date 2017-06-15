import Observable from '../lib/Observable';

export default class Chair extends Observable {
  constructor(){
    super();
    this.className = "Chair";
  }
}
