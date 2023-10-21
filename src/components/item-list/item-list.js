import { format } from 'date-fns';
import { Component } from 'react';

import Genres from '../genres/genres';
import Stars from '../rate-stars/rate-stars';

import './item-list.css';

export default class ItemList extends Component {
  render() {
    const { id, title, dateRelease, description, poster, dataGenres, rating, countStars, sendRateStars } = this.props;

    const posterIMG = (poster) => {
      const defoltImage =
        'https://kartinki.pibig.info/uploads/posts/2023-04/1682034405_kartinki-pibig-info-p-kartinki-zhdunov-arti-instagram-1.jpg';
      const posterImage = `https://image.tmdb.org/t/p/w500${poster}`;
      return poster === null ? defoltImage : posterImage;
    };

    const formatText = (description) => {
      let string = description;
      if (description.length > 204) {
        string = string.slice(0, string.indexOf(' ', 150));
        string += ' ...';
      }
      return string;
    };

    const formatData = (dateRelease) => {
      if (!dateRelease) return null;
      return format(new Date(dateRelease), 'MMMM d, yyyy');
    };

    const getColor = (rating) => {
      let colorRating = 'srate ';
      if (rating >= 7) return (colorRating += 'high');
      if (rating >= 5 && rating < 7) return (colorRating += 'medium');
      if (rating >= 3 && rating < 5) return (colorRating += 'low');
      if (rating >= 0 && rating < 3) return (colorRating += 'none');
    };

    const getStars = (countStars) => {
      if (countStars === undefined) return 0;
      else return countStars;
    };
    return (
      <li className="item-list">
        <div>
          <img className="picture" src={posterIMG(poster)}></img>
        </div>
        <div className="info">
          <div className="box-title">
            <h5 className="title">{title}</h5>
            <p className={getColor(rating)}>{rating.toFixed(1)}</p>
          </div>
          <p className="data">{formatData(dateRelease)}</p>
          <div className="genre-box">
            <Genres dataGenres={dataGenres} />
          </div>
          <p className="description">{formatText(description)}</p>
          <Stars sendRateStars={sendRateStars} stars={getStars(countStars)} id={id} />
        </div>
      </li>
    );
  }
}
