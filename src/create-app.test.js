const { createApp } = require('./create-app')
// eslint-disable-next-line node/no-unpublished-require
const next = require('next')

jest.mock('next', () =>
  jest.fn().mockReturnValue({ prepare: jest.fn().mockResolvedValue() })
)

describe('createApp', () => {
  test('should create an instance of the next app', () => {
    const program = { root: '/test' }

    createApp(program)

    expect(next).toBeCalledWith({ dev: true, dir: program.root })
  })

  test('should create an instance of the next app without `root` parameter declared in the program', () => {
    createApp({})

    expect(next).toBeCalledWith({ dev: true, dir: process.cwd() })
  })
})
