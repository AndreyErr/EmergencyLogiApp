const {validationResult} = require('express-validator')
const apiError = require('../exceptions/apiError')
const patternService = require('../services/patternService')
const incidentsService = require('../services/incidentsService')
const async = require('async');

// Создаем очередь с одновременно выполняемой задачей
const queue = async.queue((task, callback) => {
    incidentsService.getItemsFromStorages(task.itemsListForIncident, task.coord)
        .then(result => {
            incidentsService.addReactionResult(result, task.createId)
            return task.createId
        })
        .then(addReactionResult => {
            callback(null, addReactionResult); // Сообщаем, что задача выполнена, передавая результат обратно
        })
        .catch(err => {
            console.error(err); // Выводим ошибку в консоль
            callback(err);
        });
}, 1);

queue.error((err, task) => {
    console.error('Произошла ошибка при обработке задачи:', task);
    console.error('Ошибка:', err);
});

class incidentsController {

    async createIncident(req, res, next){
        try{
            const {coord, incidents} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const createId = await incidentsService.createIncident(coord, incidents, token)
            res.json(createId)
            const itemsListForIncident = await incidentsService.getItemsListForIncident(incidents)

            // Добавляем задачу в очередь
            queue.push({itemsListForIncident, coord, createId}, (err, addReactionResult) => {
                if (err) {
                } else {
                    incidentsService.sendReactionResult(addReactionResult)
                }
            });

        } catch (e) {
            console.error(e); // Выводим ошибку в консоль
            next(e);
        }
    }
    async getIncident(req, res, next){
        try{
            const id = req.query.id
            const token = req.headers.authorization.split(' ')[1]
            const createStatus = await incidentsService.getIncident(id, req.query.limit, req.query.page, token)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }
    async getInputPattern(req, res, next){
        try{
            const code_name = req.query.code_name
            const createStatus = await incidentsService.getInputPattern(code_name)
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }
    async getTypes(req, res, next){
        try{
            const createStatus = await incidentsService.getTypes()
            res.json(createStatus)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new incidentsController()
