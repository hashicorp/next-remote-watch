const startDevServer = require('./start')
const createDevServer = require('./create')
const { startServer } = require('../server')
const { startWatcher } = require('../watcher')

jest.mock('../server', () => ({ startServer: jest.fn() }))
jest.mock('../watcher', () => ({ startWatcher: jest.fn() }))
jest.mock('./create.js', () => jest.fn())

describe('startDevServer', () => {
  test('should start the app', async () => {
    const app = {
      prepare: jest.fn().mockResolvedValueOnce(),
    }
    const program = {}

    createDevServer.mockReturnValue(app)

    await startDevServer(program)

    expect(createDevServer).toHaveBeenCalledWith(program)

    expect(startWatcher).toHaveBeenCalledWith(program, app)
    expect(startServer).toHaveBeenCalledWith(app)
  })
})
