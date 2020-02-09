const User = require('./schemas/User')


const users = () => User.find({}, (error, users) => {
    if (error) throw new Error(error)
    console.log('users: ', users)
    return users
})

module.exports = {
    users,
}