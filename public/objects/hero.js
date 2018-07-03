function Hero(x,y,width,height,uuid) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = 5;
    this.gravity = 15;
    this.state = "";
    this.uuid = uuid;
}

Hero.prototype.draw = function() {

    if (keyIsDown(LEFT_ARROW)) {

        if(this.x <= this.width / 2) {
            
            this.x = this.width / 2;
            return;
        }

        this.x -= 5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        
        if(this.x >= (800 - this.width / 2)) {

            this.x = 800 - this.width / 2;
            return;
        }

        this.x += 5;
    }

    if(this.state === "jumping") {

        this.jump();
    }

    noStroke();
    ellipse(this.x, this.y, this.width, this.height);
    textSize(12);
    text(this.uuid, this.x - 40, this.y - 40);
}

Hero.prototype.jump = function() {

    this.y = this.y - this.gravity;
    this.gravity--;
    
    if(this.y >= 570) {
    
        this.state = "";
        this.gravity = 0;
        this.y = 570;
    }
}