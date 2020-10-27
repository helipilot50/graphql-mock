const options = {
    port: {
      alias: 'p',
      description: 'Port that Apollo will run on.',
      default: 4000,
      demandOption: true,
      number: true,
    },
  
    cors: {
      description: 'Enables CORS headers.',
      boolean: true,
      default: true,
    },
  
  };
  
  module.exports = { options};