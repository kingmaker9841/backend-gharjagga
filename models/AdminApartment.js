const mongoose = require('mongoose');
const AdminApartment = mongoose.model('admin_apartment', new mongoose.Schema({
    owner_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'owner_info'}],
    ghar_room_info: [{type: mongoose.Schema.Types.ObjectId, ref: 'ghar_room_info'}],
    facilities_info: [{type: mongoose.Schema.Types.ObjectId, ref: 'facilities_info'}],
    image_info: [{type: mongoose.Schema.Types.ObjectId, ref: 'image_info'}],
    location: [{type: mongoose.Schema.Types.ObjectId, ref: 'location_info'}],
    price: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    near_by: [{type: String}],
    address: {type: String, required: true},
    price_type: {type: String, required: true},
    property_type: {type: String, required: true},
    purpose: {type: String, required: true},
    views: {type: Number},
    property_listing: {type: String},
    role: {type: String}
}));
module.exports = AdminApartment;
