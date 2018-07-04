var socket = io();
var uuid = Math.random().toString(36).substr(2, 9);
var hero = new Hero(35,570,60,60);
var session = new Session();
var Players = {};
var Enemy = {};
var SessionID = "";
var Connected = false;

socket.on('update_client', (data) => {

    Players = data.players;
    Enemy = data.enemy;

    if(!Connected) {

        Connected = true;
    }
});

socket.on('connect', () => {
    
    SessionID = socket.io.engine.id;
});

function setup() {
    createCanvas(800,600);
    frameRate(60);
    //session.start();

    socket.emit('user_connected', {
        "x": hero.x,
        "y": hero.y, 
        "width": hero.width,
        "height": hero.height,
        "score": 0
    });
}

function draw() {

    clear();
    background(191,236,255);

    if(session.timeLeft > 0) {
        
        if(Connected) {

            hero.update();

            noStroke();
            drawPlayers();
            drawEnemy();
            text(session.timeLeft, 760, 30);

            socket.emit('update_server', {
                "x": hero.x,
                "y": hero.y,
                "width": hero.width,
                "height": hero.height,
                "score": Players[SessionID].score
            });
        }
    }
    else {
        
        //Game ends
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {

        hero.gravity = 15;
        hero.state = "jumping";
    }
}

function drawPlayers() {
 
    Object.keys(Players).forEach(key => {

        ellipse(Players[key].x, Players[key].y, Players[key].width, Players[key].height);
        textAlign(LEFT);
        textSize(12);
        text(key, Players[key].x - 40, Players[key].y - 40);
        textSize(18);
        text(key + ': ' + Players[key].score, 10, 30 + (Object.keys(Players).indexOf(key) * 30));
    });
}

function drawEnemy() {

    rect(Enemy.x, Enemy.y, Enemy.width, Enemy.height);
}