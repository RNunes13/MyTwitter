
const Tweet = require('../models/tweet.model');

module.exports = {
  async index(req, res) {
    const tweets = await Tweet.find({}).sort('-createdAt');

    return res.json(tweets);
  },

  async create(req, res) {
    const tweet = await Tweet.create(req.body);

    req.io.emit('afterCreating.tweet', tweet);

    return res.json(tweet);
  },
};
