const { startNextDevServer } = require('./next-dev-server')
const { createProgram } = require('./program')

/**
 * The main entry point for the CLI. Creates a Commander program and starts the Next.js Custom Dev Server
 */

function main() {
  const program = createProgram()

  startNextDevServer(program)
}

module.exports = {
  main,
}
