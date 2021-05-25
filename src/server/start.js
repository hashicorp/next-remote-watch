const express = require('express')
const { parse } = require('url')

const reloadRouter = require('./router/reload')


function start(app) {
  const port = parseInt(process.env.PORT, 10) || 3000

  const handle = app.getRequestHandler()

  const server = express()

  server.use(express.json())

  server.use('/__next_reload', reloadRouter)

  // handle all other routes with next.js
  server.all('*', (req, res) => handle(req, res, parse(req.url, true)))

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}

module.exports = start
