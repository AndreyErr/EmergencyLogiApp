const tokenService = require('./tokenService')
const pgdb = require('../pgdb')
const bcrypt = require('bcryptjs')
const apiError = require('../exceptions/apiError')
const validate = require('./validateStrsService');

class itemService {
    
    // async createItem(name){
    //     // const decoded = tokenService.validateToken(token)
    //     const item = await pgdb.query('INSERT INTO items (name) values ($1) RETURNING *', [name])
    //     if (item.rowCount > 0)
    //         return true
    //     else
    //         return false
    // }

    async addItemIntoStorage(item_id, storage_id, count){
        // const decoded = tokenService.validateToken(token)
        if(typeof item_id == 'string'){
            const id = await pgdb.query("SELECT id FROM items WHERE name = $1", [item_id])
            item_id = id.rows[0].id
        }
        const common_pattern = await pgdb.query("SELECT * FROM items_in_storages WHERE item_id = $1 and storage_id = $2", [item_id, storage_id])
        if (common_pattern.rowCount > 0){
            pgdb.query("UPDATE items_in_storages SET count = count + $2 WHERE id = $1", [common_pattern.rows[0].id, count])
            return 123
        }else{
            const item = await pgdb.query('INSERT INTO items_in_storages (item_id, storage_id, count) values ($1, $2, $3) RETURNING *', [item_id, storage_id, count])
            if (item.rowCount > 0)
                return true
            else
                return false
        }
    }

    async selectItems(count, page, filter){
        let filter_str = ''
        if(filter != 'all'){
            const types = await pgdb.query('SELECT type_id FROM items_types where type_id = $1', [filter])
            if(types.rowCount = 0){
                throw apiError.BadRequest('VALID_ERROR', `Не найденная категория.`)
            }
            filter_str = 'WHERE type = ' + types.rows[0].type_id
        }
        const items = await pgdb.query(`SELECT * FROM items JOIN items_types ON items.type = items_types.type_id ${filter_str} ORDER BY id DESC LIMIT $1 OFFSET $2`, [count, count * (page - 1)])
        return items.rows
    }

    async countAllItems(filter){
        let filter_str = ''
        if(filter != 'all'){
            const types = await pgdb.query('SELECT type_id FROM items_types where type_id = $1', [filter])
            if(types.rowCount = 0){
                throw apiError.BadRequest('VALID_ERROR', `Не найденная категория.`)
            }
            filter_str = 'WHERE type = ' + types.rows[0].type_id
        }
        const items = await pgdb.query('SELECT COUNT(id) AS count FROM items ' + filter_str)
        return items.rows[0]['count']
    }

    async searchItem(str, limit){
        const exit = await pgdb.query("SELECT * FROM items JOIN items_types ON items.type = items_types.type_id WHERE lower(name) LIKE lower($1) ORDER BY id DESC LIMIT $2", ['%'+str+'%', limit])
        if (exit.rowCount > 0){
            return exit.rows
        }else{
            return 'null'
        }
    }

    async selectItemsTypes(){
        const statuses = await pgdb.query('SELECT * FROM items_types')
        return statuses.rows
    }

    async editCategory(name, last_name, descr, flag, add_flag, token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.status < 4){
            throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
        }
        if(!validate.validateString(name, ['E', 'e', 'R', 'r', 'n', 'p'], [2, 120])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации названия. Должны быть русские/латинские символы и цифры или символы /!?+=- От 2 до 120 символов.`)
        }
        let id = 0
        if(!validate.validateString(last_name, ['E', 'e', 'R', 'r', 'n', 'p'], [2, 120])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации названия. Должны быть русские/латинские символы и цифры или символы /!?+=- От 2 до 120 символов.`)
        }
        if(descr.length > 0)
            if(!validate.validateString(descr, ['E', 'e', 'R', 'r', 'n', 's', 'p'], [1, 300])){
                throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации описания. Должны быть русские/латинские символы и цифры или символы /!?+=- От 0 до 300 символов`)
            }
        if (isNaN(flag)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации статуса. Должно быть число.`)
        }
        if (flag < 1 || flag > 2){ // 1 - активен, 2 - не активен, ...
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации статуса. Вне диапазона допустимых значений.`)
        }
        if(!add_flag){
            id = await pgdb.query('UPDATE items_types SET type_name = $1, type_descr = $2, type_flag = $3 where type_name = $4 RETURNING *', [name, descr, flag, last_name])
        }else{
            id = await pgdb.query('INSERT INTO items_types (type_name, type_descr, type_flag) VALUES ($1, $2, $3) RETURNING *', [name, descr, flag])
        }
        return ["OK", id.rows[0].type_id]
    }

    async createItem(name, descr, flag, type, token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.status < 4){
            throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
        }
        if(!validate.validateString(name, ['E', 'e', 'R', 'r', 'n', 'p'], [2, 255])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации названия. Должны быть русские/латинские символы и цифры или символы /!?+=- От 2 до 255 символов.`)
        }
        if(descr.length > 0)
            if(!validate.validateString(descr, ['E', 'e', 'R', 'r', 'n', 's', 'p'], [1, 300])){
                throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации описания. Должны быть русские/латинские символы и цифры или символы /!?+=- От 0 до 300 символов`)
            }
        if (isNaN(flag)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации статуса. Должно быть число.`)
        }
        if (isNaN(type)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации типа. Должно быть число.`)
        }
        if (flag < 1 || flag > 2){ // 1 - активно, 2 - не активно
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации статуса. Вне диапазона допустимых значений.`)
        }
        if (type < 0){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации типа. Вне диапазона допустимых значений.`)
        }
        const id = await pgdb.query('INSERT INTO items (name, descr, type, flag) values ($1, $2, $3, $4) RETURNING *', [name, descr, type, flag])
        return ["OK", id.rows[0].id]
    }

    async editItem(name, last_name, descr, flag, type, token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.status < 4){
            throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
        }
        if(!validate.validateString(name, ['E', 'e', 'R', 'r', 'n', 'p'], [2, 255])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации названия. Должны быть русские/латинские символы и цифры или символы /!?+=- От 2 до 255 символов.`)
        }
        if(descr.length > 0)
            if(!validate.validateString(descr, ['E', 'e', 'R', 'r', 'n', 's', 'p'], [1, 300])){
                throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации описания. Должны быть русские/латинские символы и цифры или символы /!?+=- От 0 до 300 символов`)
            }
        if (isNaN(flag)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации статуса. Должно быть число.`)
        }
        if (isNaN(type)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации типа. Должно быть число.`)
        }
        if (flag < 1 || flag > 2){ // 0 - бан, 1 - пользователь
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации статуса. Вне диапазона допустимых значений.`)
        }
        if (type < 0){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации типа. Вне диапазона допустимых значений.`)
        }
        const id = await pgdb.query('UPDATE items SET name = $1, descr = $2, type = $3, flag = $4 WHERE name = $5 RETURNING *', [name, descr, type, flag, last_name])
        return ["OK", id.rows[0].id]
    }
}

module.exports = new itemService();