const path = require('path')

function scriptLoader(filePath, event, program) {
  try {
    // find the path of your --script script
    const scriptPath = path.join(process.cwd(), program.script.toString())

    // require your --script script
    const executeFile = require(scriptPath)

    // run the exported function from your --script script
    executeFile(filePath, event)
  } catch (e) {
    console.error('Remote script failed')
    console.error(e)
    return e
  }
}

module.exports = scriptLoader
