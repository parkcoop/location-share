const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')
const User = require('./User')

const signup = async (_, args) => {
    try {
        const password = await bcrypt.hash(args.password, 10)
        const userCheck = await User.find({username:args.username})
        if (userCheck.length) return new Error('User already exists')
        const newUser = new User({
            username: args.username,
            password: password
        })
        newUser.save();
        const token = jwt.sign({userId: newUser.id}, APP_SECRET)
        return {
            token,
            user: newUser
        }
    }
    catch(err) {
        console.log(err)
    }
}

const login = async (_, args) => {
    console.log(_, args)
    try {
        const user = await User.findOne({username:args.username});
        if (!user) return new Error('No user found');
        const valid = await bcrypt.compare(args.password, user.password)
        if (valid) {
            const token = jwt.sign({userId:user.id}, APP_SECRET)
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


module.exports = {
    signup,
    login,
}