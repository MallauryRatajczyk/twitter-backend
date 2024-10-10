const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    date: { type: Date, default: new Date() },
    proprietaire: String,
    contenu: String,
    likedBy: [String],
    hashtag: [String]
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;