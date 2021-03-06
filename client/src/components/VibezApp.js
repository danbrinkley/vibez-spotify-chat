import React, { Component } from "react"
import "./homepage.css";
import NavBar from "./Nav/NavBar";
import Player from "./Player";
import UserPlaylists from "./UserPlaylists"
import MainView from './MainView'
import MainHeader from './MainHeader'
import Artwork from './ArtWork'
import SideMenu from './SideMenu'
import ChatBox from './ChatBox'


import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions';
import { setToken } from '../actions/tokenActions';
import {
  playSong,
  stopSong,
  pauseSong,
  resumeSong,
} from '../actions/songActions';








// export const authEndpoint = 'https://accounts.spotify.com/authorize';

// const clientId = "9a2df62a8b5e4fe1aedb898f2717a401";
// const redirectUri = "http://localhost:3000";
// const scopes = [
//   "user-read-currently-playing",
//   "user-read-playback-state",
//   "playlist-read-private",
//   "playlist-read-collaborative",
//   "playlist-modify-public",
//   "user-read-recently-played",
//   "playlist-modify-private",
//   "ugc-image-upload",
//   "user-follow-modify",
//   "user-follow-read",
//   "user-library-read",
//   "user-library-modify",
//   "user-read-private",
//   "user-read-email",
//   "user-top-read"
// ];
// // Get the hash of the url
// const hash = window.location.hash
// .substring(1)
// .split("&")
// .reduce(function(initial, item) {
//   if (item) {
//     var parts = item.split("=");
//     initial[parts[0]] = decodeURIComponent(parts[1]);
//   }
//   return initial;
// }, {});
// window.location.hash = "";

class VibezApp extends Component { 
  static audio;

  componentDidMount() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if (!hashParams.access_token) {
      window.location.href =
        'https://accounts.spotify.com/authorize?client_id=9a2df62a8b5e4fe1aedb898f2717a401&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/';
    } else {
      this.props.setToken(hashParams.access_token);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.fetchUser(nextProps.token);
    }

    if (this.audio !== undefined) {
      this.audio.volume = nextProps.volume / 100;
    }
  }

  stopSong = () => {
    if (this.audio) {
      this.props.stopSong();
      this.audio.pause();
    }
  };

  pauseSong = () => {
    if (this.audio) {
      this.props.pauseSong();
      this.audio.pause();
    }
  };

  resumeSong = () => {
    if (this.audio) {
      this.props.resumeSong();
      this.audio.play();
    }
  };

  audioControl = (song) => {
    const { playSong, stopSong } = this.props;

    if (this.audio === undefined) {
      playSong(song.track);
      this.audio = new Audio(song.track.preview_url);
      this.audio.play();
    } else {
      stopSong();
      this.audio.pause();
      playSong(song.track);
      this.audio = new Audio(song.track.preview_url);
      this.audio.play();
    }
  };

   
render() {  
  return (
    <div className="homepage-ctr">
        <NavBar />
      <div className="home-ctr">
        
        <div className="left-ctr">
          <SideMenu />
          <UserPlaylists />
          </div>

        <div className="mid-ctr">
          {/* <Header /> */}
     
     <MainHeader
          pauseSong={this.pauseSong}
          resumeSong={this.resumeSong}
        />{' '}
      <MainView
        pauseSong={this.pauseSong}
        resumeSong={this.resumeSong}
        audioControl={this.audioControl}
        />
        
          {/* <TableList /> */}
        </div>
        <div className="right-ctr">
          <ChatBox />
        </div>
      </div>
      <div className="post-ctr">
          <Artwork />
    

      </div>
      <div className="player-ctr">
        <Player
          stopSong={this.stopSong}
          pauseSong={this.pauseSong}
          resumeSong={this.resumeSong}
          audioControl={this.audioControl}        
        />
      </div>
    </div>
   
    
    );
  }
};

VibezApp.propTypes = {
  token: PropTypes.string,
  fetchUser: PropTypes.func,
  setToken: PropTypes.func,
  pauseSong: PropTypes.func,
  playSong: PropTypes.func,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
  volume: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token,
    volume: state.soundReducer.volume,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUser,
      setToken,
      playSong,
      stopSong,
      pauseSong,
      resumeSong,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VibezApp);