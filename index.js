var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var players = [];

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
    //io.emit('update_client', players);
  });
});

setInterval(function() {
  io.sockets.emit('update_client', players);
}, 1000 / 60);

http.listen(port, function(){
  console.log('listening on *:' + port);
});
