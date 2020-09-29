const { User, Post, Conversation, Message } = require('./schemas')


const users = () => User.find({}, 
    (error, users) => {
        if (error) throw new Error(error)
        return users
    }
)

const getUser = async (_, { username }) =>{ 
    console.log("entered", username)
    let user = await User.find({ username }, 
        (error, user) => {
            console.log("LLLL")
            if (error) throw new Error(error)
            return user.posts
    }
    
    )
    console.log(user)
    return user[0]
}

const getPosts = async (_, { username, userId }, context, info) =>{ 
    console.log("searching posts for ", username, userId)
    console.log("logged in as", context.user)

    let query
    if (!username && !userId) query = {}
    // if (userId) query = { "postedBy": { id: userId } }
    if (username) query = { "postedBy.username" : username }
    console.log(query)
    return Post.find(query, 
        (error, posts) => {
            if (error) throw new Error(error)
            return posts
        }
    ) 

}

const conversations = async (_, { userId }, context, info) => Conversation.find({
    members: userId
}, 
    (error, conversations) => {
        if (error) throw new Error(error)
        return conversations
    }
)

const messages = async (_, { conversationId }, context, info) => Message.find({conversationId}, 
    (error, messages) => {
        if (error) throw new Error(error)
        return messages
})


module.exports = {
    users,
    getUser,
    getPosts,
    conversations,
    messages
}