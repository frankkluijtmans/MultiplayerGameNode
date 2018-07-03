var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var players = {};
var enemy = {
  "x": Math.floor(Math.random() * 760),
  "y": Math.floor(Math.random() * 560),
  "width": 40,
  "height": 40
};

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('user_connected', function(data){
    
    players[socket.id] = data;
  });

  socket.on('update_server', function(data){
    
    players[socket.id] = data;
  });

  socket.on('enemy_hit', function(key){
    
    players[key].score = players[key].score + 1;
    
    enemy.x = Math.floor(Math.random() * 760);
    enemy.y = Math.floor(Math.random() * 560);
  });

  socket.on('disconnect', function () {

    delete players[socket.id];
  });
});

setInterval(function() {
  
  io.sockets.emit('update_client', {
    "players": players,
    "enemy": enemy
  });
}, 1000 / 60);

http.listen(port, function(){
  console.log('listening on *:' + port);
});
