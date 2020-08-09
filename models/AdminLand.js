const mongoose = require('mongoose');
const AdminLand = mongoose.model('admin_land', new mongoose.Schema({
    owner_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'owner_info'}],
    image_info: [{type: mongoose.Schema.Types.ObjectId, ref: 'image_info'}],
    location: [{type: mongoose.Schema.Types.ObjectId, ref: 'location_info'}],
    price: {type: Number, required: true},
    title: {type: String, required: true},
    area: {type: String, required: true},
    description: {type: String, required: true},
    near_by: [{type: String}]
}));
module.exports = AdminLand;
