const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    email: { type: String, unique: true, match: /\S+@\S+\.\S+/ },
    age: { type: Number, min: 18, max: 100 },
    password: String,
    tweet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweet' }],
    tweetLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweet' }],
    token: String
});

const User = mongoose.model('users', userSchema);

module.exports = User; 
