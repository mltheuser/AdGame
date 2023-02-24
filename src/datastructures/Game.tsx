import Challange from "./Challange";
import Lable from "./Lable";
import Video from "./Video";

export default class Game {

    step: number;
    steps: number;

    loaded = false;
    challanges: Array<Challange> = [];
    lables: Array<any> = [];

    constructor(config: any) {
        this.step = 0;
        this.steps = config.steps;
    }

    async loadData() {
        if (this.loaded) {
            return
        }

        await Promise.all([this.parseChallanges(), this.parseLables()]);

        this.loaded = true;
    }

    async getChallange() {
        await this.loadData();
        const random_index = Math.floor(Math.random() * this.challanges.length);
        console.log(this.challanges);
        console.log(random_index);
        return this.challanges[random_index];
    }

    async parseChallanges() {
        const json = await (await (await fetch(`http://localhost:3000/gamemodes/challanges/test.json`)).json());
        const l = json.challanges;
        this.challanges = l.map((e: any) => new Challange(new Video(e[0], e[1]), e[2]));
    }

    async parseLables() {
        const json = await (await (await fetch(`http://localhost:3000/gamemodes/lables/international_tv_commercials.json`)).json());
        const l = json.lables;
        this.lables = l.map((e: any, i: number) => [new Lable(e[0], e[1]), i]);
    }

    over() {
        return this.step >= this.steps;
    }
}