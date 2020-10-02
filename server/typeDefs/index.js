const { gql } = require('apollo-server-express');


const typeDefs = gql`
    scalar Date

    type Query {
        users: [User!]!
        getUser(username: String): User!
        getPosts(username: String, userId: String): [Post]!
        conversations(username: String!): [Conversation]
        messages(conversationId: String!): [Message]
    }

    type File {
        id: ID!
        filename: String!
        mimetype: String!
        path: String!
    }

    type Mutation {
        signup(
            username: String!, 
            password: String!, 
            fullName: String! 
        ): AuthPayload

        login(
            username: String!, 
            password: String!
        ): AuthPayload

        createPost(
            userId: String
            username: String!,
            body: String!
            image: String
        ): Post!

        uploadToCloudinary(
            file: Upload!
        ) : String!

        newConversation(
            members: String!
        ) : Conversation!

        sendMessage(
            conversationId: String!
            content: String!
            author: String!
        ) : Response
    }

    type Subscription {
        newPost: Post
    }

    type AuthPayload {
        token: String
        user: User
    }

    type Response {
        message: String!
        code: Int!
    }

    type User {
        id: ID!
        username: String!
        password: String!
        avatar: String!
        email: String
        posts: [Post]
    }

    type Post {
        id: ID!
        postedBy: User!
        body: String!
        image: String
        comments: [Comment]!
        likes: Int!
        location: Location
    }

    type Comment {
        username: String!
        body: String!
        likes: Int!
    }

    type Conversation {
        id: ID!
        members: [User!]!
        lastMessage: Message
    }

    type Message {
        author: ID!
        content: String!
        conversationId: ID!
        timestamp: Date!
    }

    type Location {
        city: String!
        country: String!
    }

    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }


`;

module.exports = typeDefs