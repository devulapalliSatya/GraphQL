const express = require('express');
const { createServer } = require('http');
const app = express();
const { ApolloServer} = require('apollo-server-express');
const {typeDefs} = require('./graphql/schema');
const {resolvers} = require('./graphql/result');

const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const httpServer = createServer(app);

  httpServer.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

startApolloServer();