const create = require('./create')

const startServer = require('../server/start')
const startWatcher = require('../watcher/start')

/**
 * Starts the Next.js Custom Dev Server
 * @param {Commander} program - Commander Program
 * @returns the Promise resulting from invoking `app.prepare`
 */
const start = (program) => {
  const app = create(program)

  return app.prepare().then(() => {
    startWatcher(program, app)
    startServer(app)
  })
}

module.exports = start
