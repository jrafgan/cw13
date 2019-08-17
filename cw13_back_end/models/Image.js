const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    institution: {
        type: Schema.Types.ObjectId,
        ref: 'Institution',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;