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
  
  });

  socket.on('disconnect', function () {

    delete players[socket.id];
  });
});

setInterval(function() {

  let hit;

  Object.keys(players).forEach(key => {

      hit = collideRectCircle(enemy.x,enemy.y,40,40, players[key].x, players[key].y,60);

      if(hit) {
          
        players[key].score++;
    
        enemy.x = Math.floor(Math.random() * 760);
        enemy.y = Math.floor(Math.random() * 560);
      }
  });
  
  if(Object.keys(players).length > 0) {
    
    io.sockets.emit('update_client', {
      "players": players,
      "enemy": enemy
    });
  }
}, 1000 / 60);

http.listen(port, function(){
  console.log('listening on *:' + port);
});

function collideRectCircle(rx, ry, rw, rh, cx, cy, diameter) {

  var testX = cx;
  var testY = cy;

  if(cx < rx){
    testX = rx
  }
  else if(cx > rx+rw){
    testX = rx+rw
  }

  if(cy < ry){
    testY = ry
  }
  else if(cy > ry+rh){
    testY = ry+rh
  }
  var distance = dist(cx,cy,testX,testY)

  if (distance <= diameter/2) {
    return true;
  }
  return false;
};

function dist(x,y,testx,testy) {

  return Math.hypot(testx - x, testy - y);
}