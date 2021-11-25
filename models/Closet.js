const mongoose = require('mongoose');

const ClosetSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        category: {
            type: Array,
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Closet', ClosetSchema);
