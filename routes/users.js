var express = require('express');
var router = express.Router();
const User = require('../models/users');
const uid2 = require('uid2')
const bcrypt = require('bcrypt');
require('../models/connection');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  let nom = req.body.nom;
  let prenom = req.body.prenom;
  let email = req.body.email;
  User.findOne({ email }).then(data => {
    console.log('data', data);
    if (!data) {
      let age = req.body.age;
      let password = req.body.password
      const hash = bcrypt.hashSync(password, 10);
      const token = uid2(32);
      const newUser = new User({
        nom, prenom, email, age, password: hash, token
      })
      newUser.save();
      res.json({ result: true })
    } else {
      res.json({ result: false, message: "user déjà inscrit" })
    }
  })
})

router.post('/signin', (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }).then(data => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        res.json({ result: true, token: data.token });
      } else {
        res.json({ result: false, error: 'User not found or wrong password' });
      }
    });
  } else {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
});


module.exports = router;
