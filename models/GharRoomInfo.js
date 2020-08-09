const mongoose = require('mongoose');
const GharRoomInfo = mongoose.model('ghar_room_info', new mongoose.Schema({
    floor: {type: mongoose.Schema.Types.ObjectId, ref: 'numbers'},
    bedroom: {type: mongoose.Schema.Types.ObjectId, ref: 'numbers'},
    bathroom: {type: mongoose.Schema.Types.ObjectId, ref: 'numbers'},
    kitchen: {type: mongoose.Schema.Types.ObjectId, ref: 'numbers'},
    living: {type: mongoose.Schema.Types.ObjectId, ref: 'numbers'},
    hall: {type: mongoose.Schema.Types.ObjectId, ref: 'numbers'},
    puja: {type: mongoose.Schema.Types.ObjectId, ref: 'numbers'},
}));
module.exports = GharRoomInfo;
