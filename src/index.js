import WorldController from './controllers/WorldController';
import Alexa from './lib/Alexa';

function bootstrap(){
  const controller = new WorldController();
  const alexa = new Alexa();

  alexa.subscribe("scene", function(topic, data){
    controller.setLocation(data);
  });

  alexa.connect();

}

window.onload = bootstrap;
