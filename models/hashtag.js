const mongoose = require('mongoose');

const hashtagSchema = mongoose.Schema({
    hashtag: String,
    tweet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweet' }]
});

const Hashtag = mongoose.model('hashtag', hashtagSchema);

module.exports = Hashtag;