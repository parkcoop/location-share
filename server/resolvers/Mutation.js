const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const { User, City, Trip } = require('./schemas')
const { signupLog } = require('../utils/loggers')
const { asyncForEach } = require('../utils/services');
const languages = require('../utils/data/languages')
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

const addTrip = async(_, args) => {
    try {
        const locations = []
        await asyncForEach(args.locations, 
            async (location) => {
                let cityData = await City.findOne({ city: location }, 
                    (error, city) => {
                        if (error) throw new Error('Internal error finding cities.')
                        return city
                })
                if (!cityData) throw new Error('No city found, please type again.')
                locations.push({
                    name: cityData.city,
                    subCountry: cityData.admin_name,
                    country: cityData.country,
                    iso3: cityData.iso3,
                    isCapital: (cityData.capital == 'primary' ||cityData.capital ==  'admin')
                })
            }
        )
        
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


        newTrip.save();
        return {
            message: "Successfully added trip.",
            code: 200
        }
        
    }
    catch(error) {
        console.log(error)
        return {
            message: error.message,
            code: 400
        }
    }

    // try {
    //     // if (!args.username || !args.fullName || !args.password) return new Error('Missing required paramaters.')
        // const newTrip = 
        
    // }
}

const editUserDetails = async(_, args) => {
    console.log('lol',args)
    args.language = languages.filter((language => language.name == args.language))[0]
    if (!args.language) return {
        message: "Check language",
        code: 455
    }
    
   
    console.log('sending: ', args)

    try {
        const userUpdated = User.findByIdAndUpdate(args.id,
            {$set: args},
            (error, user) => {
                if (error) throw new Error(error)
                return user
            }
        )
        if (userUpdated) return {
            message: "Successfully updated user.",
            code: 200
        }
    }
    catch(error) {
        console.log(error)
        return {
            message: error.message,
            code: 400
        }
    }
}


module.exports = {
    signup,
    login,
    addTrip,
    editUserDetails
}