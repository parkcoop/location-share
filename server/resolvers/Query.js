const { User, Post } = require('./schemas')


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

const getPosts = async (_, {username, userId}) =>{ 
    console.log("entered", username)
//     //  let user = await User.find({username}, 
//     // (error, user) => {
//     //     console.log("LLLL")
//     //     if (error) throw new Error(error)
//     //     return user.posts
//     }
    
// )
    let Posts = await Post.find({username} || {postedBy: userId}, 
 (error, posts) => {
     console.log("LLLL")
     if (error) throw new Error(error)
     return posts
})
console.log("WE GOT",Posts)
return Posts
}


module.exports = {
    users,
    getUser,
    getPosts
}