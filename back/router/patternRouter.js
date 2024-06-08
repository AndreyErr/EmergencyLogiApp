const Router = require('express')
const router = new Router()

const patternController = require('../controllers/patternController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

router.post('/create', authMiddleware, checkRole([4, 5]), patternController.createPattern)
router.get('/get', authMiddleware, patternController.getPattern)
router.get('/getPatternCommon', authMiddleware, patternController.getPatternCommon)

module.exports = router