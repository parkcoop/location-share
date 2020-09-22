const { gql } = require('apollo-server-express');


const typeDefs = gql`
    scalar Date

    type Query {
        users: [User!]!
        getUser(id: String): User!
        getPosts(username: String!): [Post]!
        files: [File!]

    }

    input CreatePost {
        username: String!
        body: String!
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
            username: String!,
            body: String!
        ): Post!

        uploadFile(
            file: Upload!
        ) : File
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
        username: String!
        body: String!
    }

    schema {
        query: Query
        mutation: Mutation
    }


`;

module.exports = typeDefs