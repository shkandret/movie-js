import React, { Component } from 'react';

import ServiceApi from '../service';
import GuestSession from '../quest-session';
import MyContext from '../context/context';
import ToggleTab from '../toggle/toggle-tab';
import ErrorIndicator from '../error/error';
import MoviesList from '../movies-list/movies-list';
import RatedList from '../rated-list/rated-list';

import './app.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      pageTab: 'search',
      genres: [],
      guestToken: '',
      dataRated: {
        moviesRated: [],
        totalPage: 0,
        page: 1,
      },
      error: false,
      errorMessage: '',
    };
    this.api = new ServiceApi();
    this.guest = new GuestSession();
  }

  onError = (e) => {
    console.log('I AM ERROR!');
    console.log(e);
    console.log(e.message);
    this.setState({
      error: true,
      errorMessage: e.message,
    });
  };

  changePage = (tab) => {
    this.setState({
      pageTab: tab,
    });
  };

  getGenres = () => {
    this.api
      .getGenres()
      .then((res) => {
        this.setState({ genres: res.genres });
      })
      .catch(this.onError);
  };

  getToken = () => {
    const token = localStorage.getItem('guest');
    if (token) this.setState({ guestToken: token });
    else {
      this.guest
        .getToken()
        .then((token) => {
          this.setState({ guestToken: token });
          localStorage.setItem('guest', `${token}`);
        })
        .catch(this.onError);
    }
  };

  getAllMovies = (movieName) => {
    return this.api.getAllMovies(`${movieName}`);
  };

  getPageMovies = (movieName, numPage) => {
    return this.api.getPageMovies(`${movieName}`, `${numPage}`);
  };

  sendRateStars = (id, countStars) => {
    this.guest.postRateStars(this.state.guestToken, id, countStars).catch(this.onError);
  };

  getGuestSession = (page = 1) => {
    return this.guest.getSession(this.state.guestToken, page);
  };

  getPageSession = (page) => {
    return this.api.getSession(this.state.guestToken, page);
  };

  componentDidMount() {
    this.getGenres();
    this.getToken();
  }

  render() {
    const { genres, pageTab, error, errorMessage } = this.state;
    const errorMessage1 = error ? <ErrorIndicator errorMessage={errorMessage} /> : null;
    const viewTab = (pageTab) => {
      if (pageTab === 'search')
        return (
          <MoviesList
            pageTab={pageTab}
            onError={this.onError}
            sendRateStars={this.sendRateStars}
            getAllMovies={this.getAllMovies}
            getPageMovies={this.getPageMovies}
          />
        );
      else if (pageTab === 'rated')
        return (
          <RatedList
            pageTab={pageTab}
            onError={this.onError}
            getGuestSession={this.getGuestSession}
            getPageSession={this.getPageSession}
          />
        );
    };
    return (
      <MyContext.Provider value={genres}>
        <section className="movie-app">
          <ToggleTab changePage={this.changePage} active={pageTab} />
          {viewTab(pageTab)}
          {errorMessage1}
        </section>
      </MyContext.Provider>
    );
  }
}
