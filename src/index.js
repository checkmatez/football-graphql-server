const { GraphQLServer } = require('graphql-yoga')

const resolvers = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: ({ request }) => ({ accessToken: request.headers.authorization })
})

server.start(() =>
  console.log(`The server is running on http://localhost:4000`)
)
