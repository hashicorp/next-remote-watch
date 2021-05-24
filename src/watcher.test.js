const { startWatcher } = require('./watcher')
const { onWatch } = require('./on-watch')
const chokidar = require('chokidar')

jest.mock('chokidar', () => {
  const chokidar = {
    watch: jest.fn().mockReturnThis(),
    on: jest.fn().mockImplementation(function (_, callback) {
      callback()
      return this
    }),
  }
  return chokidar
})

jest.mock('./on-watch.js', () => ({ onWatch: jest.fn() }))

describe('startWatcher', () => {
  beforeEach(jest.clearAllMocks)
  test('should start the watcher when there are `args` in the program', () => {
    const app = { something: undefined }
    const program = { args: ['src'], event: undefined, polling: undefined }

    startWatcher(program, app)

    expect(chokidar.watch).toHaveBeenCalledWith(program.args, {
      usePolling: Boolean(program.polling),
    })
    expect(chokidar.on).toHaveBeenCalledWith(
      program.event,
      expect.any(Function)
    )
    // the first two arguments are provided automatically by chokidar,
    // because we mock the `on` function, we can just use undefined for the purpose of this test
    expect(onWatch).toHaveBeenCalledWith(undefined, undefined, app, program)
  })

  test('should throw when path args are invalid', () => {
    const app = { something: undefined }
    const program = { args: undefined, event: undefined, polling: undefined }

    expect(() => startWatcher(program, app)).toThrowErrorMatchingInlineSnapshot(
      `"No arguments provided. Please provide a valid file or directory path to watch for changes."`
    )
  })

  test('should throw when no args are passed by the program', () => {
    const app = { something: undefined }
    const program = { args: [], event: undefined, polling: undefined }

    expect(() => startWatcher(program, app)).toThrowErrorMatchingInlineSnapshot(
      `"No arguments provided. Please provide a valid file or directory path to watch for changes."`
    )
  })
})
