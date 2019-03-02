
const Tweet = require('../models/tweet.model');

module.exports = {
  async create(req, res) {
    const tweet = await Tweet.findById(req.params.id);
    tweet.set({ likes: tweet.likes + 1 })

    await tweet.save();

    req.io.emit('afterCreating.like', tweet);

    return res.json(tweet);
  }
};
