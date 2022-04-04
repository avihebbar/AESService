var express = require('express');
var app = express();
var db = require('./db');

var VerifyToken = require('./auth/VerifyToken');
app.use(VerifyToken)

var AuthController = require('./auth/AuthController');
app.use('/auth', AuthController);

var UserController = require('./user/UserController');
app.use('/users', UserController);

var ProjectController = require('./project/ProjectController');
app.use('/projects', ProjectController);

var monitoringLogController = require('./monitoringLogs/monitoringLogController');
app.use('/monitoringLogs', monitoringLogController);

var serviceRequestsContoller = require('./serviceRequests/serviceRequestsController');
app.use('/serviceRequests', serviceRequestsContoller);

var FileUploadController = require('./FileUpload/FileUploadController');
app.use('/fileUpload', FileUploadController);

// app.js
var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);
module.exports = app;