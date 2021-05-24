const { startApp } = require('./start-app')
const { createApp } = require('./create-app')
const { startServer } = require('./server')
const { startWatcher } = require('./watcher')

jest.mock('./server', () => ({ startServer: jest.fn() }))
jest.mock('./watcher', () => ({ startWatcher: jest.fn() }))
jest.mock('./create-app.js', () => ({
  createApp: jest.fn(),
}))

describe('startApp', () => {
  test('should start the app', async () => {
    const app = {
      prepare: jest.fn().mockResolvedValueOnce(),
    }
    const program = {}

    createApp.mockReturnValue(app)

    await startApp(program)

    expect(createApp).toHaveBeenCalledWith(program)

    expect(startWatcher).toHaveBeenCalledWith(program, app)
    expect(startServer).toHaveBeenCalledWith(app)
  })
})
