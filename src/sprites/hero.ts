export default class HeroSprite {

    public currentFrame: any;
    private pink: any[];
    private orange: any[];

    constructor(sketch: any) {

        this.currentFrame = 0;

        this.pink = [
            sketch.loadImage("assets/hero1_1.png"),
            sketch.loadImage("assets/hero1_1.png"),
            sketch.loadImage("assets/hero1_1.png"),
            sketch.loadImage("assets/hero1_2.png"),
            sketch.loadImage("assets/hero1_2.png"),
            sketch.loadImage("assets/hero1_2.png"),
            sketch.loadImage("assets/hero1_3.png"),
            sketch.loadImage("assets/hero1_3.png"),
            sketch.loadImage("assets/hero1_3.png")
        ];

        this.orange = [
            sketch.loadImage("assets/hero2_3.png"),
            sketch.loadImage("assets/hero2_3.png"),
            sketch.loadImage("assets/hero2_3.png"),
            sketch.loadImage("assets/hero2_1.png"),
            sketch.loadImage("assets/hero2_1.png"),
            sketch.loadImage("assets/hero2_1.png"),
            sketch.loadImage("assets/hero2_2.png"),
            sketch.loadImage("assets/hero2_2.png"),
            sketch.loadImage("assets/hero2_2.png")
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

    getCurrentFrame(color) {

        return this[color][this.currentFrame];
    }
}