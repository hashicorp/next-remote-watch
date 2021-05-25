const commander = require('commander')

const create = require('./create')

const pkg = require('../../package.json')
const { defaultWatchEvent } = require('../constants')

jest.mock('commander', () => {
  return {
    version: jest.fn(),
    option: jest.fn().mockReturnThis(),
    parse: jest.fn(),
  }
})

jest.mock('../constants', () => ({
  defaultWatchEvent: 'mock',
}))

describe('create', () => {
  beforeEach(jest.clearAllMocks)

  test('should setup `commander` with the correct configuration', () => {
    process.argv = ['a', 'b']
    const program = create()

    // we want to make sure the program we export is the same commander instance we import
    expect(program).toBe(commander)

    expect(commander.version).toHaveBeenCalledWith(pkg.version)
    expect(commander.parse).toHaveBeenCalledWith(['a', 'b'])
    expect(commander.option).toHaveBeenCalledTimes(4)

    expect(commander.option).toHaveBeenNthCalledWith(
      1,
      '-r, --root [dir]',
      'root directory of your nextjs app'
    )

    expect(commander.option).toHaveBeenNthCalledWith(
      2,
      '-s, --script [path]',
      'path to the script you want to trigger on a watcher event',
      false
    )

    expect(commander.option).toHaveBeenNthCalledWith(
      3,
      '-e, --event [name]',
      `name of event to watch, defaults to ${defaultWatchEvent}`,
      defaultWatchEvent
    )

    expect(commander.option).toHaveBeenNthCalledWith(
      4,
      '-p, --polling [name]',
      `use polling for the watcher, defaults to false`,
      false
    )
  })
})
