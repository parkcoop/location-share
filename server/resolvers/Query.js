const { User, Trip } = require('./schemas')


const users = () => User.find({}, 
    (error, users) => {
        if (error) throw new Error(error)
        return users
    }
)

const trips = (_, { userId }) => Trip.find({creator: userId}, 
    (error, trips) => {
        if (error) throw new Error(error)
        return trips
    }
)


module.exports = {
    users,
    trips
}