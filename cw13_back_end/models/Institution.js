const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstitutionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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

const Institution = mongoose.model('Institution', InstitutionSchema);

module.exports = Institution;