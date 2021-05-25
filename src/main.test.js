const { main } = require('./main')
const { startNextDevServer } = require('./next-dev-server')
const { createProgram } = require('./program')

jest.mock('./next-dev-server', () => ({ startNextDevServer: jest.fn() }))
jest.mock('./program', () => ({ createProgram: jest.fn() }))

const mockProgram = jest.fn()

describe('main', () => {
  beforeEach(jest.clearAllMocks)
  test('should setup the program and start the app', () => {
    createProgram.mockReturnValueOnce(mockProgram)

    main()

    expect(createProgram).toHaveBeenCalledWith()
    expect(startNextDevServer).toHaveBeenCalledWith(mockProgram)
  })
})
