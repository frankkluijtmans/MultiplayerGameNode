export default class BackgroundSprite {

    public currentFrame: any;
    private frames: any[];

    constructor(sketch: any) {

        this.currentFrame = 0;

        this.frames = [
            sketch.loadImage("assets/background.png")
        ];
    }

    update() {

        this.currentFrame = 0
    }

    getCurrentFrame() {

        return this.frames[this.currentFrame];
    }
}