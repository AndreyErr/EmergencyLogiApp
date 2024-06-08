const Router = require('express')
const router = new Router()
const {body} = require('express-validator')

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

router.post('/userReg', authMiddleware, userController.createUser)
router.post('/userLogin', userController.loginUser)
router.get('/auth', authMiddleware, userController.check)
router.patch('/userEdit', authMiddleware, userController.editUser)
router.patch('/editPass', authMiddleware, userController.editPass)
router.get('/selectUsers', authMiddleware, checkRole([3, 4, 5]), userController.selectUsers)
router.get('/searchUsers', authMiddleware, checkRole([3, 4, 5]), userController.searchUser)
router.get('/getUser', authMiddleware, userController.getUser)
router.get('/selectUsersTypes', authMiddleware, checkRole([3, 4, 5]), userController.selectUsersTypes)
router.post('/updateUserStatus', authMiddleware, checkRole([3, 4, 5]), userController.updateUserStatus)

module.exports = router