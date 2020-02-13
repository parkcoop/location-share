const { User, Trip } = require('./schemas')


const users = () => User.find({}, (error, users) => {
    if (error) throw new Error(error)
    console.log('users: ', users)
    return users
})

// const trips = () => Trip.find()

module.exports = {
    users,
}