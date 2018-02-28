const {
  GraphQLDateTime,
  GraphQLDate,
  GraphQLTime
} = require('graphql-iso-date')

const Query = require('./Query')
const Mutation = require('./Mutation')
// in alphabet order
const Answer = require('./Answer')
const Dispute = require('./Dispute')
const Match = require('./Match')
const Team = require('./Team')
const User = require('./User')

const resolvers = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
  Time: GraphQLTime,
  // in alphabet order
  Answer,
  Dispute,
  Match,
  Team,
  User
}

module.exports = resolvers
