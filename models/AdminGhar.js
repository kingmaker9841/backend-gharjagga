const mongoose = require('mongoose');
const AdminGhar = mongoose.model('admin_ghar', new mongoose.Schema({
    owner_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'owner_info'}],
    ghar_room_info: [{type: mongoose.Schema.Types.ObjectId, ref: 'ghar_room_info'}],
    facilities_info: [{type: mongoose.Schema.Types.ObjectId, ref: 'facilities_info'}],
    image_info: [{type: mongoose.Schema.Types.ObjectId, ref: 'image_info'}],
    location: [{type: mongoose.Schema.Types.ObjectId, ref: 'location_info'}],
    price: {type: Number, required: true},
    area: {type: String, required: true},
    description: {type: String, required: true},
    near_by: [{type: String}],
    address: {type: String, required: true}
}));
module.exports = AdminGhar;
