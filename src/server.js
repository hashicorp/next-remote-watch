const express = require('express')
const bodyParser = require('body-parser')
const { parse } = require('url')
const { requestLogger } = require('./logger')

function startServer(app) {
  const port = parseInt(process.env.PORT, 10) || 3000
  const handle = app.getRequestHandler()
  // create an express server
  const server = express()

  // special handling for mdx reload route
  const reloadRoute = express.Router()
  reloadRoute.use(bodyParser.json())
  reloadRoute.all('/', (req, res) => {
    requestLogger(req)

    // reload the nextjs app
    app.server.hotReloader.send('building')
    app.server.hotReloader.send('reloadPage')
    res.end('Reload initiated')
  })

  server.use('/__next_reload', reloadRoute)

  // handle all other routes with next.js
  server.all('*', (req, res) => handle(req, res, parse(req.url, true)))

  // fire it up
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}

module.exports = { startServer }
