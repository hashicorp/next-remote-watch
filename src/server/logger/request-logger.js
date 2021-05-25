const chalk = require('chalk')

const requestLogger = (req) => {
  // log message if present
  const msg = req.body.message
  const color = req.body.color
  msg && console.log(color ? chalk[color](msg) : msg)
}

module.exports = requestLogger
