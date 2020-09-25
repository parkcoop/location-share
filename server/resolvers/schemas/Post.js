const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Post = new Schema({
    postedBy: {
        type: Object,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    comments: {
        type: Array,
        required: true,
        default: []
    },
    location: {
        type: Object,
        required: false
    },
    tags: {
        type: Array,
        required: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Post", Post)