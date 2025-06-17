import Challange from "./Challange";
import Lable from "./Lable";
import Video from "./Video";

export default class Game {

    config: any;

    step: number;
    steps: number;

    loaded = false;
    challanges: Array<Challange> = [];
    lables: Array<any> = [];

    constructor(config: any) {
        this.step = 0;
        this.steps = config.steps;

        this.config = config;
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
        const randomIndex = Math.floor(Math.random() * this.challanges.length);

        console.log(this.challanges);
        console.log(randomIndex);

        return this.challanges.splice(randomIndex, 1)[0];
    }

    async parseChallanges() {
        const json = await (await (await fetch(`/gamemodes/challanges/${this.config.challange}.json`)).json());
        const l = json.challanges;
        this.challanges = l.map((e: any) => new Challange(new Video(e[0], e[1]), e[2]));
    }

    async parseLables() {
        const json = await (await (await fetch(`/gamemodes/lables/${this.config.lables}.json`)).json());
        const l = json.lables;
        this.lables = l.map((e: any, i: number) => [new Lable(e[0]), i]);
    }

    over() {
        return this.step >= this.steps;
    }
}