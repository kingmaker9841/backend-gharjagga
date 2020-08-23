const mongoose = require('mongoose');
const Land = mongoose.model('land', new mongoose.Schema({
    owner_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'owner_info'}],
    image_info: [{type: mongoose.Schema.Types.ObjectId, ref: 'image_info'}],
    user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'users_info'}],
    location: [{type: mongoose.Schema.Types.ObjectId, ref: 'location_info'}],
    price: {type: Number, required: true},
    title: {type: String, required: true},
    area: {type: String, required: true},
    description: {type: String, required: true},
    near_by: [{type: String}],
    address: {type: String, required: true},
    price_type: {type: String, required: true},
    property_type: {type: String, required: true},
    purpose: {type: String, required: true},
    views: {type: Number}
}));
module.exports = Land;
