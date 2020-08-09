const mongoose = require('mongoose');
const Apartment = mongoose.model('apartment', new mongoose.Schema({
    owner_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'owner_info'}],
    ghar_room_info: [{type: mongoose.Schema.Types.ObjectId, ref: 'ghar_room_info'}],
    facilities_info: [{type: mongoose.Schema.Types.ObjectId, ref: 'facilities_info'}],
    image_info: [{type: mongoose.Schema.Types.ObjectId, ref: 'image_info'}],
    user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'users_info'}],
    location: [{type: mongoose.Schema.Types.ObjectId, ref: 'location_info'}],
    price: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    near_by: [{type: String}],
    address: {type: String, required: true}
}));
module.exports = Apartment;
