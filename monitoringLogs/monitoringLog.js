var mongoose = require('mongoose');
var MonitoringLogSchema = new mongoose.Schema({
    project_id: String,
    date: Date,
    status: String,
    shutdown_reason: String,
    pump1_status: String,
    pump2_status: String,
    cp_error_message: String,
    inlet_power_supply: String,
    leakages: String,
    flow_meter: String,
    sludge_volume: String,
    sludge_photo: String,
    treated_water_photo: String,
    vaccum_pressure: String,
    bar_screen_status: String,
    sludge_drying_bed: String,
    area_cleanliness: String,
    area_cleanliness_photo: String,
    other_issues: String,
    monitored_by: String,
    site_incharge: String
});
mongoose.model('MonitoringLog', MonitoringLogSchema);

module.exports = mongoose.model('MonitoringLog');