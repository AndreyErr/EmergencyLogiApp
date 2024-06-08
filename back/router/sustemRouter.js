const Router = require('express')
const router = new Router()

const authMiddleware = require('../middleware/authMiddleware')
const systemController = require('../controllers/systemController')
const checkRole = require('../middleware/roleMiddleware')

router.post('/addSetting', authMiddleware, checkRole([5]), systemController.createSetting)
router.post('/updateValue', authMiddleware, checkRole([5]), systemController.updateValue)
router.post('/updateData', authMiddleware, checkRole([5]), systemController.updateData)
router.get('/getSetting', authMiddleware, checkRole([5]), systemController.selectSettings)
router.get('/selectSetting', authMiddleware, checkRole([5]), systemController.selectSetting)

module.exports = router