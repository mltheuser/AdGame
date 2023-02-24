import Lable from "./Lable";
import Video from "./Video";

export default class Challange {

    video: Video;
    lable_ids: Array<number>;

    constructor(video: Video, lable_ids: Array<number>) {
        this.video = video;
        this.lable_ids = lable_ids;
    }
}