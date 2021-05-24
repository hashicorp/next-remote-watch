const { setupProgram } = require('./program')
const { startApp } = require('./start-app')
/**
 * The main entry point for the CLI. Creates a Commander program and starts the Next.js Custom Dev Server
 */
function main() {
  const program = setupProgram()

  startApp(program)
}

module.exports = {
  main,
}
