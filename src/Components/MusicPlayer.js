import React, { Component } from 'react';
import ThePlayer from './ThePlayer'
import '../css/MusicPlayer.css';
require('dotenv').config();

class MusicPlayer extends Component {
  constructor() {
    super();
    this.state = {
      playingStatus: false,
      nowPlaying: "",
      preferences: []
    };
  }

  componentDidMount = () => {
    this.setState({
      preferences: JSON.parse(localStorage.getItem("preferences"))
    });
  }

  handleVideoInfo = (videoData) => {
    this.setState({ nowPlaying: videoData, thumbnail: `https://img.youtube.com/vi/${videoData.video_id}/0.jpg`})
  }

  getPlayingStatus = status => {
    this.setState({playingStatus:status});
  }

  render() {
    const thumbnailBG = {
      background: 'url('+this.state.thumbnail+') no-repeat center'
    }
    return (
      <div className="music">
        <p>Now Playing</p>
        <h3>{this.state.nowPlaying.title}</h3>
        <div className="spinner" id="spinner" onClick={this.spinHandler} style={thumbnailBG}>
          <div className="hole">
            <div className="secondhole"></div>
          </div>
        </div>
        <div id="player"></div>
        <div className="button-container">
          <button id="prevbutton" className="buttons">
            <i className="material-icons-round">skip_previous</i>
        </button>
          <button id="playpause" className="buttons">
            <i className="material-icons-round">{this.state.playingStatus ? "pause_circle_filled" : "play_circle_filled"}</i>
          </button>
          <button id="nextbutton" className="buttons">
            <i className="material-icons-round">skip_next</i>
          </button>
        </div>
        <ThePlayer
          videoId={this.state.nowPlaying.videoId}
          playingStatus={this.state.playingStatus}
          sendVideoInfo={this.handleVideoInfo}
          sendStatus = {this.getPlayingStatus}
          playerReady = {this.props.setPlayerStatus}
        />
      </div>
    );
  }
}

export default MusicPlayer;