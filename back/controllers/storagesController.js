const storagesService = require('../services/storagesService')
const {validationResult} = require('express-validator')
const apiError = require('../exceptions/apiError')

class storagesController {

    async createStorage(req, res, next){
        try{
            const {coord, name, descr, status, addres} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const createStatus = await storagesService.createStorage(coord, name, descr, status, addres, token)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async updateStorage(req, res, next){
        try{
            const {coord, name, descr, status, addres, id} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const createStatus = await storagesService.updateStorage(coord, name, descr, status, addres, id, token)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async getClosestStorages(req, res, next){
        try{
            const {coord, type} = req.body
            const createStatus = await storagesService.getClosestStorages(coord, type)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async getStorage(req, res, next){
        try{
            const id = req.query.id
            const createStatus = await storagesService.getStorage(id, req.query.limit, req.query.page)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async getStoragesCoords(req, res, next){
        try{
            const createStatus = await storagesService.getStoragesCoords()
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async getItemsInStorage(req, res, next){
        try{
            const result = await storagesService.getItemsInStorage(req.query.storageId, req.query.limit, req.query.page, req.query.filter)
            res.json(result)
        } catch (e) {
            next(e);
        }
    }

    async addItemCountToStorage(req, res, next){
        try{
            const {id, count, type} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const createStatus = await storagesService.addItemCountToStorage(id, count, type, token)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async addItemToStorage(req, res, next){
        try{
            const {storage_id, item_id, count} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const createStatus = await storagesService.addItemToStorage(storage_id, item_id, count, token)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async deleteItemFromStorage(req, res, next){
        try{
            const {id} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const createStatus = await storagesService.deleteItemFromStorage(id, token)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }

    async searchItem(req, res, next){
        try{
            const result = await storagesService.searchItem(req.query.str, req.query.limit, req.query.storageId, req.query.type)
            res.json(result)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new storagesController()