// import {
//   GraphQLDateTime,
//   GraphQLDate,
//   GraphQLTime
// } from 'graphql-iso-date'
import isoDate from 'graphql-iso-date'

import Query from './Query/index.mjs'
import Mutation from './Mutation/index.mjs'
// in alphabet order
import Answer from './Answer.mjs'
import Dispute from './Dispute.mjs'
import Match from './Match.mjs'
import Team from './Team.mjs'
import User from './User.mjs'

const resolvers = {
  Query,
  Mutation,
  DateTime: isoDate.GraphQLDateTime,
  Date: isoDate.GraphQLDate,
  Time: isoDate.GraphQLTime,
  // in alphabet order
  Answer,
  Dispute,
  Match,
  Team,
  User
}

export default resolvers
