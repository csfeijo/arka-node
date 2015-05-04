var express = require('express'),
    http    = require('http'),
    app     = express(),
    server  = http.createServer(app),
    port    = 8080;

server.listen(port);

app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/scripts", express.static(__dirname + '/scripts'));

app.get('/', function(req, res) {
	console.log(0);
  res.sendFile(__dirname + '/index.html');
});

app.get('/controller', function(req, res) {
  res.sendFile(__dirname + '/controller.html');
});

app.get('/game', function(req, res) {
  res.sendFile(__dirname + '/game.html');
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

	socket.on('to_right', function(){
	  console.log('Controller to Right Pressed');
	  
	  io.sockets.emit('play_to_right');
	});

	socket.on('to_left', function(){
	  console.log('Controller to Left Pressed');
	  
	  io.sockets.emit('play_to_left');
	});

	socket.on('to_up', function(){
	  console.log('Controller to Up Pressed');
	  
	  io.sockets.emit('play_to_up');
	});

  socket.on('to_down', function(){
	  console.log('Controller to Down Pressed');
	  
	  io.sockets.emit('play_to_down');
	});

});
