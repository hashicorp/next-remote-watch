const { main } = require('./main')
const { startDevServer } = require('./dev-server')
const { createProgram } = require('./program')

jest.mock('./dev-server', () => ({ startDevServer: jest.fn() }))
jest.mock('./program', () => ({ createProgram: jest.fn() }))

const mockProgram = jest.fn()

describe('main', () => {
  beforeEach(jest.clearAllMocks)
  test('should setup the program and start the app', () => {
    createProgram.mockReturnValueOnce(mockProgram)

    main()

    expect(createProgram).toHaveBeenCalledWith()
    expect(startDevServer).toHaveBeenCalledWith(mockProgram)
  })
})
