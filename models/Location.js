const mongoose = require('mongoose');
const Location = mongoose.model('location_info', new mongoose.Schema({
    latitude: {type: String},
    longitude: {type: String}
}));
module.exports = Location;