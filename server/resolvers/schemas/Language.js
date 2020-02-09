const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Language = new Schema({
    name: {
        type: String,
        required: true
    },
    nativeName: {
        type: String,
        required: true
    },
    iso: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Language", Language)