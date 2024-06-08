const tokenService = require('./tokenService')
const pgdb = require('../pgdb')
const bcrypt = require('bcryptjs')
const apiError = require('../exceptions/apiError');
const dictsInfo = require('./dicts/dictsInfo');

class incidentsValidateService {

    validDataTypes = dictsInfo.validDataTypes; 
    
    isValidJSON(jsonString) {
        try {
            JSON.parse(jsonString);
            return true;
        } catch (error) {
            return false;
        }
    }

    validateValue(inputDataType, value) {
        for (const dataType in this.validDataTypes) {
            if (inputDataType === dataType && typeof value === this.validDataTypes[dataType]) {
                return true;
            }
        }
        return false;
    }

    compareDicts(obj1, obj2, name) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        const keysToCompare1notact = keys1.filter(key => obj1[key][1] !== 'not_required');
        const keysToCompare1 = keysToCompare1notact.filter(key => obj1[key][2] !== 'not_active');
        const keysToCompare2 = keys2.filter(key => keysToCompare1);

        const missingKeys = keysToCompare1.filter(key => !keys2.includes(key));
        const extraKeys = keysToCompare2.filter(key => !keys1.includes(key));

        if (missingKeys.length !== 0 || extraKeys.length !== 0) {
            let logMessage = '';

            if (missingKeys.length > 0) {
                logMessage += `В присланных параметрах для ${name} отсутствуют следующие обязательные параметры:`;
                missingKeys.forEach(key => {
                    logMessage += " " + key;
                });
                throw apiError.BadRequest("VALIDATE_ERROR", logMessage)
            }
            if (extraKeys.length > 0) {
                logMessage += 'Во присланных параметрах присутствуют лишние параметры:';
                extraKeys.forEach(key => {
                    logMessage += " " + key;
                });
                throw apiError.BadRequest("VALIDATE_ERROR", logMessage)
            }
        }
    }

    async validateIncidentInput(inputJsonData) {
        if (Object.keys(inputJsonData).length === 0 && inputJsonData.constructor === Object) {
            throw apiError.BadRequest("VALIDATE_ERROR", `Нет инцидентов.`);
        }
        for (let code_name in inputJsonData) {
            const input_pattern_db = await pgdb.query(`
            SELECT json->'pattern_input' AS pattern_input
            FROM patterns
            WHERE code_name = $1 and type = 'reaction';`, [code_name])
            if(input_pattern_db.rowCount == 0)
                throw apiError.BadRequest("VALIDATE_ERROR", `Ошибка: Кодового имени "'${code_name}'" не найдено в бд.`);
            const pattern_input_for_code_name = input_pattern_db.rows[0].pattern_input
            for (let inputKey in pattern_input_for_code_name){
                if (pattern_input_for_code_name[inputKey] == 'PATTERN_COMMON'){
                    const input_pattern_common_db = await pgdb.query(`
                    SELECT json->'pattern_input' AS pattern_input
                    FROM patterns
                    WHERE code_name = $1;`, [inputKey])
                    if(input_pattern_common_db.rowCount == 0)
                        throw apiError.BadRequest("VALIDATE_ERROR", `Не найден PATTERN_COMMON "${inputKey}", обратитесь к администратору`);
                    pattern_input_for_code_name[inputKey] = input_pattern_common_db.rows[0].pattern_input
                }
            }
            this.compareDicts(pattern_input_for_code_name, inputJsonData[code_name], code_name)

            for (let inputKey in pattern_input_for_code_name){
                if (inputJsonData[code_name].hasOwnProperty(inputKey)) {
                    
                    // Проверка на тип данных
                    let dataType = pattern_input_for_code_name[inputKey][0];
                    let value = inputJsonData[code_name][inputKey];
                    
                    if(!this.validateValue(dataType, value)){
                        throw apiError.BadRequest("VALIDATE_ERROR", `Ошибка: Значение ключа '${inputKey}' должно быть ${dataType}.`);
                    }
                    if(pattern_input_for_code_name[inputKey][3]){
                        const borders = pattern_input_for_code_name[inputKey][3]
                        if(borders[0] == 'between'){
                            if(value < borders[1] || value > borders[2])
                                throw apiError.BadRequest("VALIDATE_ERROR", `Ошибка: Значение ключа '${inputKey}' вне возможных границ (${borders[1]} <= значение <= ${borders[2]}).`);
                        }else if(borders[0] == 'in'){
                            let found = false
                            for (var i = 1; i < borders.length; i++) {
                                if(borders[i] === value)
                                    found = true
                            }
                            if(!found)
                                throw apiError.BadRequest("VALIDATE_ERROR", `Ошибка: Значение ключа '${inputKey}' вне возможных значений.`);
                        }
                    }else{
                        if(this.validateValue('числовой', value)){
                            if(value < 0){
                                throw apiError.BadRequest("VALIDATE_ERROR", `Ошибка: Значение ключа '${inputKey}' меньше 0`);
                            }
                        }
                    }
                } else {
                    if (pattern_input_for_code_name[inputKey][1] === 'required' && pattern_input_for_code_name[inputKey][2] !== 'not_active') {
                        throw apiError.BadRequest("VALIDATE_ERROR", `Ошибка: Ключ '${inputKey}' обязателен, но отсутствует в JSON.`);
                    }
                }
            }
        }
        return true
    }
}

module.exports = new incidentsValidateService();