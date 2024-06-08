const Router = require('express')
const router = new Router()

const geoController = require('../controllers/geoController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/getAddress', authMiddleware, geoController.getAddress)

module.exports = router