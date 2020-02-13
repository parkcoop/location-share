const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const City = new Schema({
    name: {
        type: String,
        required: true
    },
    subCountry: {
        type: String,
        required: false
    },
    country: {
        type: Object,
        required: true
    },
    iso3: {
        type: String,
        required: true
    },
    isCapital: {
        type: Boolean,
        required: true
    }
},
{ 
    collection : 'cities' 
})

module.exports = mongoose.model("City", City)