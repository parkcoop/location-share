require('dotenv').config();
const mongoose = require('mongoose');

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const { GraphQLServer } = require('graphql-yoga')

require('dotenv').config()

mongoose.connect(
  process.env.CONNECT_STRING, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, 
  (error) => {
    if(error) console.log('Failed to connect to database, y tho:', error);
});


const resolvers = {
  Query,
  Mutation
}


const server = new GraphQLServer({
    typeDefs: './server/schema.graphql',
    resolvers,
    context: req => ({ ...req })
  })

  server.start(()=> console.log('Travelers API listening on http://localhost:4000'))