const path = require('path')
const { defaultWatchEvent } = require('./constants')

async function onWatch(
  filePathContext,
  eventContext = defaultWatchEvent,
  app,
  program
) {
  app.server.hotReloader.send('building')

  if (program.script) {
    try {
      // find the path of your --script script
      const scriptPath = path.join(process.cwd(), program.script.toString())

      // require your --script script
      const executeFile = require(scriptPath)

      // run the exported function from your --script script
      executeFile(filePathContext, eventContext)
    } catch (e) {
      console.error('Remote script failed')
      console.error(e)
      return e
    }
  }

  app.server.hotReloader.send('reloadPage')
}

module.exports = { onWatch }
