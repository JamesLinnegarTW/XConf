import WorldController from './controllers/WorldController';

const controller = new WorldController();

setTimeout(()=> {
  controller.setLocation("office-kitchen");
}, 5000);
