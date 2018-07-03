function Enemy(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.uuid = Math.random().toString(36).substr(2, 9);
}

Enemy.prototype.draw = function() {

    noStroke();
    rect(this.x, this.y, this.width, this.height);
}