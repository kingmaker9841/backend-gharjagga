const mongoose = require('mongoose');
const Facilities = mongoose.model('facilities_info', new mongoose.Schema({
    balcony: {type: mongoose.Schema.Types.ObjectId, ref: 'true_false'},
    solar: {type: mongoose.Schema.Types.ObjectId, ref: 'true_false'},
    wifi: {type: mongoose.Schema.Types.ObjectId, ref: 'true_false'},
    tv: {type: mongoose.Schema.Types.ObjectId, ref: 'true_false'},
    furniture: {type: mongoose.Schema.Types.ObjectId, ref: 'true_false'},
    water_supply: {type: mongoose.Schema.Types.ObjectId, ref: 'true_false'},
}));
module.exports = Facilities;