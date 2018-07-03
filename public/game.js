var socket = io();
var uuid = Math.random().toString(36).substr(2, 9);
var hero = new Hero(35,570,60,60);
var Enemies = [];
var session = new Session();


function setup() {
    createCanvas(800,600);
    spawnEnemy();
    //session.start();

    socket.emit('user_connected', {
        "x": hero.x,
        "y": hero.y
    });
}

function draw() {

    clear();
    background(191,236,255);

    if(session.timeLeft > 0) {
            
        hero.update();

        socket.emit('update_server', {
            "x": hero.x,
            "y": hero.y
        });

        drawPlayers();

        let hit;

        Enemies.forEach(enemy => {
            enemy.draw();

            hit = collideRectCircle(enemy.x,enemy.y,40,40,hero.x,hero.y,60);

            if(hit) {
                
                session.score++;
                Enemies.splice(Enemies.indexOf(enemy), 1);
                spawnEnemy();
            }
        })
        
        textSize(18);
        text('Score: ' + session.score, 10, 20);
        text(session.timeLeft, 760, 20);
    }
    else {
        textSize(24);
        textAlign(CENTER);
        text('Score: ' + session.score, 400, 300);
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {

        hero.gravity = 15;
        hero.state = "jumping";
    }
}

function spawnEnemy() {

    var x = Math.floor(Math.random() * 760);
    var y = Math.floor(Math.random() * 560);

    Enemies.push(new Enemy(x,y,40,40));
}

function drawPlayers() {

    socket.on('update_client', function(players){
        
        players.forEach(player => {

            noStroke();
            ellipse(player.x, player.y, player.width, player.height);
            textSize(12);
            text(player.key, player.x - 40, player.y - 40);
        });
    });
}