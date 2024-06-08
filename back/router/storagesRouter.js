const Router = require('express')
const router = new Router()

const storagesController = require('../controllers/storagesController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

router.post('/create', authMiddleware, checkRole([3, 4, 5]), storagesController.createStorage)
router.post('/update', authMiddleware, checkRole([3, 4, 5]), storagesController.updateStorage)
router.post('/getClosest', authMiddleware, storagesController.getClosestStorages)
router.get('/get', authMiddleware, storagesController.getStorage)
router.get('/getItemsInStorage', authMiddleware, storagesController.getItemsInStorage)
router.get('/getStoragesCoords', authMiddleware, storagesController.getStoragesCoords)
router.post('/addItemCountToStorage', authMiddleware, checkRole([3, 4, 5]), storagesController.addItemCountToStorage)
router.get('/searchItem', authMiddleware, storagesController.searchItem)
router.post('/addItemToStorage', authMiddleware, checkRole([3, 4, 5]), storagesController.addItemToStorage)
router.post('/deleteItemFromStorage', authMiddleware, checkRole([3, 4, 5]), storagesController.deleteItemFromStorage)
// router.delete('/delete', authMiddleware, storagesController.createStorage)

module.exports = router