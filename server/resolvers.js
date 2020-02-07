// // refactor

// const User = require('./resolvers/User')

// const resolvers = {
//     Query: {
//         users: () => User.find({}, (error, users) => {
//             if (error) throw new Error(error)
//             console.log('users: ', users)

//             return users
//         })
//     },
//     Mutation: {
//         signup: async function(_, args) {
//             User.find({username:args.username}).then(user => {
//                 const newUser = new User({
//                     username: args.username,
//                     password: args.password
//                 });
//                 newUser.save()
//                 return newUser
//             })

            
//         },
//         login: async function(_, args) {
//             // User.find({username:args.username}).then(user => {
//             //     const newUser = new User({
//             //         username: args.username,
//             //         password: args.password
//             //     });
//             //     newUser.save()
//             //     return newUser
//             // })

            
//         },

//     }
// }

// module.exports = resolvers