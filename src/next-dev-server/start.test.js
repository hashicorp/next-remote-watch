const create = require('./create')
const start = require('./start')

const { startServer } = require('../server')
const { startWatcher } = require('../watcher')

jest.mock('../server', () => ({ startServer: jest.fn() }))
jest.mock('../watcher', () => ({ startWatcher: jest.fn() }))
jest.mock('./create.js', () => jest.fn())

describe('start', () => {
  test('should start the app', async () => {
    const app = {
      prepare: jest.fn().mockResolvedValueOnce(),
    }
    const program = {}

    create.mockReturnValue(app)

    await start(program)

    expect(create).toHaveBeenCalledWith(program)

    expect(startWatcher).toHaveBeenCalledWith(program, app)
    expect(startServer).toHaveBeenCalledWith(app)
  })
})
