function Session() {

    this.score = 0;
    this.timeLeft = 10;
}

Session.prototype.start = function() {
    
    var increment = setInterval(() => {

        if(this.timeLeft === 0) {

            clearInterval(increment);
        }

        this.timeLeft--;
    }, 1000);
}

Session.prototype.reset = function() {
    
    this.score = 0;
    this.timeLeft = 120;
}