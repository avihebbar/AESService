var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mailer = require('../mailer')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');
var UserRoles = require('./UserRoles')
var responses = require('../ResponseMessages')
var generator = require('generate-password');
var bcrypt = require('bcryptjs');

var url = require('url')
var subject = "Welcome to Aapavani"
var html = "<body> You have been invited to use Aapavani monitoring app. Use this email and password to login in the app. Password : ";

// CREATES A NEW USER
router.post('/', function (req, res) {
    console.log(req.body)
    User.findById(req.userId, function (err, user) {
        if (user.role > UserRoles.ADMIN) {
            return res.status(403).json({ "message": responses.UNAUTHORIZED })
        }
    })
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    var hashedPassword = bcrypt.hashSync(password, 8);
    User.create({
        name : req.body.name,
        email: req.body.email,
        role: req.body.role,
        password : hashedPassword,
        isFirstLogin: true
    },
        function (err, user) {
            if (err) {
                console.log(err)
                return res.status(500).send(err);
            }
            mailer(req.body.email, subject, html + password, function(err){
                if( err ){
                    console.log(err);
                }
                res.status(200).send(user);
            })
            
        });
});


router.put('/:id', function (req, res) {
    console.log(req.body)
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log(err)
            return res.status(400).json({ error: err })
        }
        if (user == null) {
            return res.status(400).json({ error : "User not found" })
        }
        if (user.isFirstLogin) {
            var password = bcrypt.hashSync(req.body.password, 8);
            User.findByIdAndUpdate(req.params.id, { password: password, isFirstLogin: false }, function (err, todo) {
                if (err) {
                    console.log(err)
                    return res.status(400).send({error : err})
                }
                res.status(200).send(todo)
            })
        } else {
            return res.status(403).json({ error: "User already registered" })
        }
    })
})

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.findById(req.userId, function (err, user) {
        console.log(user)
        if (user.role > UserRoles.ADMIN) {
            return res.status(403).json({ "message": responses.UNAUTHORIZED })
        }
    })
    User.find({}, function (err, users) {
        if (err) {
            return res.status(500).send("There was a problem finding the users.");
        }
        return res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + user.name + " was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;