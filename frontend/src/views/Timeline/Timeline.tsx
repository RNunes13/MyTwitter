
import * as React from 'react';
import api from '../../services/api';
import socket from 'socket.io-client';
import { Tweet as ITweet } from 'models/tweet.model';

import './Timeline.scss';

// Components
import Tweet from '../../components/Tweet/Tweet';

export interface TimelineProps {
}

export interface TimelineStates {
  tweets: ITweet[];
  tweet: string;
}

export default class Timeline extends React.Component<TimelineProps, TimelineStates> {
  constructor(props: TimelineProps) {
    super(props);

    this.state = {
      tweets: [],
      tweet: '',
    };
  }

  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    // tslint:disable-next-line: strict-boolean-expressions
    const io = socket(process.env.API || 'http://localhost:3333');

    io.on('afterCreating.tweet', (data: ITweet) => {
      this.setState(prevState => ({ tweets: [data, ...prevState.tweets] }));
    });

    io.on('afterCreating.like', (data: ITweet) => {
      const callback = (tweet: ITweet) => tweet._id === data._id ? data : tweet;

      this.setState(prevState => ({ tweets: prevState.tweets.map(callback) }));
    });
  }

  handleOnKeyDown = async (evt: any) => {
    if (evt.keyCode !== 13) return;

    const content = this.state.tweet;
    const author = sessionStorage.getItem('@MyTwitter:username');

    await api.post('tweets', { content, author });

    this.setState({ tweet: '' });
  }

  handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ tweet: evt.target.value });
  }

  render() {
    return (
      <section className="timeline">
        <div className="timeline__container mt-container">
          <img
            className="timeline__image"
            src={ require('../../assets/images/logo.png') }
            alt="MyTwitter"
          />
          <form className="timeline__form">
            <textarea
              className="timeline__textarea"
              value={ this.state.tweet }
              onChange={ this.handleChange }
              onKeyDown={ this.handleOnKeyDown }
              placeholder="What's happening?"
              rows={ 3 }
            />
          </form>
          <ul className="timeline__tweets">
            {
              this.state.tweets.map(tweet =>
                <Tweet key={ tweet._id } tweet={ tweet } />,
              )
            }
          </ul>
        </div>
      </section>
    );
  }
}
