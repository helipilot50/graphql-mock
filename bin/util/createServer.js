const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { ApolloServer, gql, PubSub } = require('apollo-server');
const chalk = require('chalk');

const createServer = async (options) => {
    const pubsub = new PubSub();

    const typeDefsString = fs.readFileSync(options.file, 'utf8');

    const typeDefs = gql`${typeDefsString}`;

    const server = new ApolloServer({
        typeDefs,
        mocks: true,
        playground: true,
        subscriptions: {
            onConnect: (connectionParams, webSocket) => {
                console.log('Connection:');
            },
            onDisconnect: (webSocket, context) => {
                console.log('Disconnection');
            },
        },
    });

    return server.listen(options.port).then(({ url, subscriƒptionsUrl }) => {
        console.log(`🚀 Server ready at ${url}`);
        console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
    });
}

exports = {
    createServer
}