var mongoose = require('mongoose');
var ServiceRequestsSchema = new mongoose.Schema({
    project_id: String,
    project_name: String,
    date: Date,
    status: String,
    description: String,
    root_cause: String,
    rectification: String,
    assignee: String
});
mongoose.model('ServiceRequests', ServiceRequestsSchema);

module.exports = mongoose.model('ServiceRequests');