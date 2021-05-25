const create = require('./create')
const start = require('./start')

const startServer = require('../server/start')
const startWatcher = require('../watcher/start')

jest.mock('../server/start.js', () => jest.fn())
jest.mock('../watcher/start.js', () => jest.fn())
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
