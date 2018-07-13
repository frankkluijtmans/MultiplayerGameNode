var socket = io();
var uuid = Math.random().toString(36).substr(2, 9);
var hero = new Hero(35,570,60,60);
var session = new Session();
var Players = {};
var PreviousState = {};
var Enemy = {};
var SessionID = "";
var heroSprite;
var heroSpriteFrame = 0;
var enemySprite;
var enemySpriteFrame = 0;
var backgroundSprite;

socket.on('connect', () => {
    
    SessionID = socket.io.engine.id;
});

function setup() {
    createCanvas(800,600);
    noLoop();

    heroSprite = [
        [
            loadImage("assets/hero1_1.png"),
            loadImage("assets/hero1_1.png"),
            loadImage("assets/hero1_1.png"),
            loadImage("assets/hero1_2.png"),
            loadImage("assets/hero1_2.png"),
            loadImage("assets/hero1_2.png"),
            loadImage("assets/hero1_3.png"),
            loadImage("assets/hero1_3.png"),
            loadImage("assets/hero1_3.png")
        ],
        [
            loadImage("assets/hero2_3.png"),
            loadImage("assets/hero2_3.png"),
            loadImage("assets/hero2_3.png"),
            loadImage("assets/hero2_1.png"),
            loadImage("assets/hero2_1.png"),
            loadImage("assets/hero2_1.png"),
            loadImage("assets/hero2_2.png"),
            loadImage("assets/hero2_2.png"),
            loadImage("assets/hero2_2.png")
        ]
    ];

    enemySprite = [
        loadImage("assets/enemy.png"),
        loadImage("assets/enemy.png"),
        loadImage("assets/enemy.png"),
        loadImage("assets/enemy_1.png"),
        loadImage("assets/enemy_1.png"),
        loadImage("assets/enemy_1.png"),
        loadImage("assets/enemy_2.png"),
        loadImage("assets/enemy_2.png"),
        loadImage("assets/enemy_2.png")
    ];

    backgroundSprite = loadImage("assets/background.png");
    //session.start();

    socket.emit('user_connected', {
        "x": hero.x,
        "y": hero.y, 
        "width": hero.width,
        "height": hero.height,
        "score": 0,
        "nickname": prompt("Choose a nickname")
    });

    socket.on('update_client', (data) => {

        PreviousState = Players;
        Players = data.players;
        Enemy = data.enemy;
        
        redraw();
    });
}

function draw() {

    clear();
    background(backgroundSprite);

    if(session.timeLeft > 0) {
        
        if(heroSpriteFrame === 8) {
            
            heroSpriteFrame = 0;
        }
        else {
            
            heroSpriteFrame++;
        }

        if(enemySpriteFrame === 8) {
            
            enemySpriteFrame = 0;
        }
        else {
            
            enemySpriteFrame++;
        }

        if(typeof Players[SessionID] !== 'undefined') {

            hero.update();

            noStroke();
            drawPlayers();
            drawEnemy();
            text(session.timeLeft, 740, 35);

            socket.emit('update_server', {
                "x": hero.x,
                "y": hero.y,
                "width": hero.width,
                "height": hero.height,
                "score": Players[SessionID].score,
                "nickname": Players[SessionID].nickname
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
    
    var i = 0;

    Object.keys(Players).forEach(key => {

        image(heroSprite[i][heroSpriteFrame], Players[key].x - Players[key].width / 2, Players[key].y - Players[key].height / 2, Players[key].width, Players[key].height);
        textFont('Gaegu');
        textAlign(LEFT);
        textSize(21);
        text(Players[key].nickname, Players[key].x - 40, Players[key].y - 40);
        textSize(32);
        text(Players[key].nickname  + ': ' + Players[key].score, 15, 35 + (Object.keys(Players).indexOf(key) * 30));

        i++;
    });
}

function drawEnemy() {

    image(enemySprite[enemySpriteFrame], Enemy.x - Enemy.width / 2, Enemy.y - Enemy.height / 2, Enemy.width, Enemy.height);
}