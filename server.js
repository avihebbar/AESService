var app = require('./app');
var config = require('config');
var port = config.get("port");

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});