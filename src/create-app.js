// eslint-disable-next-line node/no-unpublished-require
const next = require('next')

/**
 * Creates an instance of a Next,js Custom Dev Server based on given parameters from the Commander program.
 * @param {Commander} program - a Commander program
 * @returns an instance of Next.js Custom Dev Server
 */
function createApp(program) {
  return next({ dev: true, dir: program.root || process.cwd() })
}

module.exports = { createApp }
