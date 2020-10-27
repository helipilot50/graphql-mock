// import { CommandModule } from 'yargs';
const {options} = require('../util/options');
const { runAndWatch } = require ('../util/runner');

const mockCommand = {
    describe: 'Start a mock Apollo GraphQL Server with the given Schema Definition file',
    command: 'mock <schema>',
    builder: yargs =>
        yargs
            .positional('schema', {
                description: 'Path to a Schema Definition file. Can be both a file or a fetchable resource on the web.',
                type: 'string',
            })
            .options(
                sharedOptions
                ),
    handler: parsedArgs => {
        const {
            schema,
        } = (parsedArgs);

        const options = {schema};

        return runAndWatch(options);
    },
};

module.export = {
    mockCommand
};
