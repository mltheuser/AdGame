export default class Video {
    video_id: string;
    end_t: number;
  
    constructor(video_id: string, end_t: number) {
        this.video_id = video_id;
        this.end_t = end_t;
    }
}