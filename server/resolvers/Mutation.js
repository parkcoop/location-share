const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const { createWriteStream, mkdir } = require("fs")
const shortid = require("shortid")

const { User} = require('./schemas')
const { signupLog } = require('../utils/loggers')
const signup = async (_, { username, fullName, password }) => {
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
        const token = jwt.sign({userId: newUser.id}, process.env.APP_SECRET)
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

const login = async (_, { username, password }) => {
    try {
        const user = await User.findOne({ username:username })
        if (!user) return new Error('No user found')
        const valid = await bcrypt.compare(password, user.password)
        if (valid) {
            console.log(user)
            const token = jwt.sign({ userId:user.id }, process.env.APP_SECRET)
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

const createPost = async (_, { username, body }) => {
    console.log("nice")
    const user = await User.findOne({ username:username })
    if (!user) return new Error('No user found')
    console.log(user.posts)
    let post = {
        username,
        body,
        ID: 555
    }
    user.posts.push(post)
    user.save()
    return post
}

const uploadFile = async(_, { file }) => {
    console.log("WHAT")

    
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
        return file;
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
    uploadFile
}