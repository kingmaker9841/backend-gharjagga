const mongoose = require('mongoose');
const Numbers = mongoose.model('numbers', new mongoose.Schema({
    number: {type: Number, required: true}
}));

module.exports = Numbers;