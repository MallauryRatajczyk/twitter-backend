const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    date: { type: Date, default: new Date() },
    proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    contenu: String,
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    hashtag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'hashtag' }]
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;