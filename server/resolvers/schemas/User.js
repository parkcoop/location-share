const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const defaultValues = {
    avatar: "https://i.ya-webdesign.com/images/vector-avatars-person-6.png",
    language: {
        iso: "en",
        name: "English",
        nativeName: "English"
    }

    
}

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: defaultValues.avatar
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    location: {
        type: Object,
        required: false,
    },
    language: {
        type: Object,
        required: false,
        default: defaultValues.language
    },
    trips: {
        type: Array,
        required: false
    },
    friends: {
        type: Array,
        required: false
    },
    wishTrips: {
        type: Array,
        required: false
    },
    interests: {
        type: Array,
        required: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("User", User)