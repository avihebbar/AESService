var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var ServiceRequests = require('./serviceRequests');
var User = require('../user/User')
var UserRoles = require('../user/UserRoles')

// CREATES A NEW USER
router.post('/', function (req, res) {
    console.log(req.body)
    ServiceRequests.create(req.body,
        function (err, ServiceRequest) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(ServiceRequest);
        });
});

// RETURNS ALL THE SRs IN THE DATABASE
router.get('/', function (req, res) {
    ServiceRequests.find({}, function (err, ServiceRequest) {
        if (err) return res.status(500).send("There was a problem finding the Monitoring Log.");
        res.status(200).send(ServiceRequest);
    });
});

// GETS A SINGLE SR FROM THE DATABASE
router.get('/:id', function (req, res) {
    ServiceRequests.findById(req.params.id, function (err, ServiceRequest) {
        if (err) return res.status(500).send("There was a problem finding the Monitoring Log.");
        if (!project) return res.status(404).send("No Monitoring Log found.");
        res.status(200).send(ServiceRequest);
    });
});

// DELETES A SR FROM THE DATABASE
router.delete('/:id', function (req, res) {
    ServiceRequests.findByIdAndRemove(req.params.id, function (err, ServiceRequest) {
        if (err) return res.status(500).send("There was a problem deleting the Monitoring Log.");
        res.status(200).send("Monitoring Log: " + ServiceRequest.Name + " was deleted.");
    });
});

// UPDATES A SINGLE SR IN THE DATABASE
router.put('/:id', function (req, res) {
    console.log(req.body)
    User.findById(req.body.assignee, function (err, user) {
        if (err || !user) {
            console.log(err)
            return res.status(400).send("Service assignee does not exist").end()
        }
        ServiceRequests.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, ServiceRequest) {
            if (err) return res.status(500).send("There was a problem updating the Monitoring Log.");
            return res.status(200).send(ServiceRequest);
        });
    })
});


module.exports = router;