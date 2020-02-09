const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Country = new Schema({
    name: {
        type: String,
        required: true
    },
    capital: {
        type: String,
        required: true
    },
    borders: {
        type: Array,
        required: false
    },
    languages: {
        type: Array,
        required: true
    },
    currencies: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model("Country", Country)