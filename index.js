var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var frameRate = 60;
var players = {};
var timer = null;
var session = {
	"time": 120,
	"started": false
}
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

	socket.on('disconnect', function () {

		io.sockets.emit('player_disconnected', {
			"name": typeof players[socket.id] !== 'undefined' ? players[socket.id].nickname : ""
		});

		delete players[socket.id];
		terminateSession();
	});
});

setInterval(function() {

	let hit;
	let ready = 0;

	Object.keys(players).forEach(key => {

		if(session.started && session.time < 120) {
			
			hit = collideRectCircle(enemy.x,enemy.y,40,40, players[key].x, players[key].y,60);

			if(hit) {
					
				players[key].score++;
		
				enemy.x = Math.floor(Math.random() * 760);
				enemy.y = Math.floor(Math.random() * 560);
			}
		}
		else {

			if(players[key].ready) {
				
				ready++;
			}
		}
	});

	if(ready === 2) {
		
		if(!session.started) {

			startSession();
		}
	}
		
	io.sockets.emit('update_client', {
		"players": players,
		"enemy": enemy,
		"session": session
	});
}, 1000 / frameRate);

http.listen(port, function(){
	console.log('listening on *:' + port);
});

function startSession() {

	io.sockets.emit('start_countdown');

	session.started = true;

	setTimeout(startTimer, 3000);
}

function startTimer() {
			
	timer = setInterval(() => {

		if(session.time > 0) {
			
			session.time--;
		} else {

			terminateSession();
		}
	}, 1000);
}

function terminateSession() {

	io.sockets.emit('end_game');

	Object.keys(players).forEach(key => {

		players[key].ready = false;
		players[key].score = 0; 
	});

	session.started = false;
	session.time = 120;
	clearInterval(timer);
	timer = null;
}

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

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
	  if ((new Date().getTime() - start) > milliseconds){
		break;
	  }
	}
  }