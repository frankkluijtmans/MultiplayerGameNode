export default class Hero extends p5 {

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public velocity: number;
    public gravity: number;
    public state: string;
    public ready: boolean;
    private sketch: any;
    
    constructor(sketch,x,y,width,height) {

        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocity = 5;
        this.gravity = 15;
        this.state = "";
        this.ready = false;
        this.sketch = sketch;
    }

    update() {

        if(this.state === "jumping") {

            this.jump();
        }

        if (this.sketch.keyIsDown(LEFT_ARROW)) {

            if(this.x <= this.width / 2) {
                
                this.x = this.width / 2;
                return;
            }

            this.x -= 5;
        }

        if (this.sketch.keyIsDown(RIGHT_ARROW)) {
            
            if(this.x >= (800 - this.width / 2)) {

                this.x = 800 - this.width / 2;
                return;
            }

            this.x += 5;
        }
    }

    jump() {

        this.y = this.y - this.gravity;
        this.gravity--;
        
        if(this.y >= 570) {
        
            this.state = "";
            this.gravity = 0;
            this.y = 570;
        }
    }
}