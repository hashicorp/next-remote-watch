const { main } = require('./main')
const { startDevServer: startDevServer } = require('./dev-server')
const { setupProgram } = require('./program')

jest.mock('./dev-server', () => ({ startDevServer: jest.fn() }))
jest.mock('./program', () => ({ setupProgram: jest.fn() }))

const mockProgram = jest.fn()

describe('main', () => {
  beforeEach(jest.clearAllMocks)
  test('should setup the program and start the app', () => {
    setupProgram.mockReturnValueOnce(mockProgram)

    main()

    expect(setupProgram).toHaveBeenCalledWith()
    expect(startDevServer).toHaveBeenCalledWith(mockProgram)
  })
})
