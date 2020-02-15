const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Trip = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    locations: {
        type: Array,
        required: true
    },
    people: {
        type: Array,
        required: false
    },
    events: {
        type: Array,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    }
})

module.exports = mongoose.model("Trip", Trip)