const mongoose = require('mongoose');

const hashtagSchema = mongoose.Schema({
    hashtag: String,
});

const Hashtag = mongoose.model('hashtag', hashtagSchema);

module.exports = Hashtag;