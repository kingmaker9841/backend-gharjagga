const mongoose = require('mongoose');
const district_info = new mongoose.Schema({
    district_name : { type: String, required: true}
});
const District_info = mongoose.model('district_info', district_info);
module.exports = District_info;