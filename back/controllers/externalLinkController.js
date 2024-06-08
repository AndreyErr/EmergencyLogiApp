const {validationResult} = require('express-validator')
const apiError = require('../exceptions/apiError')
const patternService = require('../services/patternService')
const externalLinkService = require('../services/externalLinkService')

class externalLinkController {

    async create(req, res, next){
        try{
            const {name, descr, href, body, apikey, status} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const createStatus = await externalLinkService.create(name, descr, href, body, apikey, status, token)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async edit(req, res, next){
        try{
            const {name, descr, href, body, apikey, status, id} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const editStatus = await externalLinkService.edit(name, descr, href, body, apikey, status, id, token)
            res.json(editStatus)
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next){
        try{
            const {id} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const deleteStatus = await externalLinkService.delete(id, token)
            res.json(deleteStatus)
        } catch (e) {
            next(e);
        }
    }

    async test(req, res, next){
        try{
            const {id} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const data = await externalLinkService.get(id, 'id', token)
            const result = await externalLinkService.sent(data[0][0].link_href, data[0][0].link_body, data[0][0].link_apikey, "test")
            res.json(result)
        } catch (e) {
            next(e);
        }
    }
    
    async testResp(req, res, next){
        try{
            const {data} = req.body
            res.json({"status": "OK", "text": data})
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1]
            const type = req.query.type
            if(type == "id")
                throw apiError.BadRequest('VALIDATE_ERROR', `Нет доступа`);
            const result = await externalLinkService.get(req.query.id, type, token)
            res.json(result)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new externalLinkController()