const mongoose = require('mongoose');
const prov_info = new mongoose.Schema({
    prov_number : {type: Number, required: true},
    prov_name : {type : String, required: true}
});
const Prov_name_info = mongoose.model('prov_name_number_info', prov_info);
module.exports = Prov_name_info;
