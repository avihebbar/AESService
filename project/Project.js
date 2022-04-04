var mongoose = require('mongoose');
var ProjectSchema = new mongoose.Schema({
    name: String,
    address: String,
    num_of_pumps: Number,
    pm_interval: Number,
    site_incharge_id : String
});
mongoose.model('Project', ProjectSchema);

module.exports = mongoose.model('Project');