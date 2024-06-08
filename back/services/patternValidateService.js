const tokenService = require('./tokenService')
const pgdb = require('../pgdb')
const bcrypt = require('bcryptjs')
const apiError = require('../exceptions/apiError')
const dictsInfo = require('./dicts/dictsInfo')

class patternValidateService {

    allowedFieldsGeneral = dictsInfo.allowedFieldsGeneral;
    allowedFieldsGeneralReaction = dictsInfo.allowedFieldsGeneralReaction;

    allowedFieldsReaction = dictsInfo.allowedFieldsReaction;

    validDataTypes = dictsInfo.validDataTypes;
    validRequiredField = dictsInfo.validRequiredField;
    validActiveField = dictsInfo.validActiveField;
    validValueField = dictsInfo.validValueField;
    operators = dictsInfo.operators;

    uniquePATTERN_COMMON = new Set();
    
    errorExtraFields(jsonData, allowedFields) {
        for (const key in jsonData) {
            if (!allowedFields.includes(key)) {
                throw apiError.BadRequest('VALIDATE', `Обнаружены лишние поля (${key}), перепроверьте JSON`);
            }
        }
    }
    
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

    valedateInputArray(data, key_name){
        if (!Array.isArray(data) || !data.length == 3 || !data.length == 4) {
            throw apiError.BadRequest('VALIDATE_ERROR', `Некорректно заполнен пункт pattern_input в "${key_name}". Требуется [тип данных, обязательность, активность поля, [...]]`);
        }
        
        const inputDataType = data[0];
        const inputRequiredField = data[1];
        const inputActiveField = data[2];

        if (!(inputDataType in this.validDataTypes)) {
            throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации: Недопустимый тип данных в pattern_input в "${key_name}"`);
        }
        if (!this.validRequiredField.includes(inputRequiredField)) {
            throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации: Недопустимый тип необходимости поля в pattern_input в "${key_name}"`);
        }
        if (!this.validActiveField.includes(inputActiveField)) {
            throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации: Недопустимый тип активности поля в pattern_input в "${key_name}"`);
        }
        if(data.length === 4){
            if (data[3].length < 2) {
                throw apiError.BadRequest('VALIDATE_ERROR', `Некорректно заполнен пункт ограничения данных pattern_input в "${key_name}". Требуется [..., [тип ограничения, ...]`);
            }
            if (!dictsInfo.validInputData.includes(data[3][0])) {
                throw apiError.BadRequest('VALIDATE', `Некорректно заполнен пункт ограничения данных pattern_input в "${key_name}". Неизвестный тип ограничения`);
            }
            if(data[3][0] == "between"){
                if (inputDataType != "числовой") {
                    throw apiError.BadRequest('VALIDATE', `Некорректно заполнен пункт ограничения данных pattern_input в "${key_name}". Тип between можно использовать только с числами`);
                }
                if (data[3].length < 3 || !this.validateValue("числовой", data[3][1]) || !this.validateValue("числовой", data[3][2])) {
                    throw apiError.BadRequest('VALIDATE', `Некорректно заполнен пункт ограничения данных pattern_input в "${key_name}". В типе between требуется 2 числа`);
                }
            }else if(data[3][0] == "in"){
                if (inputDataType === "булевый") {
                    throw apiError.BadRequest('VALIDATE', `Некорректно заполнен пункт ограничения данных pattern_input в "${key_name}". Тип in нельзя использовать для булевого типа данных`);
                }
                if (data[3].length < 2) {
                    throw apiError.BadRequest('VALIDATE', `Некорректно заполнен пункт ограничения данных pattern_input в "${key_name}". В типе in требуется минимум 1 значение`);
                }
                for (var i = 1; i < data[3].length; i++) {
                    if (!this.validateValue(inputDataType, data[3][i])) {
                        throw apiError.BadRequest('VALIDATE', `Некорректно заполнен пункт ограничения данных pattern_input в "${key_name}". В типе in значения должны быть одного указанного типа "${inputDataType}"`);
                    }
                }
            }else{
                throw apiError.InternalError()
            }
        }
    }

    async checkItemInStorage(item_name, warnings){
        const prohibiting_validation_pattern_without_item_db = await pgdb.query("SELECT value FROM settings WHERE name = 'prohibiting_validation_pattern_without_item'")
        const prohibiting_validation_pattern_without_item = prohibiting_validation_pattern_without_item_db.rows[0].value
        const items = await pgdb.query('SELECT * FROM items WHERE name = $1', [item_name])
        if(items.rowCount < 1)
            if(prohibiting_validation_pattern_without_item == 'false')
                throw apiError.BadRequest(`Нет предмета "${item_name}" в бд!`);
            else
                warnings.push(`Нет предмета "${item_name}" в бд!`);
    }

    async valedateReactionJson(key_name, dataReaction, dataInput, type, warnings){
        if (!dataReaction.hasOwnProperty('item_name') || !dataReaction.hasOwnProperty('reaction_item') || !dataReaction.hasOwnProperty('default_reaction_item') || !dataReaction.hasOwnProperty('status')) {
            throw apiError.BadRequest(`Ошибка валидации: Один из элементов в pattern_reaction ("${key_name}" / "${dataReaction.item_name}") не содержит обязательных полей`);
        }
        if(dataReaction.reaction_item != null){
            if (!dataReaction.reaction_item.hasOwnProperty('value_type') || !dataReaction.reaction_item.hasOwnProperty('value')) {
                throw apiError.BadRequest(`Ошибка валидации: Один из элементов в pattern_reaction ("${key_name}" / "${item_name}") не содержит обязательных полей`);
            }
        }
        if (!this.validActiveField.includes(dataReaction.status)) {
            throw apiError.BadRequest(`Ошибка валидации: Недопустимый статус в ${dataReaction.item_name}`);
        }
        this.errorExtraFields(dataReaction, this.allowedFieldsGeneralReaction)
        this.errorExtraFields(dataReaction.reaction_item, this.allowedFieldsReaction)
        await this.checkItemInStorage(dataReaction.item_name, warnings)
        if(dataReaction.reaction_item != null){
            if (!this.validValueField.includes(dataReaction.reaction_item.value_type)) {
                throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации: Недопустимый тип данных в value в ${dataReaction.item_name}`);
            }
            // ['числовой', 'булевый', 'строковой'] ['per_1', 'generally', 'custom']
            if((dataReaction.reaction_item.value_type == 'per_1' || dataReaction.reaction_item.value_type == 'generally') && !this.validateValue("числовой", dataReaction.reaction_item.value)){
                throw apiError.BadRequest("VALIDATE_ERROR", `При типе "per_1" или "generally" допускается запись только числа ("${dataReaction.item_name}")`);
            }else{
                if(dataInput != "числовой" && dataReaction.reaction_item.value_type == 'per_1'){
                    throw apiError.BadRequest('VALIDATE_ERROR', `В pattern_input записан не числовой способ в "${key_name}", при том что в pattern_reaction есть попытка использовать per_1 (В них разрешены только числа). Вы можете исправить в pattern_input на "числовой" или использовать "custom" тип в pattern_reaction`);
                }
            }
            if(dataReaction.reaction_item.value_type == 'custom' && !Array.isArray(dataReaction.reaction_item.value)){
                throw apiError.BadRequest(`При типе "custom"допускается запись только массива, а уже в нём расписать случаи использования ("${dataReaction.item_name}")`);
            }else if (dataReaction.reaction_item.value_type == 'custom'){
                this.validateCustomValue(key_name, dataReaction.reaction_item.value, dataInput, warnings)
            }
        }
        if (!dataReaction.hasOwnProperty('default_reaction_item')) {
            throw apiError.BadRequest('VALIDATE_ERROR', `Отсутствует пункт default_reaction_item ("${dataReaction.item_name}")`);
        }
        if (type == "common"){
            if (!this.validateValue("числовой", dataReaction.default_reaction_item) && dataReaction.default_reaction_item != null) {
                throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации: Недопустимое реакционное значение в default_reaction_item в ${dataReaction.item_name}. Разрешены только числа ("числовой" тип)`);
            }
        }else{
            if(dataReaction.default_reaction_item == "PATTERN_COMMON"){
                await this.findPatternCommon(key)
            }else if (!this.validateValue("числовой", dataReaction.default_reaction_item) && dataReaction.default_reaction_item != null) {
                throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации: Недопустимое реакционное значение в default_reaction_item в ${dataReaction.item_name}. Разрешены только числа ("числовой" тип)`);
            }
        }
    }

    validateCustomValue(key_name, dataReaction, dataInput, warnings){
        for (const reaction of dataReaction) {
            if (!Array.isArray(reaction) || reaction.length !== 4) {
                throw apiError.BadRequest('VALIDATE_ERROR', `Некорректно заполнен пункт pattern_reaction в "${key_name}". Требуется [оператор, данные сравнения, тип результата, результат]`);
            }
            if (!this.operators.includes(reaction[0])) {
                throw apiError.BadRequest('Ошибка валидации: Недопустимый тип оператора в поля в custom');
            }
            if((this.validateValue('булевый', reaction[1]) || this.validateValue('строковой', reaction[1])) && reaction[0] != "=")
                throw apiError.BadRequest('VALIDATE_ERROR', `Некорректно заполнен пункт pattern_reaction в "${key_name}". Если тип данных "булевый" или "строковой", то допускается только сравнение`);
            if(typeof reaction[1] != this.validDataTypes[dataInput])
                throw apiError.BadRequest('VALIDATE_ERROR', `Некорректно заполнен пункт pattern_reaction в "${key_name}". Не совпадает тип данных в custom с заявленным в pattern_input`);
            if (!this.validValueField.includes(reaction[2]) || reaction[2] == 'custom') {
                throw apiError.BadRequest('VALIDATE_ERROR', `Ошибка валидации: Недопустимый тип данных в custom в ${key_name}. Разрешены только "per_1" и "generally"`);
            }
            if((this.validateValue('булевый', reaction[1]) || this.validateValue('строковой', reaction[1])) && (reaction[2] != "generally"))
                throw apiError.BadRequest('VALIDATE', `Некорректно заполнен пункт pattern_reaction в "${key_name}". Если тип данных "булевый" или "строковой", то допускается только generally`);
            if (!this.validateValue("числовой", reaction[3])) {
                throw apiError.BadRequest(`Ошибка валидации: Недопустимое реакционное значение в custom в ${key_name}. Разрешены только числа ("числовой" тип)`);
            }
        }
    }
    
    async validatePattern(jsonData, type) {

        let warnings = [];
        this.errorExtraFields(jsonData, this.allowedFieldsGeneral)

        if(!jsonData.hasOwnProperty('code_name') || !this.validateValue("строковой", jsonData.code_name))
            throw apiError.BadRequest('VALIDATE', 'Отсутствует или неправильно заполнен пункт code_name. Разрешена только строка текста');
        if((!jsonData.hasOwnProperty('time') || !this.validateValue("числовой", jsonData.time) || jsonData.time < 1) && type != "common")
            throw apiError.BadRequest('VALIDATE', 'Отсутствует или неправильно заполнен пункт time. Разрешено только число больше 0 (дистанция в метрах)');
        if(!jsonData.hasOwnProperty('name') || !this.validateValue("строковой", jsonData.name))
            throw apiError.BadRequest('VALIDATE', 'Отсутствует или неправильно заполнен пункт name. Разрешена только строка текста');
        if(jsonData.hasOwnProperty('descr') && !this.validateValue("строковой", jsonData.descr))
            throw apiError.BadRequest('VALIDATE', 'Неправильно заполнен пункт descr. Разрешена только строка текста');

        // pattern_input

        if (!jsonData.hasOwnProperty('pattern_input')) {
            throw apiError.BadRequest('VALIDATE', 'Отсутствует пункт pattern_input');
        }
        let patternInputKeys = NaN;
        if (type == "common"){
            this.valedateInputArray(jsonData.pattern_input, jsonData.code_name)
        }else{
            patternInputKeys = Object.keys(jsonData.pattern_input);
            for (const [key, value] of Object.entries(jsonData.pattern_input)) {
                if (this.validateValue("строковой", value)){
                    if (value == "PATTERN_COMMON"){
                        const pat_common = await this.findPatternCommon(key)
                        jsonData.pattern_input[key] = pat_common
                        continue
                    }else
                        throw apiError.BadRequest('VALIDATE', `Неправильно заполнен pattern_input "${key}"`);
                }
                this.valedateInputArray(value, key)
            }
        }

        // pattern_reaction

        if (!jsonData.hasOwnProperty('pattern_reaction')) {
            throw apiError.BadRequest('VALIDATE', 'Отсутствует пункт pattern_reaction');
        }
        let countOfReactions = 0
        if (jsonData.pattern_reaction.length == 0) {
            warnings.push('Предупреждение: Пункт pattern_reaction пуст');
            countOfReactions++;
        }else{
            //? this.errorExtraFields(jsonData.pattern_reaction, this.allowedFieldsGeneralReaction)
            if (type == "common"){
                if(!Array.isArray(jsonData.pattern_reaction) || jsonData.pattern_reaction.length == 0 )
                    throw apiError.BadRequest('VALIDATE', 'Неправильно заполнен pattern_reaction (должен быть массив больше 0)');
                for (const reaction of jsonData.pattern_reaction) {
                    await this.valedateReactionJson(jsonData.code_name, reaction, jsonData.pattern_input[0], type, warnings)
                    countOfReactions++;
                }
            }else{
                for (const [key, value] of Object.entries(jsonData.pattern_reaction)) {
                        if (value == "PATTERN_COMMON"){
                            await this.findPatternCommon(key)
                            continue
                        }
                    if(!Array.isArray(value))
                        throw apiError.BadRequest('VALIDATE', `Неправильно заполнен pattern_reaction "${key}" (должен быть массив)`);
                    if (!patternInputKeys.includes(key)) {
                        throw apiError.BadRequest(`Ошибка валидации: Ключ ${key} в pattern_reaction.reaction_on отсутствует в pattern_input`);
                    }
                    for (const reaction of value) {
                        await this.valedateReactionJson(key, reaction, jsonData.pattern_input[key][0], type, warnings)
                        countOfReactions++;
                    }
                }
            }
        }
        if(countOfReactions == 0){
            warnings.push('Предупреждение: Пункт pattern_reaction пуст');
        }
        return [true, warnings, this.uniquePATTERN_COMMON];
    }

    async findPatternCommon(key){
        const common_pattern = await pgdb.query("SELECT json->'pattern_input' as pattern_input FROM patterns WHERE type = 'common' and code_name = $1", [key])
        if (!this.uniquePATTERN_COMMON.has(key))
            this.uniquePATTERN_COMMON.add(key);
        if (common_pattern.rowCount == 0)
            throw apiError.BadRequest(`Ошибка валидации: Не найден PATTERN_COMMON (${key})`);
        return common_pattern.rows[0].pattern_input
    }
}

module.exports = new patternValidateService();