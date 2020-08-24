const mongoose = require('mongoose');
const Users = mongoose.model('users_info', new mongoose.Schema({
    f_name: {type:String, required: true},
    l_name: {type:String, required: true},
    prov_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'prov_name_number_info'}],
    dist_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'district_info'}],
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone_number: {type: Number, required: true},
    resetPasswordToken: {type: String},
    resetPasswordTokenExpiresIn: {type: Date}
}));
module.exports = Users;
