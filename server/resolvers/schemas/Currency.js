const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Currency = new Schema({
    name: {
        type: String,
        required: true
    },
    pluralName: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Currency", Currency)