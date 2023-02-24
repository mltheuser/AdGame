import Video from "./Video";

export default class Game {

    step: number;
    numChallanges: number;
    progress: Array<number>;

    // videoOptions: Array<Video>;

    constructor(config: any) {
        this.step = 0;
        this.numChallanges = config.numChallanges;
        this.progress = Array(this.numChallanges).fill(-1);

        fetch("")
        .then(res => console.log(res.json()))
        .then(out =>
        console.log('Checkout this JSON! ', out))
        .catch(err => { throw err });
    }

    over() {
        return this.step >= this.numChallanges;
    }
}