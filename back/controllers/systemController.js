const {validationResult} = require('express-validator')
const apiError = require('../exceptions/apiError')
const patternService = require('../services/patternService')
const itemService = require('../services/itemService')
const settingsService = require('../services/settingsService')

class systemController {

    async createSetting(req, res, next){
        try{
            const {name, value, descr, name_text} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const createStatus = await settingsService.createSetting(name, value, name_text, descr, token)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async updateValue(req, res, next){
        try{
            const {id, value} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const createStatus = await settingsService.updateValue(id, value, token)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async updateData(req, res, next){
        try{
            const {id, name_text, descr} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const createStatus = await settingsService.updateData(id, name_text, descr, token)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async selectSettings(req, res, next){
        try{
            // const {name, value, descr} = req.body
            // const token = req.headers.authorization.split(' ')[1]
            const createStatus = await settingsService.selectSettings()
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async selectSetting(req, res, next){
        try{
            // const {name, value, descr} = req.body
            // const token = req.headers.authorization.split(' ')[1]
            const createStatus = await settingsService.selectSetting(req.query.value)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new systemController()