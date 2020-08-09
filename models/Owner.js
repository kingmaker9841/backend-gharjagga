const mongoose = require('mongoose');
const Owner_info = mongoose.model('owner_info', new mongoose.Schema({
    f_name: {type: String, required: true},
    l_name: {type: String, required: true},
    phone_number: {type: Number, required: true},
    prov_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'prov_name_number_info'}],
    district_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'district_info'}]
}));
module.exports = Owner_info;