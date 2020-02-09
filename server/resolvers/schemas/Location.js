const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Location = new Schema({
    city: {
        type: Object,
        required: true
    },
    subCountry: {
        type: String,
        required: false
    },
    country: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model("Location", Location)