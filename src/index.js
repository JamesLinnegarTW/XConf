import WorldController from './controllers/WorldController';

const WebVRConfig = {
  BUFFER_SCALE: 1.0,
};

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
});

function bootstrap(){
  const controller = new WorldController();
}

window.onload = bootstrap;
