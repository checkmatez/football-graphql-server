import graphqlYoga from 'graphql-yoga'
import graphqlImport from 'graphql-import'
import winston from 'winston'

import resolvers from './src/resolvers/index.mjs'

const server = new graphqlYoga.GraphQLServer({
  typeDefs: graphqlImport.importSchema('./src/schema/root.graphql'),
  resolvers,
  context: ({ request }) => ({ accessToken: request.headers.authorization })
})

server.start(() =>
  winston.info(`The server is running on http://localhost:4000`)
)
