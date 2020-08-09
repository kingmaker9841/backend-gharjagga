const mongoose = require('mongoose');
const Admin = mongoose.model('admin_info', new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
}));
module.exports = Admin;