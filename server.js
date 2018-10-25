var express = require('express');
var app = express();

app.use(express.static('public'));

var receiverId;

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

var controls = {
  'pan' : {'type':'cc', 'value':'22'},
  'filterFrequency' : {'type':'cc', 'value':'23'},
  'filterResonance' : {'type':'cc', 'value':'24'},

}

var io = require('socket.io')(listener);
var p2p = require('socket.io-p2p-server').Server;
io.use(p2p);
io.on('connection', function(socket){
  // socket.id
  console.log('io connection! :-)');
  
  socket.on('deviceorientation', function(msg){
    socket.volatile.broadcast.emit('o', msg);
    // console.log('sending orientation', msg)
  });
  
  
  socket.on('resonance', (msg) =>{
    socket.volatile.broadcast.emit('res', msg);
  })
  
  // socket.on('receiver',() => {
  //   receiverId = socket.id;
  //   console.log(socket.id)
  // })
  


});
