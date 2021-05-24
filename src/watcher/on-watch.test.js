const onWatch = require('./on-watch')
const scriptLoader = require('./script-loader')

jest.mock('./script-loader.js', () => jest.fn())

describe('onWatch', () => {
  beforeEach(jest.clearAllMocks)
  test('should ', () => {
    const filePathContext = 'dummy'
    const eventContext = 'dummy'
    const app = { server: { hotReloader: { send: jest.fn() } } }
    const program = { script: 'dummy' }

    onWatch(filePathContext, eventContext, app, program)

    expect(scriptLoader).toHaveBeenCalledWith(
      filePathContext,
      eventContext,
      program
    )

    expect(app.server.hotReloader.send).toHaveBeenCalledTimes(2)
    expect(app.server.hotReloader.send).toHaveBeenNthCalledWith(1, 'building')
    expect(app.server.hotReloader.send).toHaveBeenNthCalledWith(2, 'reloadPage')
  })
})
