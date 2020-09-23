#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const yargs = require("yargs");
const { ApolloServer, gql, PubSub } = require('apollo-server');
const pubsub = new PubSub();

const options = yargs
 .usage("Usage: -f <Gql schema file>")
 .option("f", { alias: "file", describe: "GraphQL schema file", type: "string", demandOption: true })
 .argv;

const typeDefsString = fs.readFileSync(options.file, 'utf8');

const typeDefs = gql`${typeDefsString}`;

const server = new ApolloServer({
  typeDefs,
  mocks: true,
  playground: true,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      console.log('Connection:')     ;
    },
    onDisconnect: (webSocket, context) => {
        console.log('disconnection')  ;
    },
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});