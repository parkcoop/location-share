const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Conversation = new Schema({
    id: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Conversation", Conversation)