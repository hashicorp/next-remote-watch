const requestLogger = require('../logger/request-logger')

const reloadController = (req, res, app) => {
  requestLogger(req)

  app.server.hotReloader.send('building')
  app.server.hotReloader.send('reloadPage')

  res.end('Reload initiated')
}

module.exports = reloadController
