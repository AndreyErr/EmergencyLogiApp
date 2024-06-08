const {validationResult} = require('express-validator')
const apiError = require('../exceptions/apiError')
const patternService = require('../services/patternService')
const itemService = require('../services/itemService')

class itemController {

    async addItemIntoStorage(req, res, next){
        try{
            let {item_id, item_code, storage_id, count} = req.body
            const token = req.headers.authorization.split(' ')[1]
            if(item_code){
                item_id = item_code
            }
            const createStatus = await itemService.addItemIntoStorage(item_id, storage_id, count)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async getItems(req, res, next){
        try{
            let data = []
            data[0] = await itemService.selectItems(req.query.limit, req.query.page, req.query.filter)
            data[1] = await itemService.countAllItems(req.query.filter)
            res.json(data)
        } catch (e) {
            next(e);
        }
    }

    async searchItem(req, res, next){
        try{
            const str = req.query.str
            const limit = req.query.limit
            const result = await itemService.searchItem(str, limit)
            res.json(result)
        } catch (e) {
            next(e);
        }
    }

    async selectItemsTypes(req, res, next){
        try{
            const ans = await itemService.selectItemsTypes()
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async editCategory(req, res, next){
        try{
            let {name, descr, flag, add_flag, last_name} = req.body
            const token = req.headers.authorization.split(' ')[1]
            if(!last_name){
                last_name = name
            }
            const newPerson = await itemService.editCategory(name, last_name, descr, flag, add_flag, token)
            res.json(newPerson)
        } catch (e) {
            next(e);
        }
    }

    async createItem(req, res, next){
        try{
            const {name, descr, flag, type} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const newPerson = await itemService.createItem(name, descr, flag, type, token)
            res.json(newPerson)
        } catch (e) {
            next(e);
        }
    }

    async editItem(req, res, next){
        try{
            const {name, descr, flag, type, last_name} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const newPerson = await itemService.editItem(name, last_name, descr, flag, type, token)
            res.json(newPerson)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new itemController()