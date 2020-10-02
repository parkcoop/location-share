const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Message = new Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    conversationId: {
        type: String,
        ref: 'Conversation',
        required: true
    },
    timestamp: {
        type: Number,
        required: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Message", Message)