const createDevServer = require('./create')
const next = require('next')

jest.mock('next', () =>
  jest.fn().mockReturnValue({ prepare: jest.fn().mockResolvedValue() })
)

describe('createDevServer', () => {
  test('should create an instance of the next app', () => {
    const program = { root: '/test' }

    createDevServer(program)

    expect(next).toBeCalledWith({ dev: true, dir: program.root })
  })

  test('should create an instance of the next app without `root` parameter declared in the program', () => {
    createDevServer({})

    expect(next).toBeCalledWith({ dev: true, dir: process.cwd() })
  })
})
