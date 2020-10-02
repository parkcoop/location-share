const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const { createWriteStream, mkdir, unlinkSync } = require("fs")
const shortid = require("shortid")
const cloudinary = require('cloudinary').v2

const { User, Post, Conversation, Message } = require('./schemas')
const { signupLog } = require('../utils/loggers')
const signup = async (_, { username, fullName, password }, { res }) => {
    try {
        if (!username || !fullName || !password) return new Error('Missing required paramaters.')
        const encryptedPassword = await bcrypt.hash(password, 10)
        const userCheck = await User.find({ username:username }, 
            (error, users) => {
                if (error) throw new Error('Internal error finding user.')
                console.log('Existing user: ', users)
                return users
        })
            
        if (userCheck.length) return new Error(`The username "${username}" is already in use.`)
        const newUser = new User({
            username: username,
            password: encryptedPassword,
            fullName: fullName
        })
        newUser.save()
        const token = jwt.sign({userId: newUser.id}, process.env.APP_SECRET, { expiresIn: "1d"})
        // res.cookie("token", token, {
        //     httpOnly: false,
        //     secure: false,
        //     maxAge: 1000 * 60 * 60 * 24 * 7,
        //     path: '/'
        // })
        localStorage.setItem('token', token)
        return {
            token,
            user: newUser
        }
    }
    catch(err) {
        signupLog.log({
            level: 'info',
            message: "There was an error during a user's registration.",
            additional: err.message,
            stack: err.stack
        });
    }
}

const login = async (_, { username, password }, {res}) => {
    try {
        const user = await User.findOne({ username:username })
        if (!user) return new Error('No user found')
        const valid = await bcrypt.compare(password, user.password)
        if (valid) {
            console.log(user)
            const token = jwt.sign({ user }, process.env.APP_SECRET)
            console.log("SIGNING COOKIE")
            // res.cookie("token", token, {
            //     httpOnly: false,
            //     secure: false,
            //     maxAge: 1000 * 60 * 60 * 24 * 7,
            //     sameSite: true,
            // })
            // localStorage.setItem('token', token)
            console.log(token)
            return {
                token,
                user,
            } 
        } else return new Error('Invalid password')
    }
    catch(err) {
        console.log(err)
    }
}

const createPost = async (_, { userId, username, body, image }, { pubsub }) => {
    console.log("nice")
    const user = await User.findOne({ username:username })
    if (!user) return new Error('No user found')
    console.log(user.posts)
    let post = {
        username,
        body,
        image
    }
    let userPost = new Post({
        postedBy: user,
        ...post
    })
    userPost.save()
    user.posts.push(post)
    user.save()
    pubsub.publish("NEW_POST", userPost)
    return post
}

const newConversation = async (_, { members }, ___) => {
    console.log('omg', members)
    members = members.split(', ')
    console.log(members)
    if (members[0] === members[1]) return;
    let existingConversation = await Conversation.find({
        // $or: [
            // {
                $and: [
                    { "members.0.username": { $in: members } },
                    { "members.1.username": { $in: members } }
                ]
            // },
            // {
            //     $and: [
            //         { "members.0.username": { $in: members } },
            //         { "members.1": { $exists: false} }
            //     ]
            // }

        // ]
    })
    console.log("OK", existingConversation)
    if (!existingConversation.length) {
        console.log("NO EXISTING CONVO", members)
        let conversationUsers = await User.find({username: { $in: members}})



        let conversation = new Conversation({
            members: conversationUsers,
            lastMessage: {},
            id: shortid.generate()
        })
        // conversation.lastMessage = {
        //     conversationId: conversation.id,
        //     content: "",
        //     author: ""
        // }
        console.log("BEFORE WE SAVE", conversation)
        conversation.save()
        console.log("SAVING", conversation)
        return conversation
    } else return existingConversation[0]
}

const sendMessage = async (_, { conversationId, content, author }, { pubsub }) => {
    let message = new Message({
        conversationId,
        content,
        author,
        timestamp: Date.now()
    })
    console.log(conversationId)
    let conversation = await Conversation.findOne({id: conversationId})
    conversation.lastMessage = message
    console.log("WE FOUND", conversation)
    conversation.save()
    message.save()
    pubsub.publish("NEW_MESSAGE", message)
    return {
        message: "Message sent",
        code: 200
    }
}

const uploadToCloudinary = async(_, { file }) => {

    const storeUpload = async ({ stream, filename, mimetype }) => {
        const id = shortid.generate();
        const path = `images/${id}-${filename}`;
        // (createWriteStream) writes our file to the images directory
        return new Promise((resolve, reject) =>
            stream
                .pipe(createWriteStream(path))
                .on("finish", () => resolve({ id, path, filename, mimetype }))
                .on("error", reject)
        );
    };

    const processUpload = async (upload) => {
        const { createReadStream, filename, mimetype } = await upload;
        const stream = createReadStream();
        const file = await storeUpload({ stream, filename, mimetype });
        console.log("THIS", file)
        let uploadedFile = await cloudinary.uploader.upload(file.path);

        console.log('final return promise', uploadedFile.url)
        try {
            unlinkSync(file.path)
        } catch(err) {
            console.error(err)
        }
        return uploadedFile.url
    };



    mkdir("images", { recursive: true }, (err) => {
        if (err) throw err;
    });
    // Process upload
    const upload = await processUpload(file);
    return upload;
}


module.exports = {
    signup,
    login,
    createPost,
    uploadToCloudinary,
    newConversation,
    sendMessage
}