const { GraphQLServer } = require('graphql-yoga')
const { importSchema } = require('graphql-import')
const winston = require('winston')

const resolvers = require('./src/resolvers')

const server = new GraphQLServer({
  typeDefs: importSchema('./src/schema/root.graphql'),
  resolvers,
  context: ({ request }) => ({ accessToken: request.headers.authorization })
})

server.start(() =>
  winston.info(`The server is running on http://localhost:4000`)
)
