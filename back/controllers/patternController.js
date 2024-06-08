const {validationResult} = require('express-validator')
const apiError = require('../exceptions/apiError')
const patternService = require('../services/patternService')

class patternController {

    async createPattern(req, res, next){
        try{
            const {pattern, actionType} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const createStatus = await patternService.createPattern(pattern, actionType, token)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async getPattern(req, res, next){
        try{
            const id = req.query.id
            const filter = req.query.filter
            const createStatus = await patternService.getPattern(id, filter)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async getPatternCommon(req, res, next){
        try{
            const codeName = req.query.codeName
            const type = req.query.type
            const createStatus = await patternService.getPatternCommon(codeName, type)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new patternController()