var express = require('express');
var router = express.Router();
router.use(express.urlencoded());
router.use(express.json());
var User = require('../user/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

var VerifyToken = require('./VerifyToken');

router.post('/login', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send({ error: 'Error on the server.' });
    if (!user) return res.status(404).send({ error: 'No user found.' });
    bcrypt.compare(req.body.password, user.password, function (err, valid) {
      console.log(err, valid)
      if (err || !valid) return res.status(500).send({ error: "Invalid password" });

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hoursl̥
      });
      res.status(200).send({
        _id: user.id,
        name: user.name,
        email: user.email,
        auth: true,
        isFirstLogin: user.isFirstLogin,
        role: user.role,
        token: token
      });
    })
  });
});

module.exports = router;

