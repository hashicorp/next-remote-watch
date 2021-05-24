const chokidar = require('chokidar')

const onWatch = require('./on-watch')

/**
 * Starts the Chokidar watcher.
 * @param {Commander} program Commander program
 * @param {Object} app Custom Next.js Dev Server
 * @returns chokidar module
 */
function start(program, app) {
  if (!Array.isArray(program.args) || program.args.length === 0) {
    throw new Error(
      'No arguments provided. Please provide a valid file or directory path to watch for changes.'
    )
  }

  return chokidar
    .watch(program.args, { usePolling: Boolean(program.polling) })
    .on(program.event, (filePathContext, eventContext) =>
      onWatch(filePathContext, eventContext, app, program)
    )
}

module.exports = start
