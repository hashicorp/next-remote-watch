const { setupProgram } = require('./program')
const { startDevServer: startDevServer } = require('./dev-server')
/**
 * The main entry point for the CLI. Creates a Commander program and starts the Next.js Custom Dev Server
 */
function main() {
  const program = setupProgram()

  startDevServer(program)
}

module.exports = {
  main,
}
