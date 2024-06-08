const tokenService = require('./tokenService')
const pgdb = require('../pgdb')
const bcrypt = require('bcryptjs')
const apiError = require('../exceptions/apiError')
const patternValidateService = require('./patternValidateService')

class patternService {
    
    async createPattern(pattern, actionType, token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.id < 4){
            throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
        }

        const validJson = JSON.stringify(pattern);

        if(!patternValidateService.isValidJSON(validJson))
            throw apiError.BadRequest('Ошибка валидации: Невалидный json');

        let typeValue = ''
        if (pattern.hasOwnProperty('type')) {
            typeValue = pattern.type;
        } else {
            apiError.BadRequest('Ошибка валидации: Отсутствует пункт type');
        }
        let result = []
        if (typeValue === "common" || typeValue === "reaction") {
            const patternCopy = JSON.parse(JSON.stringify(pattern));
            result = await patternValidateService.validatePattern(patternCopy, typeValue);
        } else {
            throw apiError.BadRequest(`Неправильный тип паттерна ${typeValue}`);
        }
        if (result[0] === true){
            let name = ''
            let descr = ''
            let code_name = pattern.code_name
            if(pattern.hasOwnProperty('name'))
                name = pattern.name
            if(pattern.hasOwnProperty('descr'))
                descr = pattern.descr
            try {
                let item = null
                if(actionType == "create"){
                    item = await pgdb.query('INSERT INTO patterns (date_add, time_add, user_add, name, type, json, code_name, descr) values (current_date, localtime(0), $1, $2, $3, $4, $5, $6) RETURNING *', [decoded.data.id, name, typeValue, pattern, code_name, descr])
                }else{
                    item = await pgdb.query(
                        'UPDATE patterns SET date_add = current_date, time_add = localtime(0), user_add = $1, name = $2, json = $3, descr = $4 WHERE code_name = $5 RETURNING *',
                        [decoded.data.id, name, pattern, descr, code_name]
                      );
                      
                }
                if (result[2]) {
                    for (const value of result[2]) {
                        await pgdb.query("UPDATE patterns SET ref = ref + 1 WHERE code_name = $1", [value])
                    }
                }
            } catch (err) {
                if (err.code == '23505') {
                    throw apiError.BadRequest("VALIDATE_ERROR", `Ошибка: Уникальный ключ ${code_name} уже существует.`);
                } else {
                    throw apiError.InternalError();
                }
            }
        }
        const outputResult = {'status': "OK", "warnings": result[1]}

        return outputResult
    }

    async getPattern(id, filter){
        if(id != 'all')
            id = ' WHERE id = ' + id
        else if(filter != 'all')
            id = ` WHERE type = '${filter}'`
        else
            id = ''
        const dialogaded = await pgdb.query('SELECT * FROM patterns' + id)
        if (dialogaded.rowCount > 0)
            return dialogaded.rows
        else
            return false
    }

    async getPatternCommon(codeName, type){
        // await new Promise(resolve => setTimeout(resolve, 2000));
        let select = ""
        if(type == 'input'){
            select = "->>'pattern_input'"
        }else if(type == 'reaction'){
            select = "->'pattern_reaction'->>'reaction_on'"
        }else if(type == 'defaultReaction'){
            select = "->'pattern_reaction'->>'default_reaction_on'"
        }else if(type == 'pattern_reaction'){
            select = "->>'pattern_reaction'"
        }else{
            return false
        }
        const dialogaded = await pgdb.query(`SELECT json${select} as result FROM patterns where type = 'common' and code_name = '${codeName}'`)
        if (dialogaded.rowCount == 1)
            return dialogaded.rows
        else
            return false
    }
}

module.exports = new patternService();