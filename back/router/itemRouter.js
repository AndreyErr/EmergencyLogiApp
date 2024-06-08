const Router = require('express')
const router = new Router()

const authMiddleware = require('../middleware/authMiddleware')
const itemController = require('../controllers/itemController')
const checkRole = require('../middleware/roleMiddleware')

router.post('/addItemIntoStorage', authMiddleware, itemController.addItemIntoStorage)
router.post('/editCategory', authMiddleware, checkRole([4, 5]), itemController.editCategory)
router.post('/createItem', authMiddleware, checkRole([4, 5]), itemController.createItem)
router.patch('/editItem', authMiddleware, checkRole([4, 5]), itemController.editItem)
router.get('/getItems', authMiddleware, itemController.getItems)
router.get('/searchItems', authMiddleware, itemController.searchItem)
router.get('/selectItemsTypes', authMiddleware, itemController.selectItemsTypes)

module.exports = router