const tokenService = require('./tokenService')
const pgdb = require('../pgdb')
const bcrypt = require('bcryptjs')
const apiError = require('../exceptions/apiError')
const patternValidateService = require('./patternValidateService')
const incidentsValidateService = require('./incidentsValidateService')
const { validateString } = require('./validateStrsService')

class settingsService {
    async createSetting(name, value, name_text, descr, token){
        const decoded = tokenService.validateToken(token)
        if(!validateString(name), ['E', 'e'], [2, 120]){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат названия. Английские буквы от 2 до 120`)
        }
        if(!validateString(value, ['E', 'e', 'R', 'r', 'n'], [1, 100])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат значения`)
        }
        if(!validateString(name_text, ['E', 'e', 'R', 'r', 'n'], [2, 120])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат названия`)
        }
        if(!validateString(descr, ['E', 'e', 'R', 'r', 'n', 's'], [1, 300])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат описания`)
        }
        const item = await pgdb.query('INSERT INTO settings (name, value, user_editor, date_edit, time_edit, descr, name_text) values ($1, $2, $3, current_date, localtime(0), $4, $5) RETURNING *', [name, value, decoded.data.id, descr, name_text])
        if (item.rowCount > 0)
            return true
        else
            return false
    }

    async updateValue(id, value, token) {
        const decoded = tokenService.validateToken(token);
    
        if (!validateString(id, ['n'], [1, 20])) {
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат id`);
        }
    
        if (!validateString(value, ['E', 'e', 'R', 'r', 'n'], [1, 100])) {
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат значения`);
        }
    
        const settingsNameChange = await pgdb.query('SELECT name FROM settings WHERE id = $1', [id]);
        const settingName = settingsNameChange.rows[0]?.name;
    
        if (settingName === 'main_administrator') {
            const userChange = await pgdb.query('SELECT login FROM users WHERE login = $1', [value]);
            if (userChange.rowCount === 0) {
                throw apiError.BadRequest('VALIDATE_ERROR', `Пользователь для изменения не найден`);
            }
            const userNowLogin = await pgdb.query('SELECT value FROM settings WHERE name = \'main_administrator\'');
            if(decoded.data.login != userNowLogin.rows[0].value){
                throw apiError.BadRequest('VALIDATE_ERROR', `Главного пользователя может изменить только главный пользователь`);
            }
            await pgdb.query('UPDATE users SET status = 5 where login = $1 RETURNING *', [value])
        }
    
        const numericSettings = [
            'road_distanse_multiplexer', 'radius_step', 'min_radius', 'max_radius',
            'viacle_avarge_speed', 'allowed_percentage_of_skipping_for_item',
            'percentage_taken_from_warehouse', 'warehouse_search_radius_by_road',
            'warehouse_search_radius_direct', 'percentage_of_items_from_warehouse_to_cancel_delivery_for_incident'
        ];
    
        if (numericSettings.includes(settingName)) {
    
            if (isNaN(parseFloat(value)) || !isFinite(value)) {
                throw apiError.BadRequest('VALIDATE_ERROR', `Неправильное значение: ${value}`);
            }
        }
    
        if (settingName === 'prohibiting_validation_pattern_without_item') {
            if (!['true', 'false'].includes(value)) {
                throw apiError.BadRequest('VALIDATE_ERROR', `Неправильное значение: ${value}`);
            }
        }
    
        const setting = await pgdb.query(
            'UPDATE settings SET value = $1, user_editor = $2, date_edit = current_date, time_edit = localtime(0) WHERE id = $3 RETURNING *',
            [value, decoded.data.id, id]
        );
    
        return setting.rows[0];
    }
    

    async updateData(id, name_text, descr, token){
        const decoded = tokenService.validateToken(token)
        if(!validateString(id, ['n'], [1, 20])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат id`)
        }
        if(!validateString(name_text, ['E', 'e', 'R', 'r', 'n', 'p'], [2, 120])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат названия`)
        }
        if(!validateString(descr, ['E', 'e', 'R', 'r', 'n', 's', 'p'], [1, 300])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат описания`)
        }
        const setting = await pgdb.query('UPDATE settings SET name_text = $1, user_editor = $2, descr = $3, date_edit = current_date, time_edit = localtime(0) WHERE id = $4 RETURNING *', [name_text, decoded.data.id, descr, id])
        return setting.rows[0]
    }

    async selectSettings(){
        const settings = await pgdb.query('SELECT settings.id as id, settings.name as name, settings.value as value, settings.date_edit as date_edit, settings.time_edit as time_edit, settings.name_text as name_text, settings.descr as descr, users.login as user_editor FROM settings JOIN users ON settings.user_editor = users.user_id ORDER BY id')
        return settings.rows
    }

    async selectSetting(name){
        const settings = await pgdb.query(`SELECT value FROM settings where name = $1`, [name])
        return settings.rows
    }
}

module.exports = new settingsService();