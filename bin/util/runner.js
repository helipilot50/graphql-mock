const chokidar = require('chokidar');
const os = require('os');
const { createServer } = require('./createServer');


const  runAndWatch = async (options) => {
  try {
    let server = await createServer(options);
    console.log('got here');
  
    const watcher = chokidar.watch(options.document, {
      persistent: os.platform() === 'darwin',
      disableGlobbing: true,
      awaitWriteFinish: { stabilityThreshold: 500, pollInterval: 100 },
    });
    watcher.on('change', () => {
      server.logger.info('Restarting Apollo Server...');
      try{
        return createServer(options);
      } catch (error) {
        console.error('Cannot creqate Apollo Server:', error)
        process.exit(1);
      }
    });
    return new Promise(resolve => watcher.once('ready', resolve));
  }catch (error){
    process.exit(1);
  }
}

module.exports = {
  runAndWatch
}