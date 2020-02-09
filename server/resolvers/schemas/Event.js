const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Event = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: Object,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model("Event", Event)