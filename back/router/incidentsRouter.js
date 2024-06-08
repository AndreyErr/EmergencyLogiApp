const Router = require('express')
const router = new Router()

const patternController = require('../controllers/patternController')
const authMiddleware = require('../middleware/authMiddleware')
const incidentsController = require('../controllers/incidentsController')

router.post('/create', authMiddleware, incidentsController.createIncident)
router.get('/get', authMiddleware, incidentsController.getIncident)
router.get('/getInputPattern', authMiddleware, incidentsController.getInputPattern)
router.get('/types', authMiddleware, incidentsController.getTypes)

module.exports = router