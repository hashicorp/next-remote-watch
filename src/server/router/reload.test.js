const express = require('express')

const reloadController = require('../controllers/reload')

const createRouter = require('./reload')

jest.mock('express', () => ({
  Router: jest.fn().mockReturnValue({
    all: jest.fn().mockImplementation((endpoint, cb) => {
      cb()
      return
    }),
  }),
}))

jest.mock('../controllers/reload.js', () => jest.fn())

describe('createRouter', () => {
  test('should create and configure a new router instance', () => {
    const app = { something: 'dummy' }

    createRouter(app)

    expect(express.Router).toHaveBeenCalledWith()
    expect(express.Router().all).toHaveBeenCalledWith('/', expect.any(Function))
    // first two arguments (req, res) are always guaranteed by express
    expect(reloadController).toHaveBeenCalledWith(undefined, undefined, app)
  })
})
