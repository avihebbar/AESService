var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name : {type: String, required: true},
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  isFirstLogin: Boolean,
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');