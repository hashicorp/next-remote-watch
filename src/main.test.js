const { main } = require('./main')
const { startApp } = require('./start-app')
const { setupProgram } = require('./program')

jest.mock('./start-app.js')
jest.mock('./program.js')

const mockProgram = jest.fn()

describe('main', () => {
  beforeEach(jest.clearAllMocks)
  test('should setup the program and start the app', () => {
    setupProgram.mockReturnValueOnce(mockProgram)

    main()

    expect(setupProgram).toHaveBeenCalledWith()
    expect(startApp).toHaveBeenCalledWith(mockProgram)
  })
})
