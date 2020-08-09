const mongoose = require('mongoose');
const TrueFalse = mongoose.model('true_false', new mongoose.Schema({
    true_false: {type: Boolean, required: true}
}));

module.exports = TrueFalse;