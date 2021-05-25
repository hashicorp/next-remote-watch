const express = require('express')

const reloadController = require('./controllers/reload')
const start = require('./start')

jest.mock('express', () =>
  jest.fn().mockReturnValue({
    use: jest.fn(),
    all: jest.fn(),
    listen: jest.fn().mockImplementation((port, cb) => cb()),
  })
)

jest.mock('./controllers/reload.js', () => jest.fn())

express.json = jest.fn()
express.Router = jest
  .fn()
  .mockReturnValue({ all: jest.fn().mockImplementation((_, cb) => cb()) })

const server = express()
const nextReloadRouter = express.Router()

describe('start', () => {
  beforeEach(jest.clearAllMocks)

  afterAll(() => {
    delete process.env.PORT
  })
  test('should start an express server', () => {
    jest.spyOn(console, 'log').mockImplementation()

    process.env.PORT = 1212

    const app = { getRequestHandler: jest.fn() }
    const port = parseInt(process.env.PORT, 10)

    start(app)

    expect(app.getRequestHandler).toHaveBeenCalledTimes(1)
    expect(express).toHaveBeenCalledWith()
    expect(nextReloadRouter.all).toHaveBeenCalledWith('*', expect.any(Function))
    expect(reloadController).toHaveBeenCalledWith(undefined, undefined, app)
    expect(server.use).toHaveBeenNthCalledWith(1, express.json())
    expect(server.use).toHaveBeenNthCalledWith(
      2,
      '/__next_reload',
      nextReloadRouter
    )
    // TODO: refine this mock assertion down to the nested callbacks
    expect(server.all).toHaveBeenCalledWith('*', expect.any(Function))

    expect(server.listen).toHaveBeenCalledWith(port, expect.any(Function))

    expect(console.log).toHaveBeenCalledWith(
      `> Ready on http://localhost:${port}`
    )
  })
})
