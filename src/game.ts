import Hero from './objects/hero';
import HeroSprite from './sprites/hero';
import EnemySprite from './sprites/enemy';
import BackgroundSprite from './sprites/background';
import { PlayerCollection, Enemy } from './interfaces/interfaces';

const socket = io();

// Heroes
let hero;
let heroSprite;
let PlayerCollection: PlayerCollection = {};

// Enemies
let enemySprite;
let Enemy: Enemy = {};

// World
let backgroundSprite;

// Session
let SessionID = "";

socket.on('connect', () => {
    
    SessionID = socket.io.engine.id;
});


new p5(function(sketch) {

    sketch.setup = function() {

        hero = new Hero(sketch, 35,570,60,60);
        heroSprite = new HeroSprite(sketch);
        enemySprite = new EnemySprite(sketch);
        backgroundSprite = new BackgroundSprite(sketch);
        
        sketch.createCanvas(800,600);
        sketch.noLoop();
    
        socket.emit('user_connected', {
            "x": hero.x,
            "y": hero.y, 
            "width": hero.width,
            "height": hero.height,
            "score": 0,
            "nickname": prompt("Choose a nickname")
        });
    
        socket.on('update_client', (data) => {
    
            PlayerCollection.players = data.players;
            Enemy = data.enemy;
            
            sketch.redraw();
        });
    }
    
    sketch.draw = function() {
    
        sketch.clear();
        sketch.background(backgroundSprite.getCurrentFrame());
        
        heroSprite.update();
        enemySprite.update();
        
        if(typeof PlayerCollection.players !== 'undefined') {
            
            if(typeof PlayerCollection.players[SessionID] !== 'undefined') {
        
                hero.update();
        
                sketch.noStroke();
                drawPlayers(sketch);
                drawEnemy(sketch);
                sketch.text('120', 740, 35);
        
                socket.emit('update_server', {
                    "x": hero.x,
                    "y": hero.y,
                    "width": hero.width,
                    "height": hero.height,
                    "score": PlayerCollection.players[SessionID].score,
                    "nickname": PlayerCollection.players[SessionID].nickname
                });
            }
        }
    }
    
    sketch.keyPressed = function() {
        if (keyCode === UP_ARROW) {
    
            hero.gravity = 15;
            hero.state = "jumping";
        }
    }
});

function drawPlayers(sketch: any) {
        
    var i = 0;

    Object.keys(PlayerCollection.players).forEach(key => {

        let player = PlayerCollection.players[key];
        let heroColor = i === 0 ? 'pink' : 'orange';

        sketch.image(heroSprite.getCurrentFrame(heroColor), player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);
        sketch.textFont('Gaegu');
        sketch.textAlign(LEFT);
        sketch.textSize(21);
        sketch.text(player.nickname, player.x - 40, player.y - 40);
        sketch.textSize(32);
        sketch.text(player.nickname  + ': ' + player.score, 15, 35 + (Object.keys(PlayerCollection.players).indexOf(key) * 30));

        i++;
    });
}

function drawEnemy(sketch: any) {

    sketch.image(enemySprite.getCurrentFrame(), Enemy.x - Enemy.width / 2, Enemy.y - Enemy.height / 2, Enemy.width, Enemy.height);
}