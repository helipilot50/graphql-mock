#!/usr/bin/env node
const yargs = require('yargs');
const { runAndWatch } = require('./util/runner');

yargs
  // .version()
  // .help(true)
  // .wrap(yargs.terminalWidth)
  .command('$0', 'start an Apollo Server Mock',
    (yargs) => {
      yargs
        .positional('schema', {
          describe: 'GraphQL Schema Definition',
        })
    }, (argv) => {
      if (argv.verbose)
        console.log(`Mock Apollo Server using: ${argv.schema}`)
      runAndWatch(argv.schema);
    })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .argv;

