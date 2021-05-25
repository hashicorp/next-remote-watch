const reload = require('./reload')

jest.mock('../logger/request-logger.js', () => jest.fn())

describe('reloadController', () => {
  test('should create a controller that sends reload messages to the next dev server', () => {
    const req = {}
    const res = { end: jest.fn() }
    const app = { server: { hotReloader: { send: jest.fn() } } }

    reload(req, res, app)

    expect(app.server.hotReloader.send).toHaveBeenNthCalledWith(1, 'building')
    expect(app.server.hotReloader.send).toHaveBeenNthCalledWith(2, 'reloadPage')
    expect(res.end).toHaveBeenCalledWith('Reload initiated')
  })
})
