var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var Heroes = [];

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('user_connected', function(Hero){

    Heroes[Hero.uuid] = Hero;

    io.emit('update_client', [Heroes[Hero.uuid]]);
  });

  socket.on('update_server', function(Hero){

    Heroes[Hero.uuid] = Hero;

    io.emit('update_client', [Heroes[Hero.uuid]]);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
