
const express = require('express');
const routes = express.Router();

// Controllers
const TweetController = require('./controllers/tweet.controller');
const LikeController = require('./controllers/like.controller');

// Routes
routes.get('/tweets', TweetController.index);
routes.post('/tweets', TweetController.create);
routes.post('/likes/:id', LikeController.create);

module.exports = routes;