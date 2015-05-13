var express = require('express'),
    http    = require('http'),
    app     = express(),
    server  = http.createServer(app),
    port    = 8080;

server.listen(port);

app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/game-sample", express.static(__dirname + '/game-sample'));

app.get('/', function(req, res) {
  console.log(0);
  res.sendFile(__dirname + '/index.html');
});

app.get('/controller', function(req, res) {
  res.sendFile(__dirname + '/controller.html');
});

app.get('/game-debugger', function(req, res) {
  res.sendFile(__dirname + '/game-debugger.html');
});

app.get('/game-sample', function(req, res) {
  res.sendFile(__dirname + '/game-sample/index.html');
});


// Log that the servers running
console.log('Server running on port: ' + port);

var io = require('socket.io').listen(server);
var game_sockets = {};
var controller_sockets = {};

io.sockets.on('connection', function (socket) {
  
  console.log('Client connected!');

  // Game Connect
  socket.on('game_connect', function(){
    console.log('Game Connected');
    socket.emit('game_connected');
  });

  // Controll Pad Map Keys
  socket.on('controller_signal', function(data){
    console.log('Controller Signal', data.signal);
    
    var signal = data.signal;
    
    switch(signal){
      case 'right':
        io.sockets.emit('play_to_right');
      break;
      case 'left':
        io.sockets.emit('play_to_left');
      break;
      case 'up':
        io.sockets.emit('play_to_up');
      break;
      case 'down':
        io.sockets.emit('play_to_down');
      break;   
      default:
        console.log('Controller Signal not MAPPED!', data.signal);
      break;
    }
  });

});
