const tokenService = require('./tokenService')
const pgdb = require('../pgdb')
const axios = require('axios');
const bcrypt = require('bcryptjs')
const apiError = require('../exceptions/apiError')
const validate = require('./validateStrsService');

class externalLinkService {
    
    async create(name, descr, href, body, apikey, status, token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.access == 2){
            throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
        }
        if(!validate.validateString(name, ['E', 'e'], [2, 120])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат названия. Английские буквы от 2 до 120`)
        }
        if(!validate.validateString(descr, ['E', 'e', 'R', 'r', 'n', 's', 'p'], [0, 300])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат описания`)
        }
        if(!validate.validateString(apikey, ['E', 'e', 'R', 'r', 'n', 's', 'p'], [0, 200])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат апи ключа`)
        }
        if(!validate.validateString(href, ['E', 'e', 'R', 'r', 'n', 's', 'p'], [0, 300])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат ссылки`)
        }
        if(!validate.validateString(status, ['n'], [1, 5])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат статуса`)
        }
        try { 
            JSON.parse("{" + body + "}");
        } catch (error) {
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат JSON данных`);
        }
        const exist = await pgdb.query('SELECT link_id FROM external_links where link_creator = $1', [decoded.data.id])
        if(exist.rowCount >= decoded.data.status * 2){
            throw apiError.BadRequest('ERROR', `Более доступного кол-ва ссылок`)
        }
        const uHref = await pgdb.query('SELECT link_id FROM external_links where link_href = $1', [href])
        if(uHref.rowCount > 0){
            throw apiError.BadRequest('ERROR', `Ссылка уже существует`)
        }
        const link_data = await pgdb.query('INSERT INTO external_links (link_name, link_descr, link_href, link_body, link_apikey, link_creator, link_status, link_date_created, link_time_created) values ($1, $2, $3, $4, $5, $6, $7, current_date, localtime(0)) RETURNING *', [name, descr, href, body, apikey, decoded.data.id, status])
        return "OK"
    }

    async edit(name, descr, href, body, apikey, status, id, token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.access == 2){
            throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
        }
        const exist = await pgdb.query('SELECT link_id, link_creator FROM external_links where link_id = $1', [id])
        if(exist.rowCount == 0){
            throw apiError.BadRequest('ERROR', `Ссылка не найдена`)
        }
        if(exist.rows[0].link_creator != decoded.data.id && decoded.data.status < 4){
            throw apiError.BadRequest('ERROR', `Нет доступа`)
        }
        if(!validate.validateString(name, ['E', 'e'], [2, 120])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат названия. Английские буквы от 2 до 120`)
        }
        if(!validate.validateString(descr, ['E', 'e', 'R', 'r', 'n', 's', 'p'], [0, 300])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат описания`)
        }
        if(!validate.validateString(apikey, ['E', 'e', 'R', 'r', 'n', 's', 'p'], [0, 400])) {
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат апи ключа`);
        }
        if(!validate.validateString(href, ['E', 'e', 'R', 'r', 'n', 's', 'p'], [0, 300])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат ссылки`)
        }
        if(!validate.validateString(status, ['n'], [1, 5])){
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат статуса`)
        }
        try {
            JSON.parse("{" + body + "}");
        } catch (error) {
            throw apiError.BadRequest('VALIDATE_ERROR', `Неправильный формат JSON данных`);
        }
        if(exist.rows[0].link_creator != decoded.data.id && decoded.data.status >= 4){
            const link_data = await pgdb.query('UPDATE external_links SET link_status = $1 WHERE link_id = $2 RETURNING link_id', [status, id])
        }else{
            const link_data = await pgdb.query('UPDATE external_links SET link_name = $1, link_descr = $2, link_href = $3, link_body = $4, link_apikey = $5, link_status = $6 WHERE link_id = $7 RETURNING link_id', [name, descr, href, body, apikey, status, id])
        }
        return "OK"
    }

    async delete(id, token){
        const decoded = tokenService.validateToken(token)
        const exist = await pgdb.query('SELECT link_id, link_creator FROM external_links where link_id = $1', [id])
        if(exist.rowCount == 0){
            throw apiError.BadRequest('ERROR', `Ссылка не найдена`)
        }
        if(exist.rows[0].link_creator != decoded.data.id){
            throw apiError.BadRequest('ERROR', `Нет доступа`)
        }
        pgdb.query('DELETE FROM external_links WHERE link_id = $1', [id]);
        return "OK"
    }

    async sent(href, body, apikey, data) {
        try {
            // Парсинг body в объект, чтобы можно было добавить новое поле
            body = "{"+body+"}"
            let bodyObject;
            try {
                bodyObject = JSON.parse(body);
            } catch (error) {
                return { statusCode: 0, message: 'Invalid JSON format in body' };
            }
    
            // Добавление поля "data" в body
            bodyObject.data = data;
    
            // Формирование заголовков
            const headers = {};
            if (apikey) {
                headers['Authorization'] = apikey;
            }
    
            // Отправка POST-запроса
            const response = await axios.post(href, bodyObject, { headers });
    
            return { statusCode: response.status, message: response.data };
        } catch (error) {
            console.error('Error sending POST request:', error.message);
            if (error.response) {
                // Сервер вернул ответ с ошибкой (например, 4xx или 5xx)
                return { statusCode: error.response.status, message: error.response.data };
            } else if (error.request) {
                // Запрос был сделан, но ответа не получено
                return { statusCode: 0, message: 'No response received from server' };
            } else {
                // Произошла ошибка при настройке запроса
                return { statusCode: 0, message: error.message };
            }
        }
    }

    async get(id, type, token){
        const decoded = tokenService.validateToken(token)
        if(type == 'creator')
            id = ' WHERE link_creator = ' + decoded.data.id
        else if(type == 'id')
            id = ' WHERE link_id = ' + id
        else{
            if(decoded.data.status < 4){
                throw apiError.BadRequest('VALIDATE_ERROR', `Нет доступа`);
            }
            id = ''
        }

        const exist = await pgdb.query('SELECT link_id FROM external_links where link_creator = $1', [decoded.data.id])
        const dialogaded = await pgdb.query('SELECT external_links.link_id, external_links.link_name, external_links.link_descr, external_links.link_href, external_links.link_body, external_links.link_apikey, external_links.link_status, users.login as login_creator FROM external_links left join users on external_links.link_creator = users.user_id' + id + ' order by link_id desc');
        return [dialogaded.rows, decoded.data.status * 2, exist.rowCount]
    }
}

module.exports = new externalLinkService();