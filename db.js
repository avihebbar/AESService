var mongoose = require('mongoose');
var config = require('config');
var dbConfig = config.get("dbConfig")
var connectionString = "mongodb://"+ dbConfig.host + ":" + dbConfig.port + "/" + dbConfig.dbName;
mongoose.connect(connectionString);