var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Project = require('./Project');

// CREATES A NEW USER
router.post('/', function (req, res) {
    console.log(req.body)
    Project.create(req.body,
        function (err, project) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(project);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    Project.find({}, function (err, project) {
        if (err) return res.status(500).send("There was a problem finding the project.");
        res.status(200).send(project);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        if (err) return res.status(500).send("There was a problem finding the project.");
        if (!project) return res.status(404).send("No project found.");
        res.status(200).send(project);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Project.findByIdAndRemove(req.params.id, function (err, project) {
        if (err) return res.status(500).send("There was a problem deleting the project.");
        res.status(200).send("Project: " + project.Name + " was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    Project.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, project) {
        if (err) return res.status(500).send("There was a problem updating the project.");
        res.status(200).send(project);
    });
});


module.exports = router;