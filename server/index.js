require('dotenv').config();
const mongoose = require('mongoose');

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const { GraphQLServer } = require('graphql-yoga')
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs')
const path = require('path')
const cors = require('cors')
// import path from "path";
const typeDefs = require('./typeDefs')


require('dotenv').config()

mongoose.connect(
  process.env.CONNECT_STRING, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }, 
  (error) => {
    if(error) console.log('Failed to connect to database, y tho:', error);
})


const resolvers = {
  Query,
  Mutation
}

let app = express();
app.use('/lol', (req, res) => {
  console.log(req)
  res.json({parker:"LOL"})
})
app.listen(8080)

const server = new ApolloServer({
    typeDefs,
    resolvers
  })

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);