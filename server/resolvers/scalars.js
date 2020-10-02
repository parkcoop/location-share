const { GraphQLScalarType } = require('graphql');
const moment = require('moment')


const Date = new GraphQLScalarType({
  name: "Image",
  description: "Unix timestamp for posts, messages, etc",
  parseValue: value => moment(value),
  serialize: value => moment(value),
  parseLiteral(ast) {
      console.log(ast)
  }
});

module.exports = [
    { "Date": Date }
]