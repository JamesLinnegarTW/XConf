import Observable from '../lib/Observable';

export default class Cube extends Observable {
  constructor(vectorArray = [0,0,-10], color=[0,0,0]){
    super();
    this.className = "Cube";
    this.color = color;
    this.vectorArray = vectorArray;
  }
}
