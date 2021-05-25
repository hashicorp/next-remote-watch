const start = require('./next-dev-server/start')
const createProgram = require('./program/create')

/**
 * The main entry point for the CLI. Creates a Commander program and starts the Next.js Custom Dev Server
 */

function main() {
  const program = createProgram()

  start(program)
}

module.exports = {
  main,
}
