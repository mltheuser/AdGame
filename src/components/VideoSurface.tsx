import Skeleton from '@mui/material/Skeleton';
import { display } from '@mui/system';
import { Fragment, Component } from 'react';
import Game from '../datastructures/Game';
import Video from '../datastructures/Video';
import CountdownBar from './CountdownBar';
import GameProgress from './GameProgress';
import GuessArea from './GuessArea/GuessArea';
import './VideoSurface.css';

export default class VideoSurface extends Component<any> {

  player: any;

  game = new Game(this.props.gameConfig);

  state: any = {
    player_init: false,
    player_ready: false,

    answer: -1,

    currentChallange: undefined,
    progress: Array(this.props.gameConfig.steps).fill(-1),
  }

  async getNextVideo() {
    console.log("player");
    console.log(this.player);
    this.setState({
      currentChallange: await this.game.getChallange(),
    }, () => {
      this.player.loadVideoById(this.state.currentChallange.video.video_id);
    });
  }

  onEnd() {
    console.log("frindship ended");
    const newProgress = [...this.state.progress];
    if (this.state.currentChallange.lable_ids.indexOf(this.state.answer) !== -1) {
      console.log("WON!!!");
      newProgress[this.game.step] = 1;
    } else {
      console.log("LOST!!!");
      newProgress[this.game.step] = 0;
    }

    this.setState({
      answer: -1,
      progress: newProgress,
    }, () => {
      this.game.step += 1;
      if (this.game.over()) {
        this.props.setGameMode(-1);
      } else {
        this.getNextVideo();
      }
    });
  }

  onPlaying() {
    console.log("playing");
    this.setState({
      player_ready: true,
    })
  }

  onPlayerStateChange(e: any) {
    const window_handle: any = window;
    if (e.data === window_handle.YT.PlayerState.ENDED || e.data === window_handle.YT.PlayerState.UNSTARTED || e.data == window_handle.YT.PlayerState.BUFFERING) {
      this.setState({
        player_ready: false,
      })
    }

    if (e.data === window_handle.YT.PlayerState.ENDED) {
      return this.onEnd();
    }
    if (e.data === window_handle.YT.PlayerState.PLAYING) {
      return this.onPlaying();
    }
  }

  async loadVideo() {
    // needed to not init the player twice
    if (this.player !== undefined) {
      return;
    }

    const window_handle: any = window;
    // the Player object is created uniquely based on the id in props
    this.player = new window_handle.YT.Player('video_player', {
      videoId: "",
      playerVars: {
        'cc_load_policy': 3, 
        'iv_load_policy': 3, 
        'autoplay': 1, 
        'autohide': 3,
        'controls': 0,
        'showinfo': 0,
        'rel': 0,
        'modestbranding': 1,
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this),
      },
    });
  };

  componentDidMount() {
    // On mount, check to see if the API script is already loaded
    const window_handle: any = window;

    if (!window_handle.YT) { // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window_handle.onYouTubeIframeAPIReady = this.loadVideo.bind(this);

      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag.parentNode != null) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        console.log("No other script tag found");
      }

    } else { // If script is already there, load the video directly
      this.loadVideo();
    }
  };

  async onPlayerReady(e: any) {
    await this.getNextVideo();
    this.setState({
      player_init: true,
    });
  };

  logAnswer(answer: number) {
    if (this.player.getCurrentTime() < this.state.currentChallange.video.end_t) {
      this.player.seekTo(this.state.currentChallange.video.end_t, true);
      this.setState({
        answer: answer,
      });
    }
  }

  render() {
        return (
          <Fragment>
            <div className="youtubeContainer">
              <Skeleton id="videoSkeleton" style={this.state.player_ready ? {display: 'None'} : {}} variant="rectangular"/> 
              <div id={'video_player'} />
            </div>
            {this.state.player_init ? <CountdownBar player={this.player} end_t={this.state.currentChallange.video.end_t}/> : <div></div>}
            {this.state.player_init ? <GuessArea lables={this.game.lables} logAnswer={this.logAnswer.bind(this)}/> : <div></div>}
            <GameProgress progress={this.state.progress}/>
          </Fragment>
        );
    }
}