const express = require('express')

const reloadRouter = require('./router/reload')
const start = require('./start')

jest.mock('express', () =>
  jest.fn().mockReturnValue({
    use: jest.fn(),
    all: jest.fn(),
    listen: jest.fn().mockImplementation((port, cb) => cb()),
  })
)

jest.mock('./router/reload.js', () => jest.fn())

express.json = jest.fn()

const server = express()

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
    expect(server.use).toHaveBeenNthCalledWith(1, express.json())
    expect(server.use).toHaveBeenNthCalledWith(
      2,
      '/__next_reload',
      reloadRouter
    )
    // TODO: refine this mock assertion down to the nested callbacks
    expect(server.all).toHaveBeenCalledWith('*', expect.any(Function))

    expect(server.listen).toHaveBeenCalledWith(port, expect.any(Function))

    expect(console.log).toHaveBeenCalledWith(
      `> Ready on http://localhost:${port}`
    )
  })
})
