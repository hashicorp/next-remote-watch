const { main } = require('./main')
const startNextDevServer = require('./next-dev-server/start')
const createProgram = require('./program/create')

jest.mock('./next-dev-server/start.js', () => jest.fn())
jest.mock('./program/create.js', () => jest.fn())

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
