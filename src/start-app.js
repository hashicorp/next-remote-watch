const { startServer } = require('./server')
const { startWatcher } = require('./watcher')
const { createApp } = require('./create-app')

/**
 * Starts the Next.js Custom Dev Server
 * @param {Commander} program - Commander Program
 * @returns the Promise resulting from invoking `app.prepare`
 */
function startApp(program) {
  const app = createApp(program)

  return app.prepare().then(() => {
    startWatcher(program, app)
    startServer(app)
  })
}

module.exports = { startApp }
