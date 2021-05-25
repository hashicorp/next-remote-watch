const express = require('express')

const reloadController = require('../controllers/reload')

const reloadRouter = express.Router()

function createRouter(app) {
  reloadRouter.all('/', (req, res) => reloadController(req, res, app))
}

module.exports = createRouter
