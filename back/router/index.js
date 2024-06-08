const Router = require('express')
const router = new Router()
const userRouter = require('./userRoutes')
const geoRouter = require('./geoRouter')
const storagesRouter = require('./storagesRouter')
const patternRouter = require('./patternRouter')
const incidentsRouter = require('./incidentsRouter')
const sustemRouter = require('./sustemRouter')
const itemRouter = require('./itemRouter')
const externalLinkRouter = require('./externalLinkRouter')

router.use('/user', userRouter)
router.use('/geo', geoRouter)
router.use('/pattern', patternRouter)
router.use('/incident', incidentsRouter)
router.use('/storage', storagesRouter)
router.use('/item', itemRouter)
router.use('/externalLink', externalLinkRouter)
router.use('/system', sustemRouter)

module.exports = router