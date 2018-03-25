import React, { Component } from 'react';
import axios from "axios";
import { ArtistList, AddArtistForm } from './Artists/Artists.js';
import './App.css';
import './font-awesome/css/font-awesome.min.css';

const api_url = 'http://localhost:54016/MusicApi';
const artists_url = api_url + '/Artists/';
const songs_url = api_url + '/Songs/';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artists: []
    };
  }

  componentDidMount() {
    axios.get(artists_url)
      .then(res => {
        this.setState({ artists: res.data });
      })
  }

  addArtist = artist => {
    axios.post(artists_url, artist)
      .then(res => {
        this.setState(state => ({
          artists: state.artists.concat(res.data)
        }));
      });
  };

  addSong = (artist, song) => {
    axios.post(songs_url, song)
      .then(res => {
        this.setState(state => ({
          artists: state.artists.map(a => {
            if (a.id === artist.id) {
              a.songs = a.songs.concat(res.data);
            }
            return a;
          })
        }));
      });
  };

  deleteArtist = artist => {
    axios.delete(`${artists_url}${artist.id}`)
      .then(res => {
        this.setState(state => ({
          artists: state.artists.filter(a => a.id !== artist.id)
        }));
      });
  };

  deleteSong = (artist, song) => {
    axios.delete(`${songs_url}${song.id}`)
      .then(res => {
        this.setState(state => ({
          artists: state.artists.map(a => {
            if (a.id === artist.id) {
              a.songs = a.songs.filter(s => s.id !== song.id);
            }
            return a;
          })
        }));
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <i className="App-logo fa fa-music" alt="logo" />
          <i className="App-logo fa fa-music" alt="logo" />
          <i className="App-logo fa fa-music" alt="logo" />
          <h1 className="App-title">Welcome to Music App !</h1>
        </header>
        <div className="App-body">
          <h1>Artists</h1>
          <AddArtistForm onSubmit={this.addArtist} />
          <ArtistList artists={this.state.artists} addSong={this.addSong} deleteArtist={this.deleteArtist} deleteSong={this.deleteSong} />
        </div>
      </div>
    );
  }
}

export default App;
