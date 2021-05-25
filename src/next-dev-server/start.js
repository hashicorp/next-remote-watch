const { startServer } = require('../server')
const { startWatcher } = require('../watcher')

const create = require('./create')

/**
 * Starts the Next.js Custom Dev Server
 * @param {Commander} program - Commander Program
 * @returns the Promise resulting from invoking `app.prepare`
 */
function startDevServer(program) {
  const app = create(program)

  return app.prepare().then(() => {
    startWatcher(program, app)
    startServer(app)
  })
}

module.exports = startDevServer
