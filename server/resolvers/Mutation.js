const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const { User, City, Trip } = require('./schemas')
const { signupLog } = require('../utils/loggers')
const { asyncForEach } = require('../utils/services');

const signup = async (_, args) => {
    try {
        if (!args.username || !args.fullName || !args.password) return new Error('Missing required paramaters.')
        const encryptedPassword = await bcrypt.hash(args.password, 10)
        const userCheck = await User.find({ username:args.username }, 
            (error, users) => {
                if (error) throw new Error('Internal error finding user.')
                console.log('Existing user: ', users)
                return users
        })
            
        if (userCheck.length) return new Error(`The username "${args.username}" is already in use.`)
        const newUser = new User({
            username: args.username,
            password: encryptedPassword,
            fullName: args.fullName
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

const login = async (_, args) => {
    console.log(_, args)
    try {
        const user = await User.findOne({ username:args.username })
        if (!user) return new Error('No user found')
        const valid = await bcrypt.compare(args.password, user.password)
        if (valid) {
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

const addTrip = async(_, args) => {
    try {
        console.log(args)
        const locations = []
        await asyncForEach(args.locations, 
            async (location) => {
            let thisCity = await City.findOne({ city: location }, 
                (error, city) => {
                    if (error) throw new Error('Internal error finding cities.')
                    return city
            })
            locations.push({
                name: thisCity._doc.city,
                subCountry: thisCity._doc.admin_name,
                country: thisCity._doc.country,
                iso3: thisCity._doc.iso3,
                isCapital: (thisCity._doc.capital == 'primary' ||thisCity._doc.capital ==  'admin')
            })
        })
        
    
    
        const newTrip = new Trip({
            startDate: "09/29/1994",
            endDate: "",
            locations: locations,
            // people: [User!]
            // events: [Event!],
            name: args.name,
            description: args.description,
            creator: args.creator
        })
    console.log(newTrip)
        newTrip.save();
    
        return "Success"
        
    }
    catch(error) {
        console.log(error)
    }

    // try {
    //     // if (!args.username || !args.fullName || !args.password) return new Error('Missing required paramaters.')
        // const newTrip = 
        
    // }
}


module.exports = {
    signup,
    login,
    addTrip
}