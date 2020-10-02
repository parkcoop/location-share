
const newPost = {
    subscribe: (parent, args, context, info) => context.pubsub.asyncIterator("NEW_POST"),
    resolve: payload => {
        console.log("WHOOOAAA", payload)
        return payload
    }
}

const newMessage = {
    subscribe: (parent, args, context, info) => context.pubsub.asyncIterator("NEW_MESSAGE"),
    resolve: payload => {
        console.log("LEAVE ME ALONE", payload)
        return payload
    }
}

module.exports = {
    newPost,
    newMessage
}