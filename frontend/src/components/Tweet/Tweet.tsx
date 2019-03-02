
import * as React from 'react';
import api from '../../services/api';
import { Tweet } from 'models/tweet.model';

import './Tweet.scss';

export interface TweetProps {
  tweet: Tweet;
}

const Tweet: React.FunctionComponent<TweetProps> = ({ tweet }) => {
  const handleLike = async () => {
    const { _id } = tweet;

    await api.post(`likes/${_id}`);
  };

  return (
    <li className="tweet">
      <strong className="tweet__author">{ tweet.author }</strong>
      <p className="tweet__content">{ tweet.content }</p>
      <button className="tweet__button" type="button" onClick={ handleLike }>
        <img
          className="tweet__like"
          src={ require('../../assets/icons/like.svg') }
          alt="Like"
        />
        {
          tweet.likes
        }
      </button>
    </li>
  );
};

export default Tweet;
