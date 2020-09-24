const { gql } = require('apollo-server-express');


const typeDefs = gql`
    scalar Date

    type Query {
        users: [User!]!
        getUser(username: String): User!
        getPosts(username: String, userId: String): [Post]!
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
            userId: String!
            username: String!,
            body: String!
            image: String
        ): Post!

        uploadToCloudinary(
            file: Upload!
        ) : String!
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

    type Location {
        city: String!
        country: String!
    }

    schema {
        query: Query
        mutation: Mutation
    }


`;

module.exports = typeDefs