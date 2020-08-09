const mongoose = require('mongoose');
const Image = mongoose.model('image_info', new mongoose.Schema({
    main_image: {type: String},
    gallery_image: { type: [String]}
}));
module.exports = Image;