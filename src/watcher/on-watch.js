const scriptLoader = require('./script-loader')

const { defaultWatchEvent } = require('../constants')

/**
 * Callback used within the `on` listener in chokidar. Is executed every time a file is changed under a given `filePath`.
 * Can execute an additional custom script if a --script argument is passed to the program.
 * @param {string} filePath - the file path to the file or directory to watch
 * @param {string} event - the different chokidar `on` events
 * @param {Object} app - Custom Next.js Dev Server
 * @param {Commander} program - Commander program
 */
const onWatch = async (filePath, event = defaultWatchEvent, app, program) => {
  app.server.hotReloader.send('building')

  if (program.script) {
    scriptLoader(filePath, event, program)
  }

  app.server.hotReloader.send('reloadPage')
}

module.exports = onWatch
