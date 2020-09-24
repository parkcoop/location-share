const { User } = require('./schemas')


const users = () => User.find({}, 
    (error, users) => {
        if (error) throw new Error(error)
        return users
    }
)

const getUser = async (_, {username}) =>{ 
    console.log("entered", username)
    let user = await User.find({username}, 
        (error, user) => {
            console.log("LLLL")
            if (error) throw new Error(error)
            return user.posts
    }
    
    )
    console.log(user)
    return user[0]
}

const getPosts = async (_, {username}) =>{ 
    console.log("entered", username)
     let user = await User.find({username}, 
    (error, user) => {
        console.log("LLLL")
        if (error) throw new Error(error)
        return user.posts
    }
    
)
console.log(user)
return user[0].posts
}

module.exports = {
    users,
    getUser,
    getPosts
}