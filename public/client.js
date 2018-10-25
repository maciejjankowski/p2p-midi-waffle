var alpha, beta, gamma, xCard;
var socket = io();

var p2p = new P2P(socket);

p2p.on('ready', function(){
  p2p.usePeerConnection = true;
  //p2p.usePeerConnection = false;
});

p2p.on('connect', function(){
  
});


var canSend;
setInterval(()=>{
  canSend = 1;
}, 50);

function send(type, msg){
  // if (!canSend){return}
  // socket.emit(type, msg);
  p2p.emit(type, msg);
  // canSend = 0;
}

var noteOffTimeout =[]

// var midiOut;
var lastUpdated = 0;
const THROTTLE_TIME = 10;

$(function () {  

  var receiver;
	if (!('ondeviceorientation' in window)) {
		// unsupported
	} else {
		window.addEventListener('deviceorientation', function(event) {
      if (lastUpdated + THROTTLE_TIME > Date.now()){
        return;
      }
      lastUpdated = Date.now();
      send('deviceorientation',{
				beta : event.beta, 
        gamma : event.gamma,
        alpha : event.alpha,
        absolute: event.absolute,
        timestamp : Date.now(),
			});
      if (app) {
        app.gamma = event.gamma
      }
		});
	}
	if (!('ondevicemotion' in window)) {
		// unsupported
	} else {
		window.addEventListener('devicemotion', function(event) {
      return;
			send('devicemotion', {
				aX : event.acceleration.x,
				aY : event.acceleration.y,
				aZ : event.acceleration.z,
				aGX : event.accelerationIncludingGravity.x,
				aGY : event.accelerationIncludingGravity.y,
				aGZ : event.accelerationIncludingGravity.z,
				rB : event.rotationRate.beta,
				rG : event.rotationRate.gamma,
				rA : event.rotationRate.alpha,
				interval : event.interval,
        timestamp : Date.now()
      });
		});
	}
  
  
  
});
