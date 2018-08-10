export default class EnemySprite {

    public currentFrame: any;
    private frames: any[];

    constructor(sketch: any) {

        this.currentFrame = 0;

        this.frames = [
            sketch.loadImage("assets/enemy.png"),
            sketch.loadImage("assets/enemy.png"),
            sketch.loadImage("assets/enemy.png"),
            sketch.loadImage("assets/enemy_1.png"),
            sketch.loadImage("assets/enemy_1.png"),
            sketch.loadImage("assets/enemy_1.png"),
            sketch.loadImage("assets/enemy_2.png"),
            sketch.loadImage("assets/enemy_2.png"),
            sketch.loadImage("assets/enemy_2.png")
        ];
    }

    update() {

        if(this.currentFrame === 8) {
        
            this.currentFrame = 0;
        }
        else {
            
            this.currentFrame++;
        }
    }

    getCurrentFrame() {

        return this.frames[this.currentFrame];
    }
}