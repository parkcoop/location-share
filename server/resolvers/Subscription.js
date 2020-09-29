function newPostSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_POST")
}

const newPost = {
    subscribe: newPostSubscribe,
    resolve: payload => {
        console.log("WHOOOAAA", payload)
        return payload
    }
}

// const newMessage = {
//     subscribe: newMessageSubscribe,
//     resolve: payload => {
//         return payload
//     }
// }

module.exports = {
    newPost,
    // newMessage
}