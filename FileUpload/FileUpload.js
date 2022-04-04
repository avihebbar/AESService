var mongoose = require('mongoose');  
var FileSchema = new mongoose.Schema({  
  filename: String,
  path: String
});
mongoose.model('File', FileSchema);

module.exports = mongoose.model('File');