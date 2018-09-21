export default class Disconnected extends p5 {

    public user: string;
    public visible: boolean;
    public frame: number;
    public frameLength: number;
    public frames: string[];
    private sketch: any;

    constructor(sketch) {
        
        super();

        this.user = "";
        this.visible = false;
        this.frame = 0;
        this.frameLength = 1000;
        this.frames = [];
        this.sketch = sketch;
    }

    trigger(name: string) {

        this.user = name;
        this.frames = [
            `${this.user} left the game`,
            `${this.user} left the game`
        ];
        this.visible = true;

        const renderer = setInterval(() => {

            if(this.frame < (this.frames.length - 1)) {
                
                this.frame++;
                return;
            }

            this.visible = false;
            clearInterval(renderer);
        }, this.frameLength);
    }

    render() {

        if(this.visible) {

            this.sketch.fill('#ff5151');
            this.sketch.rect(270, 0, 260, 40, 0, 0, 20);

            this.sketch.textFont('Gaegu');
            this.sketch.textAlign(CENTER);
            this.sketch.textSize(18);
            this.sketch.fill('#ffffff');
            this.sketch.text(this.frames[this.frame], 400, 23);
        }
    }
}