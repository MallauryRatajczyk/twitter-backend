var express = require('express');
var router = express.Router();
const User = require('../models/users');
const Tweet = require('../models/tweet')
const HashtagList = require('../models/hashtag')
require('../models/connection');
const { findHashtag } = require('../modules/Hashtag');

/* GET users listing. */
router.post('/post', (req, res) => {
    let date = req.body.date;
    let token = req.body.token;
    let contenu = req.body.contenu;
    let hashtag = findHashtag(contenu);
    User.findOne({ token }).then(data => {
        if (data) {
            const newTweet = new Tweet({
                date, proprietaire: data._id, contenu, hashtag
            })
            newTweet.save()
            for (let elem of hashtag) {
                let newHashtag = new HashtagList({
                    hashtag: elem
                })
                newHashtag.save()
            }
            res.json({ resultat: true, newTweet })

        } else {
            res.json({ resultat: false, message: "proprietaire introuvable" })
        }
    })
})

module.exports = router;