const Router = require('express')
const router = new Router()

const authMiddleware = require('../middleware/authMiddleware')
const externalLinkController = require('../controllers/externalLinkController')
const checkRole = require('../middleware/roleMiddleware')

router.post('/create', authMiddleware, checkRole([3, 4, 5]), externalLinkController.create)
router.patch('/edit', authMiddleware, checkRole([3, 4, 5]), externalLinkController.edit)
router.post('/delete', authMiddleware, checkRole([3, 4, 5]), externalLinkController.delete)
router.post('/test', authMiddleware, checkRole([3, 4, 5]), externalLinkController.test)
router.post('/testResp', authMiddleware, checkRole([3, 4, 5]), externalLinkController.testResp)
router.get('/get', authMiddleware, checkRole([3, 4, 5]), externalLinkController.get)

module.exports = router