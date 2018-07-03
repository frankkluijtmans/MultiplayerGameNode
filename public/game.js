var socket = io();
var uuid = Math.random().toString(36).substr(2, 9);
var hero = new Hero(35,570,60,60);
var session = new Session();
var Players = {};
var Enemy = {};
var EnemyHit = true;
var sessionid;

socket.on('update_client', (data) => {

    Players = data.players;
    Enemy = data.enemy;
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
        "score": hero.score
    });
}

function draw() {

    clear();
    background(191,236,255);

    if(session.timeLeft > 0) {
            
        hero.update();

        noStroke();
        drawPlayers();
        drawEnemy();

        let hit;

        Object.keys(Players).forEach(key => {

            hit = collideRectCircle(Enemy.x,Enemy.y,40,40, Players[key].x, Players[key].y,60);

            if(hit) {
                
                socket.emit('enemy_hit', key);
            }
        });

        hit = collideRectCircle(Enemy.x,Enemy.y,40,40, hero.x, hero.y,60);

        if(hit) {
            hero.score++;
        }
        
        text(session.timeLeft, 760, 30);

        socket.emit('update_server', {
            "x": hero.x,
            "y": hero.y,
            "width": hero.width,
            "height": hero.height,
            "score": hero.score
        });
    }
    else {
        textSize(24);
        textAlign(CENTER);
        text('Your score: ' + hero.score, 400, 300);
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
        textSize(12);
        text(key, Players[key].x - 40, Players[key].y - 40);
        textSize(18);
        text(key + ': ' + Players[key].score, 10, 30 + (Object.keys(Players).indexOf(key) * 30));
    });
}

function drawEnemy() {

    rect(Enemy.x, Enemy.y, Enemy.width, Enemy.height);
}