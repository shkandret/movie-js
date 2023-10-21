import { Component } from 'react';

export default class ServiceApi extends Component {
  constructor() {
    super();
    this.state = {
      url: new URL('https://api.themoviedb.org'),
      mainURL: 'https://api.themoviedb.org/3',
      apiKey: '3ba8ed94a5e6700ab22695e77491f859',
    };
  }
  async getAllMovies(movieName) {
    let url = new URL('3/search/movie', this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    url.searchParams.set('query', movieName);
    try {
      const result = await fetch(url);
      if (!result.ok) throw new Error(`Не удалось получить: ${url} Описание: ${result.statusText}`);
      return await result.json();
    } catch (e) {
      throw new Error('Нет ответа от сервера. Включите VPN.');
    }
  }
  async getPageMovies(movieName, page) {
    let url = new URL('3/search/movie', this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    url.searchParams.set('query', movieName);
    url.searchParams.set('page', page);
    try {
      const result = await fetch(url);
      if (!result.ok) throw new Error(`Не удалось получить: ${url} Описание: ${result.statusText}`);
      return await result.json();
    } catch (e) {
      throw new Error('Сервер не отвечает');
    }
  }
  async getGenres() {
    let url = new URL('3/genre/movie/list', this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    try {
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error('Не удалось получить');
      }
      return await result.json();
    } catch (e) {
      throw new Error('Не удалось получить жанры');
    }
  }
}
