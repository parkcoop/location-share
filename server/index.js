require('dotenv').config();
const mongoose = require('mongoose');
const { GraphQLScalarType } = require('graphql');

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const scalars = require('./resolvers/scalars')
const pubsub = require('./resolvers/pubsub')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const http = require('http')
const moment = require('moment')
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

console.log("INJECTING", ...scalars)
  const resolvers = {
  Date: new GraphQLScalarType({
    name: "Image",
    description: "Unix timestamp for posts, messages, etc",
    parseValue: value => moment(value),
    serialize: value => moment(value),
    parseLiteral(ast) {
        console.log(ast)
    }
  }),
  Query,
  Mutation,
  Subscription
}

let app = express();
app.use('/lol', (req, res) => {
  console.log(req)
  res.json({parker:"LOL"})
})


const httpServer = http.createServer(app)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req, res}) => {
      return {
        user: {},
        res,
        pubsub
      }
    }
  })

app.use(cookieParser())
app.use(bodyParser.json())
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

server.applyMiddleware({ 
  app,
  path: '/graphql',
  cors: { 
    credentials: true, 
    origin: "http://localhost:3000" } 
});

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);