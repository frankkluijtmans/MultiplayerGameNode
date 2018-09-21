export default class Session {

    public time: number;
    
    constructor() {

        this.time = 120;
    }

    start() {

        const timer = setInterval(() => {

            if(this.time > 0) {
                
                this.time--;
                return;
            }

            clearInterval(timer);
        }, 1000);
    }
}