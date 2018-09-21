export default class Countdown extends p5 {

    public visible: boolean;
    public frame: number;
    public frameLength: number;
    public frames: string[];
    private sketch: any;

    constructor(sketch) {
        
        super();

        this.visible = false;
        this.frame = 0;
        this.frameLength = 1000;
        this.frames = [
            "3",
            "2",
            "1",
            "GO!"
        ];
        this.sketch = sketch;
    }

    trigger(name: string) {

        this.visible = true;

        const renderer = setInterval(() => {

            if(this.frame < (this.frames.length - 1)) {
                
                this.frame++;
                return;
            }

            this.visible = false;
            this.frame = 0;
            clearInterval(renderer);
        }, this.frameLength);
    }

    render() {

        if(this.visible) {

            this.sketch.textFont('Gaegu');
            this.sketch.textAlign(CENTER);
            this.sketch.textSize(68);
            this.sketch.fill('#000000');
            this.sketch.text(this.frames[this.frame], 400, 300);
        }
    }
}