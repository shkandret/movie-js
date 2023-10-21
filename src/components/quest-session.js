import { Component } from 'react';

export default class GuestSession extends Component {
  constructor() {
    super();
    this.state = {
      url: new URL('https://api.themoviedb.org'),
      apiKey: '71a10ef540506d7e0dfa55f2683f8514',
    };
  }
  async getToken() {
    let url = new URL('3/authentication/guest_session/new', this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    try {
      const result = await fetch(url);
      if (!result.ok) throw new Error('Не удалось получить');
      const resultJson = await result.json();
      return await resultJson.guest_session_id;
    } catch (e) {
      throw new Error('Не удалось получить гостевой токен');
    }
  }
  async getSession(guestSessionId, page) {
    let url = new URL(`3/guest_session/${guestSessionId}/rated/movies`, this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    url.searchParams.set('page', page);
    url.searchParams.set('sort_by', 'created_at.asc');
    try {
      const result = await fetch(url);
      if (!result.ok) throw new Error(`Не удалось получить: ${url} Описание: ${result.statusText}`);
      const sessionJson = result.json();
      return await sessionJson;
    } catch (e) {
      throw new Error('Не получил сессию');
    }
  }
  async postRateStars(token, movieId, countStars) {
    const sId = token;
    let url = new URL(`3/movie/${movieId}/rating`, this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    url.searchParams.set('guest_session_id', sId);
    try {
      const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ value: countStars }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!result.ok) throw new Error(`Не удалось получить: ${url} Описание: ${result.statusText}`);
      return await result;
    } catch (e) {
      throw new Error('Не получается зарейтить');
    }
  }
}
