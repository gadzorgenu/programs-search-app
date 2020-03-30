const mongoose = require('mongoose');

const programSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    duration: {
        type: String,
        required: true
    },

    development_stack: {
        type: String,
        required: true
    },

    pricing: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Program', programSchema);