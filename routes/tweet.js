var express = require('express');
var router = express.Router();
const User = require('../models/users');
const Tweet = require('../models/tweet')
const Hashtag = require('../models/hashtag')
const ObjectId = require('mongodb').ObjectId;
require('../models/connection');
const { findHashtag } = require('../modules/Hashtag');

/* GET users listing. */
//Post un tweet et enregistre les hashtags
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
                Hashtag.findOne({ hashtag: elem }).then(data => {
                    if (!data) {
                        let newHashtag = new HashtagList({
                            hashtag: elem
                        })
                        newHashtag.save()
                    }
                })
            }
            res.json({ resultat: true, newTweet })

        } else {
            res.json({ resultat: false, message: "proprietaire introuvable" })
        }
    })
})


//Récupère les tweet d'un user à partir de son token
router.get('/:token', (req, res) => {
    let token = req.params.token;
    fetch(`http://localhost:3000/users/id/${token}`)
        .then(response => response.json())
        .then(data => {
            const id = data.user._id
            console.log(id)
            Tweet.find({ proprietaire: id }).populate("proprietaire").then(data => {
                res.json({ result: true, tweets: data })
            })
        })
})


//Supprime un tweet
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    Tweet.deleteOne({ _id: id }).then(
        res.json({ result: true })
    )
})

module.exports = router;