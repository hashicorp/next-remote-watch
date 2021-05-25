const next = require('next')

/**
 * Creates an instance of a Next,js Custom Dev Server based on given parameters from the Commander program.
 * @param {Commander} program - a Commander program
 * @returns an instance of Next.js Custom Dev Server
 */
const create = (program) => {
  return next({ dev: true, dir: program.root || process.cwd() })
}

module.exports = create
