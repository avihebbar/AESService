var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var MonitoringLog = require('./monitoringLog');

// CREATES A NEW LOG
router.post('/', function (req, res) {
    console.log(req.body)
    MonitoringLog.create(req.body,
        function (err, MonitoringLog) {
            console.log(err, MonitoringLog)
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(MonitoringLog);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    MonitoringLog.find({}, function (err, MonitoringLog) {
        if (err) return res.status(500).send("There was a problem finding the Monitoring Log.");
        res.status(200).send(MonitoringLog);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    MonitoringLog.findById(req.params.id, function (err, MonitoringLog) {
        if (err) return res.status(500).send("There was a problem finding the Monitoring Log.");
        if (!project) return res.status(404).send("No Monitoring Log found.");
        res.status(200).send(MonitoringLog);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    MonitoringLog.findByIdAndRemove(req.params.id, function (err, MonitoringLog) {
        if (err) return res.status(500).send("There was a problem deleting the Monitoring Log.");
        res.status(200).send("Monitoring Log: " + MonitoringLog.Name + " was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    MonitoringLog.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, MonitoringLog) {
        if (err) return res.status(500).send("There was a problem updating the Monitoring Log.");
        res.status(200).send(MonitoringLog);
    });
});


module.exports = router;